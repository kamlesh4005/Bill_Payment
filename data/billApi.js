"use strict";

var db = require('./dbConnection');
//var mongooseUniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose');

/*mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/billPaymentDatabase',{
  useMongoClient: true,
});*/

var Schema = db.Schema;
//var Schema = mongoose.Schema;
var billSchema = new Schema({
	billerName: {type: String, required: true},
	userMailId: {type: String, required: true},
	billingAmount: {type: Number, required: true},
	billingDate: {type: Date, required: true},
    dueDate: {type: Date, required: true},
	paidDate: {type: Date},
    billPaid: {type: String}
});

billSchema.index({ "billerName": 1, "userMailId": 1, "billingDate": 1}, { "unique": true });
//plugin(mongooseUniqueValidator);

var Bill = db.model('billInformation', billSchema, 'billInformation');
var billsArrayForUser = [];
var billsArrayForAdmin = [];
var billsArrayForUserHistory = [];
var billsArrayForSpecificBiller = [];
var aggregateData = [];
var aggregateDataWithBillerNames = [];
var _clone1 = function(item) {
	 return JSON.parse(JSON.stringify(item));
};


var BillApi = {
	
	getAllBillsForUser: function(userId, callback) {
		console.log(userId);
		 Bill.find({billPaid: 'no', userMailId: userId}, function(err, bills){
		 if(err)
		 	callback(_clone1(err));
		 else{
			billsArrayForUser = [];
			console.log(bills);
			if(bills != null){
				
				bills.forEach(function (post,i) {
					var bill = {
						id: post._id,
						billerName: post.billerName,
						userMailId: post.userMailId,
						billingAmount: post.billingAmount,
						billingDate: new Date(post.billingDate).toJSON().slice(0,10),
						dueDate: new Date(post.dueDate).toJSON().slice(0,10),
						paidDate: post.paidDate,
						billPaid: post.billPaid					
					};
				billsArrayForUser[i] = bill;
				});
				console.log(billsArrayForUser);				
			} 
			callback(null, _clone1(billsArrayForUser));	 			 
		 }		 
		});
    },
	getAllBillsForUserHistory: function(userId, callback) {
		 Bill.find({billPaid: 'yes', userMailId: userId}, function(err, bills){
		 if(err)
		 	callback(_clone1(err));
		 else{
			 billsArrayForUserHistory = [];
			 if(bills != null){
				bills.forEach(function (post,i) {
					if(post.paidDate != null){
						var bill = {
							id: post._id,
							billerName: post.billerName,
							userMailId: post.userMailId,
							billingAmount: post.billingAmount,
							billingDate: new Date(post.billingDate).toJSON().slice(0,10),
							dueDate: new Date(post.dueDate).toJSON().slice(0,10),
							paidDate: new Date(post.paidDate).toJSON().slice(0,10),
							billPaid: post.billPaid					
						};
						billsArrayForUserHistory[i] = bill;
					} else{
						console.log("paidDate is null");
					}
				
				});
				console.log(billsArrayForUserHistory);
			}
			callback(null, _clone1(billsArrayForUserHistory));	 
 		 }		 
		});
    },
    getAllBillsForAdmin: function(callback) {
		console.log('called bill');
		 Bill.find({}, function(err, bills){
		 if(err)
		 	callback(_clone1(err));
		 else{
			 billsArrayForAdmin = [];
			 if(bills != null){
				bills.forEach(function (post,i) {
					var bill = {
							id: post._id,
							billerName: post.billerName,
							userMailId: post.userMailId,
							billingAmount: post.billingAmount,
							billingDate: new Date(post.billingDate).toJSON().slice(0,10),
							dueDate: new Date(post.dueDate).toJSON().slice(0,10),
							paidDate: post.paidDate,
							billPaid: post.billPaid					
						};
					
				billsArrayForAdmin[i] = bill;
				});
				console.log(billsArrayForAdmin);
			}
			callback(null, _clone1(billsArrayForAdmin));		 
		 }		 
		});
    },
	getAllBillsOfBiller: function(name, callback) {
		 Bill.find({billerName: name}, function(err, bills){
		 if(err)
		 	callback(_clone1(err));
		 else{
			  billsArrayForSpecificBiller  = [];
			  if(bills != null){
				bills.forEach(function (post,i) {
					var bill = {
						id: post._id,
						billerName: post.billerName,
						userMailId: post.userMailId,
						billingAmount: post.billingAmount,
						billingDate: new Date(post.billingDate).toJSON().slice(0,10),
						dueDate: new Date(post.dueDate).toJSON().slice(0,10),
						paidDate: post.paidDate,
						billPaid: post.billPaid					
					};
				billsArrayForSpecificBiller[i] = bill;
				});
				console.log('billsArrayForSpecificBiller:');
				console.log(billsArrayForSpecificBiller);
			}
			callback(null, _clone1(billsArrayForSpecificBiller));	 			 
		 }		 
		});
    },
	getBillById: function(id,billData, callback) {
		let findId = mongoose.Types.ObjectId(id);
		Bill.findOne({ _id: findId }, function (err, post) {
        if (err)
			callback(_clone1(err));
        else {
			console.log(post);
			if(post != null){
				billData = {
						id: post._id,
						billerName: post.billerName,
						userMailId: post.userMailId,
						billingAmount: post.billingAmount,
						billingDate: new Date(post.billingDate).toJSON().slice(0,10),
						dueDate: new Date(post.dueDate).toJSON().slice(0,10),
						paidDate: post.paidDate,
						billPaid: post.billPaid
					};
				
			}
			callback(null, _clone1(billData));
            }
		});
    },
    updateBillById: function(id, billData, callback) {
		let findId = mongoose.Types.ObjectId(id);
		Bill.findOneAndUpdate({ _id: findId, billPaid: 'no' },
        { $set: { billingAmount : billData.billingAmount, billingDate : billData.billingDate, dueDate : billData.dueDate } },
        {new: true}, 
        function (err, bill) {
            if (err)
				callback(_clone1(err));
            else {
				console.log(bill);
				if(bill != null){
					billData = {
						id: bill._id,
						billerName: bill.billerName,
						userMailId: bill.userMailId,
						billingAmount: bill.billingAmount,
						billingDate: new Date(bill.billingDate).toJSON().slice(0,10),
						dueDate: new Date(bill.dueDate).toJSON().slice(0,10),
						paidDate: bill.paidDate,
						billPaid: bill.billPaid					
					};
				}
				callback(null, _clone1(billData));
            }
        });
    },
    updateBillPaymentById: function(id, billPaidStr, date, callback) {
		let findId = mongoose.Types.ObjectId(id);
		 Bill.findOneAndUpdate({ _id: findId},
        { $set: { billPaid : billPaidStr, paidDate: date} },
        {new: true}, 
        function (err, bill) {
            if (err)
				callback(_clone1(err));
            else {
                /*billData = {
					id: bill._id,
					billerName: bill.billerName,
					userMailId: bill.userMailId,
					billingAmount: bill.billingAmount,
					billingDate: new Date(bill.billingDate).toJSON().slice(0,10),
					dueDate: new Date(bill.dueDate).toJSON().slice(0,10),
					paidDate: new Date(bill.paidDate).toJSON().slice(0,10),
					billPaid: bill.billPaid
				};*/
				callback(null);//, _clone1(billData));
            }
        });
    },
	saveBill: function(billData, callback) {
		console.log('billdata');
		console.log(billData);
		Bill.create(billData, function (err, bill) {
        if (err)
			callback(_clone1(err));
        else {
			console.log(bill.paidDate);
			console.log(bill.billPaid);
			if(bill != null){
				billData = {
					id: bill._id,
					billerName: bill.billerName,
					userMailId: bill.userMailId,
					billingAmount: bill.billingAmount,
					billingDate: new Date(bill.billingDate).toJSON().slice(0,10),
					dueDate: new Date(bill.dueDate).toJSON().slice(0,10),
					paidDate: bill.paidDate,
					billPaid: bill.billPaid				
				};
			}
			console.log('from db');
			console.log(billData);
			callback(null, _clone1(billData));            
        }
		});
	},
	deleteBillById: function(id, callback) {
		let findId = mongoose.Types.ObjectId(id);
		Bill.findOneAndRemove({ _id: findId , billPaid: 'no'}, function (err,data) {
        if (err)
			callback(_clone1(err));
        else {
			callback(null);	
		}
		});
	},
	aggregateData: function(noofusers,callback) {
		console.log("no");
		console.log(noofusers);
		let userLimit = new Number(noofusers).valueOf();
		console.log(userLimit);
		Bill.aggregate([
			{
				$match: {
					billPaid: 'yes'
				}
			},
			{
				$group: {
					_id: {userMailId: "$userMailId"},  //$region is the column name in collection
					totalAmount: {$sum: "$billingAmount"},
					count: {$sum: 1}
				}
			},
			{
				$sort: {
					'totalAmount': -1
				}
			},
			{
				$limit: userLimit
			}

		], function (err, result) {
			if (err) {
				callback(_clone1(err));				
			} else {
				console.log("----------");
				console.log(result);
				aggregateData = [];
				if(result != null){
					result.forEach(function(post,i) {
						var data = {
							userMailId: post._id.userMailId,
							totalAmount: post.totalAmount,
							count:post.count					
						};
					aggregateData[i] = data;
					});
					
				}
				console.log("*******");
				console.log(aggregateData);				
				callback(null, _clone1(aggregateData));
			}
			            
		});
	},
	aggregateDataWithBillerNames: function(callback) {
		Bill.aggregate([
			{
				$match: {
					billPaid: 'yes'
				}
			},
			{
				$group: {
					_id: {billerName: "$billerName", userMailId: "$userMailId"},  //$region is the column name in collection
					totalAmount: {$sum: "$billingAmount"},
					count: {$sum: 1}
				}
			},
			{
				$sort: {
					'totalAmount': -1
				}
			}

		], function (err, result) {
			if (err) {
				callback(_clone1(err));
			} else {
				console.log("----------");
				console.log(result);
				aggregateData = [];
				if(result != null){
					result.forEach(function(post,i) {
						var data = {
							billerName: post._id.billerName,
							userMailId: post._id.userMailId,
							totalAmount: post.totalAmount,
							count:post.count					
						};
						aggregateDataWithBillerNames[i] = data;
					});
					
				}
				console.log("*******");
				console.log(aggregateDataWithBillerNames);				
				callback(null, _clone1(aggregateDataWithBillerNames));
			}			            
		});
	}
};

module.exports = BillApi;
