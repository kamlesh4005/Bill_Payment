import { Pipe, PipeTransform } from '@angular/core';
var UserFilterPipe = /** @class */ (function () {
    function UserFilterPipe() {
    }
    UserFilterPipe.prototype.transform = function (value, args) {
        var filter = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter(function (user) {
            return user.firstName.toLocaleLowerCase().startsWith(filter) != false;
        }) : value;
    };
    UserFilterPipe.decorators = [
        { type: Pipe, args: [{ name: 'userFilter' },] },
    ];
    /** @nocollapse */
    UserFilterPipe.ctorParameters = function () { return []; };
    return UserFilterPipe;
}());
export { UserFilterPipe };
