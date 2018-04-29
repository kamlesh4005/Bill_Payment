import { Component, OnInit } from "@angular/core";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";
var BillComponent = /** @class */ (function () {
    function BillComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    BillComponent.prototype.ngOnInit = function () {
        if (!this.userService.isLoggedIn() && (!this.userService.isAdmin()
            || !this.userService.isUser())) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        if (this.userService.isUser()) {
            this.userId = sessionStorage.getItem("userId");
        }
    };
    BillComponent.prototype.isAdmin = function () {
        return this.userService.isAdmin();
    };
    BillComponent.prototype.isUser = function () {
        return this.userService.isUser();
    };
    BillComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-bill',
                    template: "\n    <div class=\"row spacing\">\n        <router-outlet></router-outlet>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    BillComponent.ctorParameters = function () { return [
        { type: UserService, },
        { type: Router, },
    ]; };
    return BillComponent;
}());
export { BillComponent };
