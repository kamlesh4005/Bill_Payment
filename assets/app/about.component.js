import { Component } from '@angular/core';
import { UserService } from "./user/user.service";
var AboutComponent = /** @class */ (function () {
    function AboutComponent(userService) {
        this.userService = userService;
    }
    AboutComponent.prototype.isAdmin = function () {
        return this.userService.isAdmin();
    };
    AboutComponent.prototype.isUser = function () {
        return this.userService.isUser();
    };
    AboutComponent.decorators = [
        { type: Component, args: [{
                    template: "<div class=\"w3-container w3-center w3-display-middle w3-tangerine w3-padding-64\">\n  <div id=\"home\" *ngIf=\"isAdmin()\" >\n    <div class=\"w3-jumbo\"><b>Welcome to makeMyPayment System</b></div>\n    <p class=\"w3-xxlarge\">This system helps you to do create, edit and delete bills and billers. It shows chart for top bill payments done by users.</p>\n  </div>\n  <div id=\"home1\" *ngIf=\"isUser()\" >\n    <div class=\"w3-jumbo\"><b>Welcome to makeMyPayment System</b></div>\n      <p class=\"w3-xxlarge\">This system helps you to make payment and view payments history</p>\n  </div>\n</div>"
                },] },
    ];
    /** @nocollapse */
    AboutComponent.ctorParameters = function () { return [
        { type: UserService, },
    ]; };
    return AboutComponent;
}());
export { AboutComponent };
