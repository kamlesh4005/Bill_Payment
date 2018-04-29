var BillApi = require('../data/BillApi');
var BillerApi = require('../data/BillerApi');
var UserApi = require('../data/UserApi');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var paypal = require('paypal-rest-sdk');

// sendgrid username + password 
var options = {
  auth: {
      api_user: 'sh.kamleshsharma',
      api_key: 'kamlesh14041995'
  }
}

var mailer = nodemailer.createTransport(sgTransport(options));


const payments = paypal.v1.payments;

let env = new paypal.core.SandboxEnvironment(
  'AZ7h0e_Am5KaJi9IlfewcjKCExeCGLVChn5SJxobcxoLzH00DDNGTxD0iLiregBTrUi_cWTVL_h8f3R3', 
  'EGE_SF_3PEkrTIjXjwCBLYq3MhaDonnuzo584Cjzt1EfvYDcQ_LmDvwGJFECuw-3L2vadjdaAq-gSrym');




// putting authentication part ...
router.use('/', function (req, res, next) {
  jwt.verify(req.query.token, 'secret', function (err, decoded) {
      console.log(decoded);
      if (err) {
          return res.status(401).json({
              title: 'Not Authenticated',
              error: err
          });
      }
      if(decoded.user.role != "admin" && decoded.user.role != "user"){
          return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        });
      }
      next();
  })
});

router.get('/', function(req, res) {
  BillApi.getAllBillsForAdmin(function(err, items) {
	  if(err){
		  console.log(err);
      return res.status(500).json({
        title: 'Error Occurred in getting all bills',
        error: err
      });
	  }else{
      res.status(200).json({
        bill: 'Success',
        obj: items
    });
		//res.json(items);
	  }
    });
});

router.get('/get/:id', function(req, res) {
  var billData;
  BillApi.getBillById(req.params.id, billData, function(err, billData) {
	  if (err)
	  {
      console.log(err);
      return res.status(500).json({
        title: 'Error Occurred in getting bill by ID',
        error: err
      });
	  } else{
      res.status(200).json({
        bill: 'Success',
        obj: billData
    });
		//res.json(billData);
	  }
    });
});

router.post('/create', function(req, res) {
  var bill = {};
  bill.billerName = req.body.billerName,
  bill.userMailId = req.body.userMailId,
  bill.billingAmount = req.body.billingAmount,
  bill.billingDate = req.body.billingDate,
  bill.dueDate = req.body.dueDate;
  bill.paidDate = req.body.paidDate;
  bill.billPaid = req.body.billPaid;

  // Email Body ...
  var email = {
    to: req.body.userMailId,
    from: 'billpayment@makemypayment.com',
    subject: 'You Bill Status',
    text: 'Thanks for your SUPPORT !!!!',
    html: 'Hello ' +req.body.userMailId + ', Your Bill with biller: '+ req.body.billerName + ' is generated with billing amount '+ req.body.billingAmount+'.'
  };

  //console.log(req.body);
  console.log('passed bill');
  console.log(bill);
  BillApi.saveBill(bill, function(err) {
    if(err){
      return res.status(500).json({
        title: 'Error Occurred in creating Bill',
        error: err
      });
    }

    //Email Api ... 
    
    mailer.sendMail(email, function(err, res) {
      if (err) { 
        console.log(err) 
      }
      console.log(res);
    });
     
    res.status(200).json({
      bill: 'Success',
      obj: bill
    });

  	//res.json(bill);
  });
});

router.get('/getBillerNames', function(req, res) {
  BillerApi.getAllBillerNames(function(err, billerData) {
	  if (err)
	  {
      console.log(err);
      return res.status(500).json({
        title: 'Error Occurred in getting biller names',
        error: err
      });
	  } else{
      console.log(billerData);
      res.status(200).json({
        bill: 'Success',
        obj: billerData
      });
		//res.json(billerData);
	  }
    });
});

router.get('/getUsers', function(req, res) {
  UserApi.getUsers(function(err, emailData) {
      if (err)
      {
        console.log(err);
        return res.status(500).json({
          title: 'Error Occurred in getting user',
          error: err
        });
      } else{
      console.log(emailData);
      res.status(200).json({
        bill: 'Success',
        obj: emailData
    });
        //res.json(emailData);
      }
    });
});

