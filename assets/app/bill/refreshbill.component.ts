import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../user/user.service";

@Component({
    selector: 'bill',
    template: `
    `
})

export class RefreshBillsComponent implements OnInit {
    constructor(private router: Router, private userService: UserService,private route: ActivatedRoute){}

    ngOnInit() {
        if(this.userService.isAdmin())
            this.router.navigateByUrl('/bills/allbills');
        else if(this.userService.isUser()){
            var userId = this.route.snapshot.params['userMailId'];
            console.log("from nginit");
            console.log(userId);
            this.router.navigateByUrl('/bills/allbills/'+userId);
        }
    }
    
}