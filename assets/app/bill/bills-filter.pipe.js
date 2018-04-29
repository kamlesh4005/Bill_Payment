import { Pipe, PipeTransform } from '@angular/core';
var BillFilterPipe = /** @class */ (function () {
    function BillFilterPipe() {
    }
    BillFilterPipe.prototype.transform = function (value, args) {
        var filter = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter(function (bill) {
            return bill.billerName.toLocaleLowerCase().startsWith(filter) != false;
        }) : value;
    };
    BillFilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'billFilter' },] },
    ];
    /** @nocollapse */
    BillFilterPipe.ctorParameters = function () { return []; };
    return BillFilterPipe;
}());
export { BillFilterPipe };
