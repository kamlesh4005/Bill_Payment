"use strict";

var db = require('./dbConnection');
var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');

/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/billPaymentDatabase');*/

var Schema = db.Schema;
var billerSchema = new Schema({
	billerName: {type: String, required: true, unique: true},
	billerDescription: {type: String, required: true}
});

billerSchema.plugin(mongooseUniqueValidator);

var Biller = db.model('billerInformation', billerSchema, 'billerInformation');
var billersArray = [];
var billerNameArray = [];
console.log(billersArray.length);
var _clone1 = function(item) {
	 return JSON.parse(JSON.stringify(item));
};


var BillerApi = {
	getAllBillers: function(callback) {
		 Biller.find({}, function(err, billers){
		 if(err)
		 	callback(_clone1(err));
		 else{
			 billersArray = [];
			billers.forEach(function (post,i) {
				var biller = {
					billerName: post.billerName,
					billerDescription: post.billerDescription,
					id: post._id					
				};
			billersArray[i] = biller;
			});
			console.log(billersArray);
			callback(null, _clone1(billersArray));	 
 
			 
		 }		 
		});
	},
	getAllBillerNames: function(callback) {
		Biller.find({}, 'billerName', function(err, billerNames){
		if(err)
			callback(_clone1(err));
		else{
			billerNameArray = [];
			
		   billerNames.forEach(function (post,i) {
			   billerNameArray[i] = post.billerName;
		   });
		   console.log(billerNameArray);
		   callback(null, _clone1(billerNameArray));	 

			
		}		 
	   });
   },
	getBillerById: function(id,billerData, callback) {
		let findId = mongoose.Types.ObjectId(id);
		Biller.findOne({ _id: findId }, function (err, post) {
        if (err)
			callback(_clone1(err));
        else {
			console.log(post);
			if(post != null){
				billerData = {
						billerName: post.billerName,
						billerDescription: post.billerDescription,
						id: post._id
					};
				console.log(billerData);
			}
			callback(null, _clone1(billerData));
            }
		});
    },
    updateBillerById: function(id, billerData, callback) {
		let findId = mongoose.Types.ObjectId(id);
		 Biller.findOneAndUpdate({ _id: findId },
        { $set: { billerName : billerData.billerName, billerDescription : billerData.billerDescription } },
        {new: true}, 
        function (err, biller) {
            if (err)
				callback(_clone1(err));
            else {
				if(biller != null){
					billerData = {
						billerName: biller.billerName,
						billerDescription: biller.billerDescription,
						id:biller._id
					};
				}
				callback(null, _clone1(billerData));
            }
        });
    },
	saveBiller: function(billerData, callback) {
	    //currentID = bookCount + 1;
		//console.log(currentID);
		Biller.create(billerData, function (err, biller) {
        if (err)
			callback(_clone1(err));
        else {
			if(billerData != null){
				billerData = {
					billerName: biller.billerName,
					billerDescription: biller.billerDescription,
					id:biller._id
				};
			}
			callback(null, _clone1(billerData));            
        }
		});
	},
	deleteBillerById: function(id, callback) {
		let findId = mongoose.Types.ObjectId(id);
		Biller.findOneAndRemove({ _id: findId }, function (err) {
        if (err)
			callback(_clone1(err));
        else {
			callback(null);	
		}
		});
		//callback(null);	
		
	}
};

module.exports = BillerApi;