router.put('/edit/:id', function(req, res) {
  var updatedBill = {};
  updatedBill.billingAmount = req.body.billingAmount,
  updatedBill.billingDate = req.body.billingDate,
  updatedBill.dueDate = req.body.dueDate;
  BillApi.updateBillById(req.params.id, updatedBill, function(err) {
    if(err){
      return res.status(500).json({
        title: 'Error Occurred in updating bill',
        error: err
      });
    } else{
      res.status(200).json({
        bill: 'Success',
        obj: updatedBill
      });
    //res.json(updatedBill);
    }
	  
  });
});




router.put('/editBillPayment/:id', function(req, res) {
    
    var billerName = req.body.billerName;
    var billingAmount = req.body.billingAmount;
    let client = new paypal.core.PayPalHttpClient(env);
    var data = {
      "currency": "USD",
      "amount": billingAmount
    };
    let payment = {
      "intent": "sale",
      "transactions": [{
        "amount":{
          "currency": "USD",
        "total":  "30" }
      }
      ],
      "redirect_urls": {
        "cancel_url": "http://localhost:3000/bills/cancel",
        "return_url": "http://localhost:3000/bills//allbills:"+req.body.userMailId
      },
      "payer": {
        "payment_method": "paypal"
      }
    };
    
    
    let request = new payments.PaymentCreateRequest();
    request.requestBody(payment);
    console.log(request);
    console.log('----request');
    client.execute(request).then((response) => {
      console.log(response.statusCode);
      console.log(response.result);
    }).catch((error) => {
      console.error(error.statusCode);
      console.error(error.message);
    });


    /*var create_payment_json = {
      "intent": "sale",
      "payer": {
          "payment_method": "paypal"
      },
      "redirect_urls": {
          "return_url": "http://localhost:3000/bills/success",
          "cancel_url": "http://localhost:3000/bills/cancel"
      },
      "transactions": [{
          "item_list": {
              "items": [{
                  "name": billerName,
                  "price": billingAmount,
                  "currency": "USD",
                  "quantity": 1
              }]
          },
          "amount": {
              "currency": "USD",
              "total": billingAmount
          },
          "description": "This is the "+ billerName+" 's bill payment."
      }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        console.log("Create Payment Response");
        console.log(payment);
    }
  });*/
  
  
  BillApi.updateBillPaymentById(req.params.id, req.body.billPaid, req.body.paidDate, function(err){
    if(err){
      return res.status(500).json({
        title: 'Error Occurred in updating bill payment',
        error: err
      });
    } else {
      res.status(200).json({
        bill: 'Success',
        obj: null
      });
    }
    //res.json(null);
  });
});

router.delete('/delete/:id', function(req, res) {
  BillApi.deleteBillById(req.params.id, function(err) {
	  if(err){
      console.log(err);
      return res.status(500).json({
        title: 'Error Occurred in deleting bill',
        error: err
      });
	  }else{
      res.status(200).json({
        bill: 'Success',
        obj: null
      });
		  //res.json(null);
	  }
  });    
  
});

router.get('/user/get/:userId', function(req, res) {
  BillApi.getAllBillsForUser(req.params.userId, function(err, billsOfUser) {
	  if (err)
	  {
      console.log(err);
      return res.status(500).json({
        title: 'Error Occurred in getting user',
        error: err
      });
	  } else{
      res.status(200).json({
        bill: 'Success',
        obj: billsOfUser
      });
		//res.json(billsOfUser);
	  }
    });
});

router.get('/user/get/billsHistory/:userId', function(req, res) {
  BillApi.getAllBillsForUserHistory(req.params.userId, function(err, billsHistoryOfUser) {
	  if (err)
	  {
      console.log(err);
      return res.status(500).json({
        title: 'Error Occurred in getting all bill history',
        error: err
      });
	  } else{
      res.status(200).json({
        bill: 'Success',
        obj: billsHistoryOfUser
      });
		//res.json(billsHistoryOfUser);
	  }
    });
});

module.exports = router;
