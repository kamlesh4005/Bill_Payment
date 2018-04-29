import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";
var AuthenticationComponent = /** @class */ (function () {
    function AuthenticationComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthenticationComponent.prototype.ngOnInit = function () {
        if (this.userService.isLoggedIn()) {
            console.log('User already logged in');
            //this.router.navigateByUrl('/bills/allbills');
            this.router.navigateByUrl('');
        }
    };
    AuthenticationComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-authentication',
                    template: "\n    <div class=\"row spacing\">\n        <router-outlet></router-outlet>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    AuthenticationComponent.ctorParameters = function () { return [
        { type: UserService, },
        { type: Router, },
    ]; };
    return AuthenticationComponent;
}());
export { AuthenticationComponent };
