import { Component, OnInit } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { UserService } from "../user/user.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
var BillsListComponent = /** @class */ (function () {
    function BillsListComponent(billService, userService, route) {
        this.billService = billService;
        this.userService = userService;
        this.route = route;
        this.options = ['billerName', 'userEmailId', 'billingAmount', 'billingDate', 'dueDate'];
        this.optionsMap = {
            billerName: false,
            userEmailId: false,
            billingAmount: false,
            billingDate: false,
            dueDate: false
        };
        this.optionsChecked = [];
        this.display = true;
    }
    BillsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.userService.isAdmin());
        console.log(this.userService.isLoggedIn());
        if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
            this.billService.getAllBillsForAdmin()
                .subscribe(function (bills) {
                _this.bills = bills;
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        else if (this.userService.isLoggedIn() && this.userService.isUser()) {
            this.userId = this.route.snapshot.params['userId'];
            console.log(this.userId);
            this.billService.getAllBillsForUser(this.userId)
                .subscribe(function (bills) {
                _this.bills = bills;
                if (bills.length == 0) {
                    _this.display = false;
                    console.log(_this.display);
                }
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        for (var x = 0; x < this.options.length; x++) {
            this.optionsMap[this.options[x]] = true;
        }
    };
    BillsListComponent.prototype.updateCheckedOptions = function (option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
    };
    BillsListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bills-list',
                    template: "\n    <div class=\"center w3-container w3-metro-dark-red w3-lobster\">\n        <p class=\"w3-xlarge\">Bills</p>\n    </div>\n    <br>\n    <div class=\"w3-container\" *ngIf=\"display==true\">\n    <label for=\"filterby\">Filter by:</label>\n    <p>\n    <input type='text'\n        [(ngModel)]='nameFilter' />\n    </p>\n    <br>\n    <p>\n    <input type='checkbox' name='billerName' value='options[0]' id='billerName' class=\"w3-check\" \n    [checked]='options.indexOf(options[0]) >= 0'\n        (change)='updateCheckedOptions(options[0], $event)' \n        [ngModel]='options.indexOf(options[0]) >= 0' \n            />\n    <label for='billerName'>Biller Name</label>\n    </p>\n    <p>\n    <input type='checkbox' name='userEmailId' value='options[1]' id='userEmailId' class=\"w3-check\" \n    [checked]='options.indexOf(options[1]) >= 0'\n        (change)='updateCheckedOptions(options[1], $event)' \n        [ngModel]='options.indexOf(options[1]) >= 0' \n            />    \n    <label for='userEmailId'>User Email Id</label>\n    </p>\n    <p>\n    <input type='checkbox' name='userEmailId' value='options[2]' id='billingAmount' class=\"w3-check\" \n    [checked]='options.indexOf(options[2]) >= 0'\n        (change)='updateCheckedOptions(options[2], $event)' \n        [ngModel]='options.indexOf(options[2]) >= 0' \n            />    \n    <label for='billingAmount'>Billing Amount</label>\n    </p>\n    <p>\n    <input type='checkbox' name='billingDate' value='options[3]' id='billingDate' class=\"w3-check\" \n    [checked]='options.indexOf(options[3]) >= 0'\n        (change)='updateCheckedOptions(options[3], $event)' \n        [ngModel]='options.indexOf(options[3]) >= 0' \n            />    \n    <label for='billingDate'>Billing Date</label>\n    </p>\n    <p>\n    <input type='checkbox' name='dueDate' value='options[4]' id='dueDate' class=\"w3-check\" \n    [checked]='options.indexOf(options[4]) >= 0'\n        (change)='updateCheckedOptions(options[4], $event)' \n        [ngModel]='options.indexOf(options[4]) >= 0' \n            />    \n    <label for='dueDate'>Due Date</label>    \n    </p>\n        <all-bill [bill]='bill' [optionArr]='optionsMap' *ngFor='let bill of bills| billFilter: nameFilter'> </all-bill>\n    </div>\n    <div class=\"w3-container\" *ngIf=\"display==false\">\n    <label for=\"message\">No bills are pending for payment</label>\n    </div>\n    \n    "
                },] },
    ];
    /** @nocollapse */
    BillsListComponent.ctorParameters = function () { return [
        { type: BillService, },
        { type: UserService, },
        { type: ActivatedRoute, },
    ]; };
    return BillsListComponent;
}());
export { BillsListComponent };
