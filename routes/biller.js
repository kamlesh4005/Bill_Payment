var BillerApi = require('../data/BillerApi');
var BillApi = require('../data/BillApi');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');

//putting authentication part ...
router.use('/', function (req, res, next) {
  jwt.verify(req.query.token, 'secret', function (err, decoded) {
      if (err) {
          return res.status(401).json({
              title: 'Not Authenticated',
              error: err
          });
      }
      if(decoded.user.role != "admin"){
          return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        });
      }
      next();
  })
});

router.get('/', function(req, res, next){
  BillerApi.getAllBillers(function(err, billers){
    if(err){
      return res.status(500).json({
          title: 'An Error Occured',
          error: err
      });
    } else {   
      res.status(200).json({
          biller: 'Success',
          obj: billers
      });
  }
  })
});

router.get('/get/:id', function(req, res) {
  var billerData;
  BillerApi.getBillerById(req.params.id, billerData, function(err, billerData) {
	  if (err)
	  {
      console.log(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
	  } else{
      res.status(200).json({
        biller: 'Success',
        obj: billerData
    });
		  //res.json(billerData);
	  }
    });
});

router.get('/getBills/:billerName', function(req, res) {
  
  BillApi.getAllBillsOfBiller(req.params.billerName, function(err, items) {
	  if (err)
	  {
      console.log(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
	  } else{
      res.status(200).json({
        biller: 'Success',
        obj: items
    });
		//res.json(items);
	  }
    });
});

router.get('/aggregateData/:noOfUsers', function(req, res) {
  console.log(req.params.noOfUsers);
  console.log('from node js');
  BillApi.aggregateData(req.params.noOfUsers,function(err, items) {
	  if (err) {
      console.log(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
	  } else{
      res.status(200).json({
        biller: 'Success',
        obj: items
    });
      //res.json(items);
	  }
    });
});

router.get('/getAggregateDataWithBillerNames', function(req, res) {
   BillApi.aggregateDataWithBillerNames(function(err, items) {
	  if (err) {
      console.log(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
	  } else{
      res.status(200).json({
        biller: 'Success',
        obj: items
      });
        //res.json(items);
	  }
    });
});


router.post('/create', function(req, res) {
  var biller = {};
  biller.billerName = req.body.billerName;
  biller.billerDescription = req.body.billerDescription;
  console.log(req.body);
  BillerApi.saveBiller(biller, function(err) {
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
    } else {
      res.status(200).json({
        biller: 'Success',
        obj: biller
    });
      //res.json(biller);
    }
  });
});


router.put('/edit/:id', function(req, res) {
  var updatedBiller = {};
  updatedBiller.billerName = req.body.billerName;
  updatedBiller.billerDescription = req.body.billerDescription;
  updatedBiller.id = req.params.id;
  BillerApi.updateBillerById(req.params.id, updatedBiller, function(err) {
    if(err){
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
    } else {
      res.status(200).json({
        biller: 'Success',
        obj: updatedBiller
    });
      //res.json(updatedBiller);
    }
  });
});

router.delete('/delete/:id', function(req, res) {
  BillerApi.deleteBillerById(req.params.id, function(err) {
	  if(err){
      console.log(err);
      return res.status(500).json({
        title: 'An error occurred',
        error: err
    });
	  }else{
      res.status(200).json({
        biller: 'Success',
        obj: null
    });
		  //res.json(null);
	  }
  });    
  
});

module.exports = router;
