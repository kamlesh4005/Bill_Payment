import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user/user.service";
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    HeaderComponent.prototype.isLoggedIn = function () {
        return this.userService.isLoggedIn();
    };
    HeaderComponent.prototype.isAdmin = function () {
        return this.userService.isAdmin();
    };
    HeaderComponent.prototype.isUser = function () {
        this.userName = sessionStorage.getItem('userName');
        this.userId = sessionStorage.getItem('userId');
        return this.userService.isUser();
    };
    HeaderComponent.prototype.onLogout = function () {
        this.userService.logout();
        this.router.navigateByUrl('/auth/signin');
    };
    HeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-header',
                    template: "\n    \n    <header id=\"home\">\n\n    \n\n    <!-- Navbar -->\n    <div class=\"w3-top\">\n      <div class=\"w3-bar  w3-flat-wet-asphalt w3-card\">\n        <div class=\"w3-bar-item applicationtitle\">makeMyPayment</div>\n        \n        \n        <a class=\"w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right\" href=\"javascript:void(0)\" onclick=\"myFunction()\" title=\"Toggle Navigation Menu\">\n        <i class=\"fa fa-bars\"></i>\n        </a>\n        <a [routerLink]=\"['/bills/profile']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isLoggedIn()\">Profile</a>\n        <a [routerLink]=\"['/billers/chart']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">Chart</a>\n        <a [routerLink]=\"['/billers/addbiller']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">NewBiller</a>    \n        <a [routerLink]=\"['/billers/allbillers']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">Billers</a>\n        <a [routerLink]=\"['/bills/addbill']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">NewBill</a>\n        <a [routerLink]=\"['/bills/viewbillhistory']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isUser()\">PaymentHistory</a>\n        <a [routerLink]=\"['/bills/allbills',{userId:userId}]\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isUser()\">Bills</a>\n        <a [routerLink]=\"['/bills/allbills']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">Bills</a>\n        <a [routerLink]=\"['']\" class=\"w3-right w3-bar-item w3-button w3-padding-large\" *ngIf=\"isLoggedIn()\">Home</a>\n        <!--<a [routerLink]=\"['']\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isLoggedIn()\">ChangePassword</a>-->\n        <a class=\"w3-bar-item w3-button w3-padding-large w3-hide-small w3-right\" (click)=\"onLogout()\" *ngIf=\"isLoggedIn()\">Logout</a>\n        <a [routerLink]=\"['/auth/signup']\" *ngIf=\"!isLoggedIn()\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\"><i class=\"fa fa-user-plus\"></i>Sign up</a>\n        <a [routerLink]=\"['/auth/signin']\" *ngIf=\"!isLoggedIn()\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\"><i class=\"fa fa-sign-in-alt\"></i>Login</a>\n        \n        <div class=\"w3-padding-large w3-right w3-bar-item\" *ngIf=\"isLoggedIn()\">Welcome {{userName}}</div>\n        \n        <!--<a href=\"#\" class=\"w3-bar-item w3-button w3-padding-large\">HOME</a>\n        <a href=\"#band\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\">BAND</a>\n        <a href=\"#tour\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\">TOUR</a>\n        <a href=\"#contact\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\">CONTACT</a>\n        <div class=\"w3-dropdown-hover w3-hide-small\">\n          <button class=\"w3-padding-large w3-button\" title=\"More\">MORE <i class=\"fa fa-caret-down\"></i></button>     \n          <div class=\"w3-dropdown-content w3-bar-block w3-card-4\">\n            <a href=\"#\" class=\"w3-bar-item w3-button\">Merchandise</a>\n            <a href=\"#\" class=\"w3-bar-item w3-button\">Extras</a>\n            <a href=\"#\" class=\"w3-bar-item w3-button\">Media</a>\n          </div>\n        </div>-->\n        \n      </div>\n    </div>\n    \n    <!-- Navbar on small screens -->\n    <div id=\"navDemo\" class=\"w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top\" style=\"margin-top:46px\">\n    <a [routerLink]=\"['/bills/profile']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isLoggedIn()\">Profile</a>\n    <a [routerLink]=\"['/billers/chart']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">Chart</a>\n    <a [routerLink]=\"['/billers/addbiller']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">NewBiller</a>    \n    <a [routerLink]=\"['/billers/allbillers']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">Billers</a>\n    <a [routerLink]=\"['/bills/addbill']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">NewBill</a>\n    <a [routerLink]=\"['/bills/viewbillhistory']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isUser()\">PaymentHistory</a>\n    <a [routerLink]=\"['/bills/allbills',{userId:userId}]\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isUser()\">Bills</a>\n    <a [routerLink]=\"['/bills/allbills']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isAdmin()\">Bills</a>\n    <a [routerLink]=\"['']\" class=\"w3-bar-item w3-button w3-padding-large\" *ngIf=\"isLoggedIn()\">Home</a>\n    <!--<a [routerLink]=\"['']\" class=\"w3-bar-item w3-button w3-padding-large w3-hide-small\" *ngIf=\"isLoggedIn()\">ChangePassword</a>-->\n    <a class=\"w3-bar-item w3-button w3-padding-large w3-hide-small w3-right\" (click)=\"onLogout()\" *ngIf=\"isLoggedIn()\">Logout</a>\n    <a [routerLink]=\"['/auth/signup']\" *ngIf=\"!isLoggedIn()\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\"><i class=\"fas fa-user-plus\"></i>Sign up</a>\n    <a [routerLink]=\"['/auth/signin']\" *ngIf=\"!isLoggedIn()\" class=\"w3-right w3-bar-item w3-button w3-padding-large w3-hide-small\"><i class=\"fas fa-sign-in-alt\"></i>Login</a>\n    \n    <div class=\"w3-padding-large w3-right w3-bar-item\" *ngIf=\"isLoggedIn()\">Welcome {{userName}}</div>\n    </div>\n    \n    \n   \n    <!--<div class=\"w3-top\">\n    <div class=\"w3-white w3-xlarge\" style=\"max-width:1200px;margin:auto\">\n      <div class=\"w3-button w3-padding-16 w3-left\" onclick=\"w3_open()\">\u2630</div>\n      <div class=\"w3-right w3-padding-16\">Welcome {{userName}}</div>\n      <div class=\"w3-center w3-padding-16\">MakeMyPayment</div>\n    </div>\n  </div>-->\n  \n  \n    <!--<div class=\"w3-top\">\n    <div class=\"w3-bar w3-flat-belize-hole w3-wide w3-padding w3-card\">\n      <p class=\"w3-bar-item applicationtitle\">makeMyPayment</p>\n      <br>\n      <div class=\"w3-right w3-hide-small\">\n      <div *ngIf=\"isLoggedIn()\" class=\"w3-bar-item\">Welcome {{userName}}</div>\n  \n        <a [routerLink]=\"['']\" class=\"w3-bar-item\" *ngIf=\"isLoggedIn()\">Home</a>\n        <a [routerLink]=\"['/bills/profile']\" class=\"w3-bar-item\" *ngIf=\"isLoggedIn()\">Profile</a>\n        <a [routerLink]=\"['']\" class=\"w3-bar-item\" *ngIf=\"isLoggedIn()\">ChangePassword</a>\n        <a [routerLink]=\"['/bills/allbills']\" class=\"w3-bar-item\" *ngIf=\"isAdmin()\">Bills</a>\n        <a [routerLink]=\"['/bills/allbills',{userId:userId}]\" class=\"w3-bar-item w3-button\" *ngIf=\"isUser()\">Bills</a>\n        <a [routerLink]=\"['/bills/viewbillhistory']\" class=\"w3-bar-item w3-button\" *ngIf=\"isUser()\">PaymentHistory</a>\n        <a [routerLink]=\"['/bills/addbill']\" class=\"w3-bar-item w3-button\" *ngIf=\"isAdmin()\">NewBill</a>\n        <a [routerLink]=\"['/billers/allbillers']\" class=\"w3-bar-item w3-button\" *ngIf=\"isAdmin()\">Billers</a>\n        <a [routerLink]=\"['/billers/addbiller']\" class=\"w3-bar-item w3-button\" *ngIf=\"isAdmin()\">NewBiller</a>    \n        <a [routerLink]=\"['/billers/chart']\" class=\"w3-bar-item w3-button\" *ngIf=\"isAdmin()\">Chart</a>\n        \n        <a [routerLink]=\"['/auth/signup']\" *ngIf=\"!isLoggedIn()\" class=\"w3-bar-item w3-button\"><span class=\"glyphicon glyphicon-user\"></span>    Sign up</a>\n        <a [routerLink]=\"['/auth/signin']\" *ngIf=\"!isLoggedIn()\" class=\"w3-bar-item w3-button\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a>\n        <button class=\"w3-bar-item w3-button w3-teal\" (click)=\"onLogout()\" *ngIf=\"isLoggedIn()\">Logout</button>\n      </div>\n              \n    </div>\n  </div>-->\n  </header>\n  <!-- Header -->\n  <!--<header class=\"w3-display-container w3-content w3-wide\" style=\"max-width:1500px;\" id=\"home\">\n    <img class=\"w3-image\" src=\"/w3images/architect.jpg\" alt=\"Architecture\" width=\"1500\" height=\"800\">\n    <div class=\"w3-display-middle w3-margin-top w3-center\">\n      <h1 class=\"w3-xxlarge w3-text-white\"><span class=\"w3-padding w3-black w3-opacity-min\"><b>BR</b></span> <span class=\"w3-hide-small w3-text-light-grey\">Architects</span></h1>\n    </div>\n  </header>-->\n  \n\n    <!--<header class=\"row\">\n    <nav class=\"navbar navbar-dark bg-primary\">\n    <div class=\"container-fluid\">\n      <div class=\"navbar-header\">\n        <a class=\"applicationtitle\">makeMyPayment</a>\n      </div>\n\n        \n       <ul class=\"nav nav-tabs\">\n        <li class=\"active\" *ngIf=\"isLoggedIn()\"><a [routerLink]=\"['']\">Home</a></li>\n        <li routerLinkActive=\"active\" data-toggle=\"tab\" *ngIf=\"isAdmin()\"><a [routerLink]=\"['/bills/allbills']\">BillDetails</a></li>\n        <li routerLinkActive=\"active\" data-toggle=\"tab\" *ngIf=\"isUser()\"><a [routerLink]=\"['/bills/allbills',{userId:userId}]\">BillDetails</a></li>\n        <li routerLinkActive=\"active\" data-toggle=\"tab\" *ngIf=\"isUser()\"><a [routerLink]=\"['/bills/viewbillhistory']\">PaymentHistory</a></li>\n        <li routerLinkActive=\"active\" data-toggle=\"tab\" *ngIf=\"isAdmin()\"><a [routerLink]=\"['/bills/addbill']\">BillGenerator</a></li>\n        <li routerLinkActive=\"active\" *ngIf=\"isAdmin()\"><a [routerLink]=\"['/billers/allbillers']\">BillerDetails</a></li>\n        <li routerLinkActive=\"active\" *ngIf=\"isAdmin()\"><a [routerLink]=\"['/billers/addbiller']\">BillerCreate</a></li>    \n        <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn() && isAdmin()\"><a [routerLink]=\"['/billers/chart']\">Chart</a></li>\n        \n        <ul class=\"nav navbar-nav navbar-right\">\n        <li routerLinkActive=\"active\" *ngIf=\"!isLoggedIn()\"><a [routerLink]=\"['/auth/signup']\"><span class=\"glyphicon glyphicon-user\"></span>    Sign up</a></li>\n        \n        <li routerLinkActive=\"active\" *ngIf=\"!isLoggedIn()\"><a [routerLink]=\"['/auth/signin']\"><span class=\"glyphicon glyphicon-log-in\"></span> Login</a></li>\n        <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn() && isAdmin()\">Welcome Admin </li>\n        <li routerLinkActive=\"active\" *ngIf=\"isLoggedIn() && isUser()\">Welcome {{userId}} </li>\n        <button class=\"btn navbar-btn\" (click)=\"onLogout()\" *ngIf=\"isLoggedIn()\">Logout</button>\n        </ul>\n      </ul>      \n    </div>\n  </nav>\n    \n    </header>-->\n\n    "
                },] },
    ];
    /** @nocollapse */
    HeaderComponent.ctorParameters = function () { return [
        { type: UserService, },
        { type: Router, },
    ]; };
    return HeaderComponent;
}());
export { HeaderComponent };