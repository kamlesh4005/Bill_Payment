import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import { User } from "./user.model";
import { UserService } from "./user.service";
import swal from 'sweetalert2';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html'
})

export class SignupComponent implements OnInit{
    myForm: FormGroup;
    firstName = new FormControl(null, [Validators.required,Validators.pattern("[a-zA-Z]+")]); 
    constructor(private userService: UserService, private router: Router, private fb: FormBuilder){}

    ngOnInit(){
        if(this.userService.isLoggedIn()){
            console.log("Already Logged in!!");
            //this.router.navigateByUrl('/bills/allbills');
            this.router.navigateByUrl('');
        }
        
       this.myForm = this.fb.group({
            'firstName': this.firstName,//new FormControl(null, [Validators.required,Validators.pattern("[a-zA-Z]+")]),
            'lastName': new FormControl(null, [Validators.required,Validators.pattern("[a-zA-Z]+"), 
                ]),
            mobileNumber: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
            email: new FormControl(null, [
                Validators.required, 
                Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
            ]),
            password: new FormControl(null, [Validators.required,Validators.minLength(8)])
            
        },{ validator:this.uniqueValueValidator('firstName', 'lastName')});
    }

    onSubmit(){
        const user = new User(
            this.myForm.value.email,
            this.myForm.value.password,
            this.myForm.value.mobileNumber,
            this.myForm.value.firstName,
            this.myForm.value.lastName
        );
        this.userService.signup(user)
            .subscribe(
                data => {
                    console.log(data.message);
                    swal({text:"User is created successfully",
                        type:"success"
                    });
                    this.router.navigateByUrl('/auth/signin');
                 } ,
                error => {
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
                   
            );
        
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
    }

    uniqueValueValidator(firstVal: string, secondVal: string): ValidatorFn {
        console.log('called');
        return (group: FormGroup): {[value: string]: any} => {
          console.log(group);
          const first = group.controls[firstVal];
          const second = group.controls[secondVal];
          console.log(first.value);
          console.log(second.value);
          
          //console.log(second);
          if (first.value != null && second.value != null) {
            const isMatch = first.value === second.value;
            console.log(isMatch);
            // set equal value error on dirty controls
            if (isMatch){
                second.setErrors({uniqueValue: firstVal});
                const message = firstVal + ' != ' + secondVal;
                //const message = 'Both First name and Last name should not be same.';
                console.log(message);
                return {'uniqueValue': message};
              }
              if (!isMatch && second.hasError('uniqueValue')) {
                second.setErrors(null);
            }
          }      
          return null;
    }

    }

}