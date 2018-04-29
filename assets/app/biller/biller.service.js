//import { Http, Headers, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Biller } from "./biller.model";
import { Bill } from "../bill/bill.model";
import { ErrorService } from '../errors/error.service';
var BillerService = /** @class */ (function () {
    function BillerService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this.billers = [];
        this.billerIsEdit = new EventEmitter();
        this._httpURL = "https://my-bill-app.herokuapp.com/";
    }
    BillerService.prototype.getAllBillers = function () {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/billers' + token)
            .map(function (response) {
            var billers = response.json().obj;
            var tempBillers = [];
            for (var _i = 0, billers_1 = billers; _i < billers_1.length; _i++) {
                var biller = billers_1[_i];
                tempBillers.push(new Biller(biller.billerName, biller.billerDescription, biller.id));
            }
            _this.billers = tempBillers;
            return tempBillers;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.getBillerById = function (id) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/billers/get/' + id + token)
            .map(function (response) {
            var biller = response.json().obj;
            var tempBiller;
            tempBiller = new Biller(biller.billerName, biller.billerDescription, biller.id);
            return tempBiller;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.addBiller = function (biller) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.post(this._httpURL + '/api/billpay/billers/create' + token, biller)
            .map(function (response) {
            var biller = response.json().obj;
            var tempBiller;
            tempBiller = new Biller(biller.billerName, biller.billerDescription, biller.id);
            return tempBiller;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.editBiller = function (biller) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.put(this._httpURL + '/api/billpay/billers/edit/' + biller.id + token, biller)
            .map(function (response) {
            var biller = response.json().obj;
            var tempBiller;
            tempBiller = new Biller(biller.billerName, biller.billerDescription, biller.id);
            return tempBiller;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.deleteBiller = function (id) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.delete(this._httpURL + '/api/billpay/billers/delete/' + id + token)
            .map(function (response) {
            console.log(response);
            console.log(response.json());
            return response.json();
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.getAllBillsofBiller = function (billerName) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + "/api/billpay/billers/getBills/" + billerName + token)
            .map(function (response) {
            var bills = response.json().obj;
            var tempBills = [];
            for (var _i = 0, bills_1 = bills; _i < bills_1.length; _i++) {
                var bill = bills_1[_i];
                tempBills.push(new Bill(bill.billerName, bill.userMailId, bill.billingDate, bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            //this.bills = tempBills;
            return tempBills;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.getAggregateData = function (noOfUsers) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        console.log('no from service');
        console.log(noOfUsers);
        return this.http.get(this._httpURL + "/api/billpay/billers/aggregateData/" + noOfUsers + token)
            .map(function (response) {
            var aggregateData = response.json().obj;
            var tempData = [];
            for (var _i = 0, aggregateData_1 = aggregateData; _i < aggregateData_1.length; _i++) {
                var data = aggregateData_1[_i];
                tempData.push({ userMailId: data.userMailId,
                    totalAmount: data.totalAmount,
                    count: data.count });
            }
            return tempData;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.prototype.getAggregateDataWithBillerNames = function () {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + "/api/billpay/billers/getAggregateDataWithBillerNames" + token)
            .map(function (response) {
            var aggregateDataBillerNames = response.json().obj;
            var tempData = [];
            for (var _i = 0, aggregateDataBillerNames_1 = aggregateDataBillerNames; _i < aggregateDataBillerNames_1.length; _i++) {
                var data = aggregateDataBillerNames_1[_i];
                tempData.push({ billerName: data.billerName,
                    userMailId: data.userMailId,
                    totalAmount: data.totalAmount,
                    count: data.count });
            }
            return tempData;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    BillerService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    BillerService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return BillerService;
}());
export { BillerService };
