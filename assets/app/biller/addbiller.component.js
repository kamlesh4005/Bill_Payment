import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { BillerService } from "./biller.service";
import { BillService } from "../bill/bill.service";
import { Biller } from "./biller.model";
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';
var AddBillerComponent = /** @class */ (function () {
    function AddBillerComponent(billerService, userService, route, router, billService) {
        this.billerService = billerService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.billService = billService;
        this.validator = this.billerNameValidator();
    }
    AddBillerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isLoggedIn() || !this.userService.isAdmin()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            //this.router.navigateByUrl('/auth/signin');
        }
        this.myid = this.route.snapshot.params['id'];
        if (this.myid != undefined) {
            this.billerService.getBillerById(this.myid)
                .subscribe(function (biller) {
                _this.biller = biller;
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        this.billService.getAllBillerNames().subscribe(function (billerNames) {
            _this.billerNames = billerNames;
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
        this.addBillerForm = new FormGroup({
            billerName: new FormControl(null, [Validators.required, this.validator]),
            billerDescription: new FormControl(null, Validators.required),
            id: new FormControl(null, null)
        });
    };
    AddBillerComponent.prototype.onSubmit = function () {
        var _this = this;
        this.myid = this.route.snapshot.params['id'];
        if (this.myid) {
            var biller = new Biller(this.addBillerForm.value.billerName, this.addBillerForm.value.billerDescription, this.myid);
            this.billerService.getBillerById(this.myid)
                .subscribe(function (biller) {
                _this.biller = biller;
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
            this.billerService.editBiller(biller)
                .subscribe(function (result) { return _this.router.navigateByUrl('/billers/allbillers'); }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
            this.biller = null;
        }
        else {
            var biller = new Biller(this.addBillerForm.value.billerName, this.addBillerForm.value.billerDescription);
            this.billerService.addBiller(biller)
                .subscribe(function (data) { return _this.router.navigateByUrl('/billers/allbillers'); }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        this.addBillerForm.reset();
    };
    AddBillerComponent.prototype.billerNameValidator = function () {
        var _this = this;
        console.log('called');
        //console.log(c);
        return function (c) {
            console.log(c);
            console.log(c.value);
            if (c.value != null && c.value != undefined) {
                var billerName = c.value;
                console.log(billerName);
                for (var _i = 0, _a = _this.billerNames; _i < _a.length; _i++) {
                    var biller = _a[_i];
                    if (billerName.toLowerCase() == biller.toLowerCase()) {
                        return {
                            billerNamevalidator: {
                                valid: false
                            }
                        };
                    }
                }
            }
            return null;
        };
    };
    AddBillerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'add-biller',
                    templateUrl: './addbiller.component.html'
                },] },
    ];
    /** @nocollapse */
    AddBillerComponent.ctorParameters = function () { return [
        { type: BillerService, },
        { type: UserService, },
        { type: ActivatedRoute, },
        { type: Router, },
        { type: BillService, },
    ]; };
    return AddBillerComponent;
}());
export { AddBillerComponent };
