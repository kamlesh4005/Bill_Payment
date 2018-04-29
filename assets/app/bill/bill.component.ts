import { Component, OnInit } from "@angular/core";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-bill',
    template: `
    <div class="row spacing">
        <router-outlet></router-outlet>
    </div>
    `
})

export class BillComponent implements OnInit{

    userId: string;

    constructor(private userService: UserService, private router: Router){}

    ngOnInit(){
        if(!this.userService.isLoggedIn() &&(!this.userService.isAdmin() 
            || !this.userService.isUser())){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
        if(this.userService.isUser()){
            this.userId = sessionStorage.getItem("userId");
        }
    }

    isAdmin(){
        return this.userService.isAdmin();            
    }

    isUser(){
        return this.userService.isUser();            
    }
   
}