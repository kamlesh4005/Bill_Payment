import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../user/user.service";
var RefreshBillsComponent = /** @class */ (function () {
    function RefreshBillsComponent(router, userService, route) {
        this.router = router;
        this.userService = userService;
        this.route = route;
    }
    RefreshBillsComponent.prototype.ngOnInit = function () {
        if (this.userService.isAdmin())
            this.router.navigateByUrl('/bills/allbills');
        else if (this.userService.isUser()) {
            var userId = this.route.snapshot.params['userMailId'];
            console.log("from nginit");
            console.log(userId);
            this.router.navigateByUrl('/bills/allbills/' + userId);
        }
    };
    RefreshBillsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'bill',
                    template: "\n    "
                },] },
    ];
    /** @nocollapse */
    RefreshBillsComponent.ctorParameters = function () { return [
        { type: Router, },
        { type: UserService, },
        { type: ActivatedRoute, },
    ]; };
    return RefreshBillsComponent;
}());
export { RefreshBillsComponent };
