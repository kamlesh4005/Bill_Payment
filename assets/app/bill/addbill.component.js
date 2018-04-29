import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { BillService } from "./bill.service";
import { Bill } from "./bill.model";
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';
var AddBillComponent = /** @class */ (function () {
    function AddBillComponent(billService, userService, route, router, location) {
        this.billService = billService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.location = location;
    }
    AddBillComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isLoggedIn() || !this.userService.isAdmin()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        this.billService.getAllBillerNames().subscribe(function (billerNames) {
            _this.billerNames = billerNames;
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
        this.billService.getAllUsers().subscribe(function (userMailIds) {
            var index = userMailIds.indexOf('admin@test.com');
            if (index > -1) {
                userMailIds.splice(index, 1);
            }
            console.log(userMailIds);
            _this.userMailIds = userMailIds;
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
        this.myid = this.route.snapshot.params['id'];
        if (this.myid != undefined) {
            this.billService.getBillById(this.myid)
                .subscribe(function (bill) {
                _this.bill = bill;
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        this.addBillForm = new FormGroup({
            billerName: new FormControl(null, Validators.required),
            userMailId: new FormControl(null, Validators.required),
            billingAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
            billingDate: new FormControl(null, Validators.required),
            dueDate: new FormControl(null, Validators.required),
            paidDate: new FormControl(null, null),
            billPaid: new FormControl(null, null),
            id: new FormControl(null, null)
        });
    };
    AddBillComponent.prototype.ngAfterViewInit = function () {
        /*  var d = new Date();
                var end_date = new Date();
                end_date.setDate(d.getDate() + 30);
                $('#billingDate').pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15, // Creates a dropdown of 15 years to control year,
                    max: d,
                    today: 'Today',
                    clear: 'Clear',
                    close: 'Ok',
                    format: 'dd/mm/yyyy',
                    closeOnSelect: false // Close upon selecting a date,
                });
        
                $('.datepicker_DueDate').pickadate({
                    selectMonths: true, // Creates a dropdown to control month
                    selectYears: 15, // Creates a dropdown of 15 years to control year,
                    min: d,
                    max: end_date,
                    today: 'Today',
                    clear: 'Clear',
                    close: 'Ok',
                    format: 'dd/mm/yyyy',
                    closeOnSelect: false // Close upon selecting a date,
                });*/
    };
    AddBillComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('submit called');
        this.myid = this.route.snapshot.params['id'];
        if (this.myid) {
            // this.biller.billerName = this.addBillerForm.value.billerName;
            // this.biller.billerDescription = this.addBillerForm.value.billerDescription;
            var bill = new Bill(this.addBillForm.value.billerName, this.addBillForm.value.userMailId, this.addBillForm.value.billingAmount, this.addBillForm.value.billingDate, this.addBillForm.value.dueDate, undefined, 'no', this.myid);
            console.log(bill);
            this.billService.editBill(bill)
                .subscribe(function (result) { return _this.router.navigateByUrl('/bills/allbills'); }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
            this.bill = null;
        }
        else {
            console.log(this.addBillForm.value.billingDate);
            console.log(this.addBillForm.value.dueDate);
            var bill = new Bill(this.addBillForm.value.billerName, this.addBillForm.value.userMailId, this.addBillForm.value.billingAmount, this.addBillForm.value.billingDate, this.addBillForm.value.dueDate, undefined, 'no');
            this.billService.addBill(bill)
                .subscribe(function (data) { return _this.router.navigateByUrl('/bills/allbills'); }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        this.addBillForm.reset();
    };
    AddBillComponent.decorators = [
        { type: Component, args: [{
                    selector: 'add-bill',
                    templateUrl: './addbill.component.html'
                },] },
    ];
    /** @nocollapse */
    AddBillComponent.ctorParameters = function () { return [
        { type: BillService, },
        { type: UserService, },
        { type: ActivatedRoute, },
        { type: Router, },
        { type: Location, },
    ]; };
    return AddBillComponent;
}());
export { AddBillComponent };
