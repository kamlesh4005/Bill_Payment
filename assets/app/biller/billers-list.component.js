import { Component, OnInit } from "@angular/core";
import { Biller } from "./biller.model";
import { BillerService } from "./biller.service";
import { Router } from '@angular/router';
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';
import { BillerFilterPipe } from './billers-filter.pipe';
var BillersListComponent = /** @class */ (function () {
    function BillersListComponent(billerService, userService, router) {
        this.billerService = billerService;
        this.userService = userService;
        this.router = router;
        this.options = ['billerName', 'billerDescription'];
        this.optionsMap = {
            billerName: false,
            billerDescription: false
        };
        this.optionsChecked = [];
    }
    BillersListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isLoggedIn() || !this.userService.isAdmin()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        for (var x = 0; x < this.options.length; x++) {
            this.optionsMap[this.options[x]] = true;
        }
        this.billerService.getAllBillers()
            .subscribe(function (billers) {
            _this.billers = billers;
            console.log(_this.billers);
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
    };
    BillersListComponent.prototype.updateCheckedOptions = function (option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
    };
    BillersListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'billers-list',
                    template: "\n    <div class=\"w3-padding-64 w3-col m7 col-md-offset-2\">\n    <div class=\"w3-padding-16\"></div>\n    <div class=\"center\">\n    <b class=\"pagetitle\">Billers</b>\n    \n    </div>\n    <div class=\"row\">\n    <label for=\"filterby\">Filter by:</label>\n    <input type='text'\n            [(ngModel)]='nameFilter' />\n    \n    <input type='checkbox' name='billerName' value='options[0]' id='billerName' \n    [checked]='options.indexOf(options[0]) >= 0'\n           (change)='updateCheckedOptions(options[0], $event)' \n           [ngModel]='options.indexOf(options[0]) >= 0' \n            />\n    <label for='billerName'>Biller Name</label>\n\n    <input type='checkbox' name='billerDescription' value='options[1]' id='billerDescription'\n    [checked]='options.indexOf(options[1]) >= 0'\n           (change)='updateCheckedOptions(options[1], $event)' \n           [ngModel]='options.indexOf(options[1]) >= 0' \n            />    \n    <label for='billerDescription'>Biller Description</label>\n    <all-biller [biller]='biller' [optionArr]='optionsMap' *ngFor='let biller of billers| billerFilter: nameFilter'> \n\n            </all-biller>\n        \n    </div>\n    </div>\n    "
                },] },
    ];
    /** @nocollapse */
    BillersListComponent.ctorParameters = function () { return [
        { type: BillerService, },
        { type: UserService, },
        { type: Router, },
    ]; };
    return BillersListComponent;
}());
export { BillersListComponent };
