import { Component } from '@angular/core';
import { BillerService } from './biller/biller.service';
import { BillService } from './bill/bill.service';
var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent.decorators = [
        { type: Component, args: [{
                    selector: 'my-app',
                    templateUrl: './app.component.html',
                    providers: [BillerService, BillService]
                },] },
    ];
    /** @nocollapse */
    AppComponent.ctorParameters = function () { return []; };
    return AppComponent;
}());
export { AppComponent };
