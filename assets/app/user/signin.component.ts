import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

import { User } from "./user.model";
import swal from 'sweetalert2';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html'
})

export class SigninComponent implements OnInit{
    myForm: FormGroup;

    constructor(private userService: UserService, private router: Router){}

    ngOnInit(){
        if(this.userService.isLoggedIn()){
            console.log('User already logged in');
            this.router.navigateByUrl('');
            //this.router.navigateByUrl('/bills/allbills');
        }

        this.myForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
                //patternValidator(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    onSubmit(){
        const user = new User(this.myForm.value.email, this.myForm.value.password);
        this.userService.signin(user)
            .subscribe(
                data => {
                    console.log(data);
                    console.log(Object.keys(data));
                    console.log(Object.keys(data).length);
                    if(Object.keys(data).length != 0 &&
                    data != null){
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('userId', data.userId);
                        sessionStorage.setItem('userName', data.userName);
                        sessionStorage.setItem('userRole', data.userRole);
                        //if(data.userRole.indexOf('admin') != -1)
                            this.router.navigateByUrl('');
                            //this.router.navigateByUrl('/billers/allbillers');
                        //else if(data.userRole.indexOf('user') != -1)
                         //   this.router.navigateByUrl('/billers/allbillers');
                            //this.router.navigateByUrl('/bills/allbills/'+data.userId);
                    } else {
                        sessionStorage.clear();
                        swal({text:"Invalid username or Password",
                            type:"error"
                        });
                        
                        this.router.navigateByUrl('/auth/signin');
                    } 
                },
                error =>  {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
        this.myForm.reset();
    }

    /*ngOnDestroy(){
        console.log('ondestroy is called');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
    }*/
}