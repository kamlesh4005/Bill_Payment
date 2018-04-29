import { Component, OnInit, Input } from "@angular/core";
import { Biller } from "./biller.model";
import { Bill } from "../bill/bill.model";
import { BillerService } from "./biller.service";
import { Router } from '@angular/router';
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';
var BillersComponent = /** @class */ (function () {
    function BillersComponent(billerService, userService, router) {
        this.billerService = billerService;
        this.userService = userService;
        this.router = router;
    }
    BillersComponent.prototype.ngOnInit = function () {
        if (!this.userService.isLoggedIn() || !this.userService.isAdmin()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
    };
    BillersComponent.prototype.onEdit = function (id) {
        var _this = this;
        this.billerService.getAllBillsofBiller(this.biller.billerName).subscribe(function (result) {
            console.log(result);
            console.log(result.length);
            console.log(id);
            (result == null || result.length == 0) ?
                _this.router.navigateByUrl('/billers/addbiller/' + id)
                : swal({ text: 'Biller record updation is not allowed',
                    type: "info" });
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
    };
    BillersComponent.prototype.onDelete = function (id) {
        var _this = this;
        this.billerService.getAllBillsofBiller(this.biller.billerName).subscribe(function (result) {
            console.log(id);
            (result == null || result.length == 0) ?
                _this.billerService.deleteBiller(id)
                    .subscribe(function (result) { return _this.router.navigateByUrl('/billers/refreshbillers'); }, function (err) { return console.log(err); })
                : swal({ text: 'Biller record deletion is not allowed',
                    type: "info" }),
                function (error) {
                    console.log(error);
                    swal({ text: error.error.message,
                        type: "error"
                    });
                };
        });
    };
    BillersComponent.decorators = [
        { type: Component, args: [{
                    selector: 'all-biller',
                    templateUrl: './billers.component.html',
                    styles: ["\n        .billerDescription {\n            display: inline-block;\n            font-style: italic;\n            font-size: 12px;\n            width: 80%;\n        }\n        .config {\n            display: inline-block;\n            text-align: right;\n            font-size: 12px;\n            width: 19%;\n        }\n    "]
                },] },
    ];
    /** @nocollapse */
    BillersComponent.ctorParameters = function () { return [
        { type: BillerService, },
        { type: UserService, },
        { type: Router, },
    ]; };
    BillersComponent.propDecorators = {
        "biller": [{ type: Input },],
        "optionArr": [{ type: Input },],
    };
    return BillersComponent;
}());
export { BillersComponent };
