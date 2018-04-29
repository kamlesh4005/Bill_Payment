import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { Http, Headers, Response } from '@angular/http';
import { ErrorService } from '../errors/error.service';
var UserService = /** @class */ (function () {
    function UserService(http, errorService) {
        this.http = http;
        this.errorService = errorService;
        this._httpURL = "https://my-bill-app.herokuapp.com/";
    }
    UserService.prototype.signup = function (user) {
        var _this = this;
        return this.http.post(this._httpURL + '/api/billpay/user/create', user)
            .map(function (response) {
            var messageObj = response.json().obj;
            return messageObj;
        })
            .catch(function (error) {
            console.log('caught error');
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.signin = function (user) {
        var _this = this;
        return this.http.post(this._httpURL + '/api/billpay/user/signin', user)
            .map(function (response) {
            var data = response.json().obj;
            return data;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.updateUserByEmail = function (user) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.put(this._httpURL + '/api/billpay/user/updateProfile' + token, user)
            .map(function (response) {
            var data = response.json().obj;
            var tempUser;
            tempUser = new User(data.email, data.mobileNumber, data.firstName, data.lastName, data.id);
            return tempUser;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.getUsersDetails = function () {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        return this.http.get(this._httpURL + '/api/billpay/user' + token)
            .map(function (response) {
            var users = response.json().obj;
            var tempUsers = [];
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var data = users_1[_i];
                tempUsers.push(new User(data.email, null, data.mobileNumber, data.firstName, data.lastName, null, data.id));
            }
            return tempUsers;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.getUserDetailByEmail = function (email) {
        var _this = this;
        var token = sessionStorage.getItem('token')
            ? '?token=' + sessionStorage.getItem('token')
            : '';
        console.log(email);
        return this.http.get(this._httpURL + '/api/billpay/user/get/' + email + token)
            .map(function (response) {
            var data = response.json().obj;
            var tempUser = [];
            tempUser.push(new User(data.email, null, data.mobileNumber, data.firstName, data.lastName, null, data.id));
            return tempUser;
        })
            .catch(function (error) {
            _this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    };
    UserService.prototype.logout = function () {
        sessionStorage.clear();
    };
    UserService.prototype.isLoggedIn = function () {
        return sessionStorage.getItem('token') !== null;
    };
    UserService.prototype.isAdmin = function () {
        return sessionStorage.getItem('userRole') == "admin";
    };
    UserService.prototype.isUser = function () {
        return sessionStorage.getItem('userRole') == "user";
    };
    UserService.prototype.retrieveUserId = function () {
        return sessionStorage.getItem('userRole') == "user";
    };
    UserService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UserService.ctorParameters = function () { return [
        { type: Http, },
        { type: ErrorService, },
    ]; };
    return UserService;
}());
export { UserService };
