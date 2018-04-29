import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup } from "@angular/forms";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { Router } from '@angular/router';
import swal from 'sweetalert2';
var ProfileListComponent = /** @class */ (function () {
    function ProfileListComponent(userService, router) {
        this.userService = userService;
        this.router = router;
        this.options = ['firstName', 'lastName', 'mobileNumber', 'email'];
        this.optionsMap = {
            firstName: false,
            lastName: false,
            mobileNumber: false,
            email: false
        };
        this.optionsChecked = [];
    }
    ProfileListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.userService.isLoggedIn()) {
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        for (var x = 0; x < this.options.length; x++) {
            this.optionsMap[this.options[x]] = true;
        }
        var userId = sessionStorage.getItem('userId');
        if (this.userService.isAdmin()) {
            this.userService.getUsersDetails()
                .subscribe(function (users) {
                _this.users = users;
                console.log(_this.users);
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
        else if (this.userService.isUser()) {
            console.log(userId);
            this.userService.getUserDetailByEmail(userId)
                .subscribe(function (users) {
                _this.users = users;
                console.log(_this.users);
            }, function (error) {
                console.log(error);
                swal({ text: error.error.message,
                    type: "error"
                });
            });
        }
    };
    ProfileListComponent.prototype.onEdit = function (email) {
        if (this.userService.isLoggedIn()) {
            //console.log("Invalid Authentication");
            //localStorage.clear();
            //this.router.navigateByUrl('/auth/signin');
            console.log(email);
            this.router.navigateByUrl('/bills/updateProfile/' + email);
        }
    };
    ProfileListComponent.prototype.updateCheckedOptions = function (option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
    };
    ProfileListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'profile-list',
                    templateUrl: './profile-list.component.html'
                },] },
    ];
    /** @nocollapse */
    ProfileListComponent.ctorParameters = function () { return [
        { type: UserService, },
        { type: Router, },
    ]; };
    return ProfileListComponent;
}());
export { ProfileListComponent };
