import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "./user.service";
import { User } from "./user.model";
import swal from 'sweetalert2';
var SigninComponent = /** @class */ (function () {
    function SigninComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    SigninComponent.prototype.ngOnInit = function () {
        if (this.userService.isLoggedIn()) {
            console.log('User already logged in');
            this.router.navigateByUrl('');
            //this.router.navigateByUrl('/bills/allbills');
        }
        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
    };
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new User(this.myForm.value.email, this.myForm.value.password);
        this.userService.signin(user)
            .subscribe(function (data) {
            console.log(data);
            console.log(Object.keys(data));
            console.log(Object.keys(data).length);
            if (Object.keys(data).length != 0 &&
                data != null) {
                sessionStorage.setItem('token', data.token);
                sessionStorage.setItem('userId', data.userId);
                sessionStorage.setItem('userName', data.userName);
                sessionStorage.setItem('userRole', data.userRole);
                //if(data.userRole.indexOf('admin') != -1)
                //if(data.userRole.indexOf('admin') != -1)
                _this.router.navigateByUrl('');
                //this.router.navigateByUrl('/billers/allbillers');
                //else if(data.userRole.indexOf('user') != -1)
                //   this.router.navigateByUrl('/billers/allbillers');
                //this.router.navigateByUrl('/bills/allbills/'+data.userId);
            }
            else {
                sessionStorage.clear();
                swal({ text: "Invalid username or Password",
                    type: "error"
                });
                _this.router.navigateByUrl('/auth/signin');
            }
        }, function (error) {
            console.log(error);
            swal({ text: error.error.message,
                type: "error"
            });
        });
        this.myForm.reset();
    };
    SigninComponent.decorators = [
        { type: Component, args: [{
                    selector: 'app-signin',
                    templateUrl: './signin.component.html'
                },] },
    ];
    /*ngOnDestroy(){
            console.log('ondestroy is called');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userRole');
        }*/
    /** @nocollapse */
    SigninComponent.ctorParameters = function () { return [
        { type: UserService, },
        { type: Router, },
    ]; };
    return SigninComponent;
}());
export { SigninComponent };
