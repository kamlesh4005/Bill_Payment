var UserApi = require('../data/UserApi');
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

router.post('/create', function(req, res){
    var userData = {};
    userData.firstName = req.body.firstName;
    userData.lastName =  req.body.lastName;
    userData.password = bcrypt.hashSync(req.body.password, 10);
    userData.mobileNumber = req.body.mobileNumber;
    userData.email = req.body.email;
    userData.role = "user";
    
    var messageObj = {};
    messageObj.message='';
    console.log('method is called');
    UserApi.saveUser(userData,messageObj, function(err) {
        console.log("from node");
        console.log("---");
        console.log(err);
        console.log("----");
        if(err){
            console.log(err);
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else {
        console.log("from nodejs");
        //console.log(message);
        res.status(200).json({
            user: 'Success',
            obj: messageObj
        });
            
        }
    });
});
    


router.post('/signin', function(req, res){
    var userData = {};
    userData.firstName = req.body.firstName;
    userData.lastName =  req.body.lastName;
    userData.password = req.body.password;
    userData.mobileNumber = req.body.mobileNumber;
    userData.email = req.body.email;
    var data={};
    UserApi.getUserByEmail(userData, data, function(err){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else{
            
            //console.log(data);
            res.status(200).json({
                user: 'Success',
                obj: data
            });
            
        }
    });
}); 

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
  

router.put('/updateProfile', function(req, res){
    var userData = {};
    userData.firstName = req.body.firstName;
    userData.lastName =  req.body.lastName;
    userData.password = null;
    userData.mobileNumber = req.body.mobileNumber;
    userData.email = req.body.email;
    userData.role = null;
    var data={};
    UserApi.updateUserByEmail(userData.email,userData, function(err){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        } else{
            res.status(200).json({
                user: 'Success',
                obj: data
            });
            
        }
    });
}); 

router.get('/', function(req, res, next){
    UserApi.getUsersDetails(function(err, users){
      if(err){
        return res.status(500).json({
            title: 'An Error Occured',
            error: err
        });
      } else {   
        res.status(200).json({
            biller: 'Success',
            obj: users
        });
    }
    })
  });
  
  router.get('/get/:email', function(req, res) {
    var userData={};
    console.log('get email function called');
    var emailId = req.params.email;
    console.log(emailId);
    UserApi.getUserDetailByEmail(emailId, userData, function(err, userData) {
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
          obj: userData
      });
      }
      });
  });
  
  

module.exports = router;