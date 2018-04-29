import { Component, OnInit } from "@angular/core";
import { UserService } from "./user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-authentication',
    template: 
    `
    <div class="row spacing">
        <router-outlet></router-outlet>
    </div>
    `
})

export class AuthenticationComponent implements OnInit{
    constructor(private userService: UserService, private router: Router){}

    ngOnInit(){
        if(this.userService.isLoggedIn()){
            console.log('User already logged in');
            //this.router.navigateByUrl('/bills/allbills');
           this.router.navigateByUrl('');
        }
    }
}