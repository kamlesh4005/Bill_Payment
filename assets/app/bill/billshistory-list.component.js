import { Component, OnInit } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { UserService } from "../user/user.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import swal from 'sweetalert2';
import { BillFilterPipe } from "./bills-filter.pipe";
var BillsHistoryListComponent = /** @class */ (function () {
    function BillsHistoryListComponent(billService, userService) {
        this.billService = billService;
        this.userService = userService;
        this.options = ['billerName', 'userEmailId', 'billingAmount', 'billingDate', 'dueDate', 'paidDate', 'billPaid'];
        this.optionsMap = {
            billerName: false,
            userEmailId: false,
            billingAmount: false,
            billingDate: false,
            dueDate: false,
            paidDate: false,
            billPaid: false
        };
        this.optionsChecked = [];
    }
    BillsHistoryListComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('called ng');
        if (this.userService.isLoggedIn() && this.userService.isUser()) {
            //this.userId = this.route.snapshot.params['userId'];
            console.log(sessionStorage.getItem('userId'));
            this.billService.getAllBillsForUserHistory(sessionStorage.getItem('userId'))
                .subscribe(function (bills) {
                _this.bills = bills;
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
    BillsHistoryListComponent.prototype.updateCheckedOptions = function (option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
    };
    BillsHistoryListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'billshistory-list',
                    template: "\n    <div class=\"w3-padding-64 w3-col m7 col-md-offset-2\">\n    <div class=\"w3-padding-16\"></div>\n    <div class=\"center\">\n    <b class=\"pagetitle\">Bills History</b>\n    \n    </div>\n\n    <div class=\"row\">\n    <label for=\"filterby\">Filter by:</label>\n    <input type='text'\n        [(ngModel)]='nameFilter' />\n\n    <input type='checkbox' name='billerName' value='options[0]' id='billerName' \n    [checked]='options.indexOf(options[0]) >= 0'\n        (change)='updateCheckedOptions(options[0], $event)' \n        [ngModel]='options.indexOf(options[0]) >= 0' \n            />\n    <label for='billerName'>Biller Name</label>\n\n    <input type='checkbox' name='userEmailId' value='options[1]' id='userEmailId'\n    [checked]='options.indexOf(options[1]) >= 0'\n        (change)='updateCheckedOptions(options[1], $event)' \n        [ngModel]='options.indexOf(options[1]) >= 0' \n            />    \n    <label for='userEmailId'>User Email Id</label>\n\n    <input type='checkbox' name='billingAmount' value='options[2]' id='billingAmount'\n    [checked]='options.indexOf(options[2]) >= 0'\n        (change)='updateCheckedOptions(options[2], $event)' \n        [ngModel]='options.indexOf(options[2]) >= 0' \n            />    \n    <label for='billingAmount'>Billing Amount</label>\n\n\n    <input type='checkbox' name='billingDate' value='options[3]' id='billingDate'\n    [checked]='options.indexOf(options[3]) >= 0'\n        (change)='updateCheckedOptions(options[3], $event)' \n        [ngModel]='options.indexOf(options[3]) >= 0' \n            />    \n    <label for='billingDate'>Billing Date</label>\n\n    <input type='checkbox' name='dueDate' value='options[4]' id='dueDate'\n    [checked]='options.indexOf(options[4]) >= 0'\n        (change)='updateCheckedOptions(options[4], $event)' \n        [ngModel]='options.indexOf(options[4]) >= 0' \n            />    \n    <label for='dueDate'>Due Date</label>\n\n    <input type='checkbox' name='paidDate' value='options[5]' id='paidDate'\n    [checked]='options.indexOf(options[5]) >= 0'\n        (change)='updateCheckedOptions(options[5], $event)' \n        [ngModel]='options.indexOf(options[5]) >= 0' \n            />    \n    <label for='paidDate'>Paid Date</label>\n\n    <input type='checkbox' name='billPaid' value='options[6]' id='billPaid'\n    [checked]='options.indexOf(options[6]) >= 0'\n        (change)='updateCheckedOptions(options[6], $event)' \n        [ngModel]='options.indexOf(options[6]) >= 0' \n            />    \n    <label for='billPaid'>Bill Paid</label>\n\n        <bill-history [bill]=\"bill\" [optionArr]='optionsMap' *ngFor='let bill of bills| billFilter: nameFilter'> </bill-history>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    BillsHistoryListComponent.ctorParameters = function () { return [
        { type: BillService, },
        { type: UserService, },
    ]; };
    return BillsHistoryListComponent;
}());
export { BillsHistoryListComponent };
