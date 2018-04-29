import { Component, Input } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { Router } from '@angular/router';
import { UserService } from "../user/user.service";
var BillHistoryComponent = /** @class */ (function () {
    function BillHistoryComponent(billService, userService, router) {
        this.billService = billService;
        this.userService = userService;
        this.router = router;
    }
    BillHistoryComponent.prototype.ngOnInit = function () {
        if (!this.userService.isLoggedIn() && (this.userService.isAdmin()
            || this.userService.isUser())) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
    };
    BillHistoryComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bill-history',
                    templateUrl: './billhistory.component.html'
                },] },
    ];
    /** @nocollapse */
    BillHistoryComponent.ctorParameters = function () { return [
        { type: BillService, },
        { type: UserService, },
        { type: Router, },
    ]; };
    BillHistoryComponent.propDecorators = {
        "bill": [{ type: Input },],
        "optionArr": [{ type: Input },],
    };
    return BillHistoryComponent;
}());
export { BillHistoryComponent };
