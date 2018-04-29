import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup } from "@angular/forms";
import { User } from "./user.model";
import { UserService } from "./user.service";
import { Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'profile-list',
    templateUrl: './profile-list.component.html'
})

export class ProfileListComponent implements OnInit {
    users: User[];
    options=['firstName', 'lastName', 'mobileNumber', 'email'];
    optionsMap = {
        firstName: false,
        lastName: false,
        mobileNumber: false,
        email: false
    };
    optionsChecked = [];


    constructor(private userService: UserService, private router: Router){}
    
    ngOnInit(){
        if(!this.userService.isLoggedIn()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }

        

        for (var x = 0; x<this.options.length; x++) {
            this.optionsMap[this.options[x]] = true;
        }

        var userId = sessionStorage.getItem('userId');

        if(this.userService.isAdmin()){
            this.userService.getUsersDetails()
            .subscribe(
                (users:User[]) => {
                    this.users = users;
                    console.log(this.users);
                },
                error => {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
        }  else if(this.userService.isUser()){
            console.log(userId);
            this.userService.getUserDetailByEmail(userId)
            .subscribe(
                (users:User[]) => {
                    this.users = users;
                    console.log(this.users);
                },
                error => {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
        }
    }

    onEdit(email:string){
        if(this.userService.isLoggedIn()){
            //console.log("Invalid Authentication");
            //localStorage.clear();
            //this.router.navigateByUrl('/auth/signin');
            console.log(email);
            this.router.navigateByUrl('/bills/updateProfile/'+email);        
        } 
    }

    updateCheckedOptions(option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
     }
    
   
}