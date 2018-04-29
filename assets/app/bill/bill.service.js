//import { Http, Headers, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { Bill } from "./bill.model";
import { error } from 'util';
import { ErrorService } from '../errors/error.service';
var BillService = /** @class */ (function () {
    function BillService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this._httpURL = "https://my-bill-app.herokuapp.com/";
    }
    BillService.prototype.getAllBillsForUser = function (userId) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/bills/user/get/' + userId + token)
            .map(function (response) {
            var bills = response.json().obj;
            var tempBills = [];
            for (var _i = 0, bills_1 = bills; _i < bills_1.length; _i++) {
                var bill = bills_1[_i];
                tempBills.push(new Bill(bill.billerName, bill.userMailId, bill.billingAmount, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            return tempBills;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillService.prototype.getAllBillsForAdmin = function () {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/bills' + token)
            .map(function (response) {
            var bills = response.json().obj;
            var tempBills = [];
            for (var _i = 0, bills_2 = bills; _i < bills_2.length; _i++) {
                var bill = bills_2[_i];
                tempBills.push(new Bill(bill.billerName, bill.userMailId, bill.billingAmount, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            return tempBills;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillService.prototype.getBillById = function (id) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/bills/get/' + id + token)
            .map(function (response) {
            var bill = response.json().obj;
            var tempBill;
            tempBill = new Bill(bill.billerName, bill.userMailId, bill.billingAmount, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id);
            return tempBill;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillService.prototype.addBill = function (bill) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.post(this._httpURL + '/api/billpay/bills/create' + token, bill)
            .map(function (response) {
            var bill = response.json().obj;
            var tempBill;
            tempBill = new Bill(bill.billerName, bill.userMailId, bill.billingAmount, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id);
            console.log('got bill');
            console.log(bill);
            console.log('temp bill');
            console.log(tempBill);
            return tempBill;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.post(this._httpURL + '/api/billpay/bills/create'+token,bill);
    };
    BillService.prototype.editBill = function (bill) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.put(this._httpURL + '/api/billpay/bills/edit/' + bill.id + token, bill)
            .map(function (response) {
            var bill = response.json().obj;
            var tempBill;
            tempBill = new Bill(bill.billerName, bill.userMailId, bill.billingAmount, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id);
            return tempBill;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.put(this._httpURL +'/api/billpay/bills/edit/'+bill.id+token,bill);
    };
    BillService.prototype.deleteBill = function (id) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.delete(this._httpURL + '/api/billpay/bills/delete/' + id + token)
            .map(function (response) {
            console.log(response);
            console.log(response.json());
            return response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.delete(this._httpURL + '/api/billpay/bills/delete/'+id+token);
    };
    BillService.prototype.editBillPayment = function (bill) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        //var billPaid='yes';
        return this.http.put(this._httpURL + '/api/billpay/bills/editBillPayment/' + bill.id + token, bill)
            .map(function (response) {
            console.log(response);
            console.log(response.json());
            return response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.put(this._httpURL +'/api/billpay/bills/editBillPayment/'+bill.id+token,bill);
    };
    BillService.prototype.getAllBillsForUserHistory = function (userId) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/bills/user/get/billsHistory/' + userId + token)
            .map(function (response) {
            var bills = response.json().obj;
            var tempBills = [];
            for (var _i = 0, bills_3 = bills; _i < bills_3.length; _i++) {
                var bill = bills_3[_i];
                tempBills.push(new Bill(bill.billerName, bill.userMailId, bill.billingAmount, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            return tempBills;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.get(this._httpURL + '/api/billpay/bills/user/get/billsHistory/'+userId+token);
    };
    BillService.prototype.getAllBillerNames = function () {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + "/api/billpay/bills/getBillerNames/" + token)
            .map(function (response) {
            var billerNames = response.json().obj;
            var tempBillerNames = [];
            for (var _i = 0, billerNames_1 = billerNames; _i < billerNames_1.length; _i++) {
                var billerName = billerNames_1[_i];
                tempBillerNames.push(billerName);
            }
            return tempBillerNames;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.get(this._httpURL + "/api/billpay/bills/getBillerNames/"+token);
    };
    BillService.prototype.getAllUsers = function () {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + "/api/billpay/bills/getUsers/" + token)
            .map(function (response) {
            var users = response.json().obj;
            var tempUsers = [];
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var user = users_1[_i];
                tempUsers.push(user);
            }
            return tempUsers;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.get(this._httpURL + "/api/billpay/bills/getUsers/"+token);
    };
    BillService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BillService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return BillService;
}());
export { BillService };
