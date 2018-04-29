import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from "./user.model";
import { UserService } from "./user.service";
import swal from 'sweetalert2';
var ProfileUpdateComponent = /** @class */ (function () {
    function ProfileUpdateComponent(userService, route, router, fb) {
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.fb = fb;
        this.firstName = new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z]+")]);
    }
    ProfileUpdateComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isLoggedIn()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        this.myemail = this.route.snapshot.params['email'];
        this.userService.getUserDetailByEmail(this.myemail)
            .subscribe(function (users) {
            _this.user = users[0];
            console.log(_this.user);
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
        this.myForm = this.fb.group({
            'firstName': this.firstName,
            //new FormControl(null, [Validators.required,Validators.pattern("[a-zA-Z]+")]),
            'lastName': new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z]+"),
            ]),
            mobileNumber: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)])
        }, { validator: this.uniqueValueValidator('firstName', 'lastName') });
    };
    ProfileUpdateComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myemail, null, this.myForm.value.mobileNumber, this.myForm.value.firstName, this.myForm.value.lastName, null, null);
        this.userService.updateUserByEmail(user)
            .subscribe(function (data) {
            console.log(data.message);
            swal({ text: "User profile is updated successfully. Please logout and login again to reflect  first name changes in welcome message",
                type: "success"
            });
            _this.router.navigateByUrl('/auth/viewprofile');
        }, function (error) {
            swal({ text: error.error.message,
                type: "error"
            });
        });
        // const admin = new Admin(
        //     this.myForm.value.email,
        //     this.myForm.value.password,
        //     this.myForm.value.firstName,
        //     this.myForm.value.lastName
        // );
        // this.adminService.signup(admin)
        //     .subscribe(
        //         data => console.log(data),
        //         error => console.log(error)
        //     );
        // this.myForm.reset();
    };
    ProfileUpdateComponent.prototype.uniqueValueValidator = function (firstVal, secondVal) {
        console.log('called');
        return function (group) {
            console.log(group);
            var first = group.controls[firstVal];
            var second = group.controls[secondVal];
            console.log(first.value);
            console.log(second.value);
            //console.log(second);
            if (first.value != null && second.value != null) {
                var isMatch = first.value === second.value;
                console.log(isMatch);
                // set equal value error on dirty controls
                if (isMatch) {
                    second.setErrors({ uniqueValue: firstVal });
                    var message = firstVal + ' != ' + secondVal;
                    //const message = 'Both First name and Last name should not be same.';
                    console.log(message);
                    return { 'uniqueValue': message };
                }
                if (!isMatch && second.hasError('uniqueValue')) {
                    second.setErrors(null);
                }
            }
            return null;
        };
    };
    ProfileUpdateComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-updateprofile',
                    templateUrl: './profileupdate.component.html'
                },] },
    ];
    /** @nocollapse */
    ProfileUpdateComponent.ctorParameters = function () { return [
        { type: UserService, },
        { type: ActivatedRoute, },
        { type: Router, },
        { type: FormBuilder, },
    ]; };
    return ProfileUpdateComponent;
}());
export { ProfileUpdateComponent };
