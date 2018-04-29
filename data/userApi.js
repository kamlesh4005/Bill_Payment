"use strict";
//var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var db = require('./dbConnection');
/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/billPaymentDatabase',{
  useMongoClient: true,
});*/
//console.log("database");
//console.log(db);
var Schema = db.Schema;
var userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    mobileNumber: {type: Number, required: true},
    role: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
});

userSchema.plugin(mongooseUniqueValidator);

var User = db.model('userInformation', userSchema, 'userInformation');
var _clone1 = function(item) {
	 return JSON.parse(JSON.stringify(item));
};

var usersArray = [];
var usersDetailsArray = [];
var UserApi = {
	getUserByEmail: function(userData,data, callback) {
        console.log('called');
        console.log(User);
		User.findOne({ email: userData.email }, function (err, post) {
            console.log('inside');
        if (err){
            console.log(err);
            callback(_clone1(err));
        } else {
            console.log(post);
            if(post != null){
              if (!bcrypt.compareSync(userData.password, post.password)) {
                userData = null;
                callback(null, userData);
              } else {
                userData = {
                    firstName: post.firstName,
                    lastName: post.lastName,
                    role: post.role,
                    id: post._id,
                    mobileNumber: post.mobileNumber,
                    email: post.email
                };
                console.log(userData);
                var token = jwt.sign({user: userData}, 'secret', {expiresIn: 7200});
                data.token = token;
                data.userId= userData.email;
                console.log(userData.role);
                console.log(userData.email);                
                data.userRole= userData.role; 
                data.userName= userData.firstName;                                   
                callback(null, data);
              }
            } else {
                callback(null, null);
            }
            console.log("----****");
            console.log(userData);
        }
		});
    },
    getUsers: function(callback) {
		User.find({}, 'email', function (err, users) {
        if (err)
        callback(_clone1(err));
        else {
            //console.log(post);
           usersArray = [];		
		   users.forEach(function (post,i) {
		   usersArray[i] = post.email;
		   });
		   console.log(usersArray);
		   callback(null, _clone1(usersArray));	 

        }
		});
    },
    getUsersDetails: function(callback) {
		User.find({}, function (err, users) {
        if (err)
        callback(_clone1(err));
        else {
            //console.log(post);
            usersDetailsArray = [];
			users.forEach(function (post,i) {
                var user = {
                    firstName: post.firstName,
                    lastName: post.lastName,
                    email: post.email,
                    mobileNumber: post.mobileNumber,
                    role:post.role,
					id: post._id					
				};
			   usersDetailsArray[i] = user;
		   });
		   console.log(usersDetailsArray);
		   callback(null, _clone1(usersDetailsArray));	 

        }
		});
    },
    getUserDetailByEmail: function(emailId, userData, callback) {
        console.log("get user detail");
        console.log(emailId);
		User.findOne({ email: emailId }, function (err, user) {
        if (err)
        callback(_clone1(err));
        else {
            
			   userData = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNumber: user.mobileNumber,
                role:user.role,
                id: user._id
               };
		   console.log(userData);
		   callback(null, _clone1(userData));	 
            }   
        });
    },
    updateUserByEmail: function(emailId, userData, callback) {
        console.log(userData);
        console.log(userData.firstName);
        console.log(userData.lastName);
        console.log(userData.mobileNumber);
        
    User.findOneAndUpdate({ email: emailId },
        { $set: { firstName : userData.firstName, lastName: userData.lastName, mobileNumber: userData.mobileNumber
         } },
        {new: true}, 
        function (err, user) {
            if (err){
                console.log(err);
                callback(_clone1(err));
            }
            else {
				if(user != null){
					userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNumber: user.mobileNumber,
            email: user.email
        };
                }
                console.log(userData);
				callback(null, _clone1(userData));
            }
        });
    },
    updateUserPasswordByEmail: function(emailId, newPassword, callback) {
      User.findOneAndUpdate({ email: emailId },
          { $set: { password : newPassword } },
          {new: true}, 
          function (err, user) {
              if (err)
              callback(_clone1(err));
              else {
                  if(user != null){
                    return 'success';
                  } else {
                    return 'fail';
                  }
                  }
              callback(null);
          });
      },
	  saveUser: function(userData, messageObj, callback) {
          console.log('save is called');
	    User.create(userData, function (err, user) {
            console.log('save is called----');
        console.log(err);
        console.log("-------");
        if (err){
            console.log('inside');
            /*if (err.name == 'ValidationError') {
                var field;
                for (field in err.errors) {
                    console.log(err.errors[field].message); 
                }
            }*/
            callback(_clone1(err));
        }else {
            console.log(user);
            if(user != null){
              messageObj.message = 'success';
            } else {
              messageObj.message = 'fail';
            }
            console.log('message----');
            console.log(messageObj);
			callback(null, _clone1(messageObj));
        }
		});
	  },
	  deleteUserByEmail: function(emaild, callback) {
		User.findOneAndRemove({ email: emailId }, function (err) {
        if (err)
        callback(_clone1(err));
        else {
			      callback(null);	
		    }
		});
		//callback(null);	
		
	}
};

module.exports = UserApi;
