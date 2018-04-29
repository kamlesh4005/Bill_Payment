import { Component, Input, OnInit } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { Router } from '@angular/router';
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';
var BillsComponent = /** @class */ (function () {
    function BillsComponent(billService, userService, router) {
        this.billService = billService;
        this.userService = userService;
        this.router = router;
    }
    BillsComponent.prototype.ngOnInit = function () {
        if (!this.userService.isLoggedIn() || (!this.userService.isAdmin()
            && !this.userService.isUser())) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        console.log('init done');
    };
    BillsComponent.prototype.onEdit = function () {
        var _this = this;
        if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
            //console.log("Invalid Authentication");
            //localStorage.clear();
            //this.router.navigateByUrl('/auth/signin');
            this.billService.getBillById(this.bill.id).subscribe(function (result) {
                return (result != null && result.billPaid.indexOf("no") != -1) ?
                    _this.router.navigateByUrl('/bills/addbill/' + result.id)
                    : swal({ text: 'Bill record updation is not allowed',
                        type: "info" });
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
    };
    BillsComponent.prototype.onDelete = function () {
        var _this = this;
        if (this.userService.isLoggedIn() && this.userService.isAdmin()) {
            this.billService.getBillById(this.bill.id).subscribe(function (result) {
                return (result != null && result.billPaid.indexOf("no") != -1) ?
                    _this.billService.deleteBill(_this.bill.id)
                        .subscribe(function (result) { return _this.router.navigateByUrl('/bills/refreshbills'); }, function (err) { return console.log(err); })
                    : swal({ text: 'Bill record deletion is not allowed',
                        type: "info" });
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
    };
    BillsComponent.prototype.onMakePayment = function () {
        var _this = this;
        if (this.userService.isLoggedIn() && this.userService.isUser()) {
            this.bill.billPaid = 'yes';
            this.bill.paidDate = new Date();
            console.log('makepayment');
            console.log(this.bill.userMailId);
            this.billService.editBillPayment(this.bill).subscribe(function (result) { return _this.router.navigateByUrl('/bills/refreshbills/' + _this.bill.userMailId); }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
    };
    BillsComponent.prototype.isAdmin = function () {
        return this.userService.isAdmin();
    };
    BillsComponent.prototype.isUser = function () {
        return this.userService.isUser();
    };
    BillsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'all-bill',
                    templateUrl: './bills.component.html'
                },] },
    ];
    /** @nocollapse */
    BillsComponent.ctorParameters = function () { return [
        { type: BillService, },
        { type: UserService, },
        { type: Router, },
    ]; };
    BillsComponent.propDecorators = {
        "bill": [{ type: Input },],
        "optionArr": [{ type: Input },],
    };
    return BillsComponent;
}());
export { BillsComponent };
