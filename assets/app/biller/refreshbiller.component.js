import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
var RefreshBillersComponent = /** @class */ (function () {
    function RefreshBillersComponent(router) {
        this.router = router;
    }
    RefreshBillersComponent.prototype.ngOnInit = function () {
        this.router.navigateByUrl('/billers/allbillers');
    };
    RefreshBillersComponent.decorators = [
        { type: Component, args: [{
                    selector: 'biller',
                    template: "\n    "
                },] },
    ];
    /** @nocollapse */
    RefreshBillersComponent.ctorParameters = function () { return [
        { type: Router, },
    ]; };
    return RefreshBillersComponent;
}());
export { RefreshBillersComponent };
