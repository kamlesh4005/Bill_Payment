import { Component, Input } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { Router} from '@angular/router';
import { UserService } from "../user/user.service";

@Component({
    selector: 'bill-history',
    templateUrl: './billhistory.component.html'
})

export class BillHistoryComponent{
    @Input() bill: Bill;
    @Input() optionArr;
    
        constructor(private billService:BillService, private userService: UserService, private router: Router){}
    
        ngOnInit(){
            if(!this.userService.isLoggedIn() && (this.userService.isAdmin() 
                    || this.userService.isUser())){
                console.log("Invalid Authentication");
                sessionStorage.clear();
                this.router.navigateByUrl('/auth/signin');
            }
        }

 
}