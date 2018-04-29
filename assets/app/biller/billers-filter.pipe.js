import { Pipe, PipeTransform } from '@angular/core';
var BillerFilterPipe = /** @class */ (function () {
    function BillerFilterPipe() {
    }
    BillerFilterPipe.prototype.transform = function (value, args) {
        var filter = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter(function (biller) {
            return biller.billerName.toLocaleLowerCase().startsWith(filter) != false;
        }) : value;
    };
    BillerFilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'billerFilter' },] },
    ];
    /** @nocollapse */
    BillerFilterPipe.ctorParameters = function () { return []; };
    return BillerFilterPipe;
}());
export { BillerFilterPipe };
