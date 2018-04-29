import { Component, OnInit } from "@angular/core";
import { BillerService } from "./biller.service";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";
var BillerComponent = /** @class */ (function () {
    function BillerComponent(billerService, userService, router) {
        this.billerService = billerService;
        this.userService = userService;
        this.router = router;
    }
    BillerComponent.prototype.ngOnInit = function () {
        if (!this.userService.isLoggedIn() || !this.userService.isAdmin()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
    };
    BillerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-biller',
                    template: "\n    <div class=\"row spacing\">\n        <router-outlet></router-outlet>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    BillerComponent.ctorParameters = function () { return [
        { type: BillerService, },
        { type: UserService, },
        { type: Router, },
    ]; };
    return BillerComponent;
}());
export { BillerComponent };
