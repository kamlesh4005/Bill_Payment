var mongooseDb = require('mongoose');

console.log(mongooseDb);

var getDbConnection = function(){

}


console.log(mongooseDb.Connection.host);

mongooseDb.Promise = global.Promise;
mongooseDb.connect('kamlesh:kamlesh@ds013405.mlab.com:13405/billpaymentdatabase',{                //('mongodb://localhost:27017/billPaymentDatabase',{
    useMongoClient: true,
  });
console.log(mongooseDb);

module.exports = mongooseDb;
