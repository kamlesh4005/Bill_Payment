import { Component, OnInit } from "@angular/core";
import { BillerService } from "./biller.service";
import { UserService } from "../user/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-biller',
    template: `
    <div class="row spacing">
        <router-outlet></router-outlet>
    </div>
    `
})

export class BillerComponent implements OnInit{
    constructor(private billerService:BillerService, private userService: UserService, private router: Router){}
    
    ngOnInit(){
        if(!this.userService.isLoggedIn() || !this.userService.isAdmin()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
    }
}