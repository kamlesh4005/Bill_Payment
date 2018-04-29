import { Component, Input, OnInit  } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { Router} from '@angular/router';
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';

@Component({
    selector: 'all-bill',
    templateUrl: './bills.component.html'
})

export class BillsComponent implements OnInit{
    @Input() bill: Bill;
    @Input() optionArr;
    
        constructor(private billService:BillService, private userService: UserService, private router: Router){}
    
        ngOnInit(){
            
            if(!this.userService.isLoggedIn() || (!this.userService.isAdmin() 
                    && !this.userService.isUser())){
                console.log("Invalid Authentication");
                sessionStorage.clear();
                this.router.navigateByUrl('/auth/signin');
            }
            console.log('init done');
        }

        
        onEdit(){
            if(this.userService.isLoggedIn() && this.userService.isAdmin()){
                //console.log("Invalid Authentication");
                //localStorage.clear();
                //this.router.navigateByUrl('/auth/signin');
                this.billService.getBillById(this.bill.id).subscribe(
                    (result: Bill) => (result != null && result.billPaid.indexOf("no")!= -1) ?  
                    this.router.navigateByUrl('/bills/addbill/'+result.id)
                    : swal({text:'Bill record updation is not allowed',
                    type:"info"}),
                    error => {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
               );
            } 

            
        }
    
        onDelete(){
            if(this.userService.isLoggedIn() && this.userService.isAdmin()){
                this.billService.getBillById(this.bill.id).subscribe(
                    (result: Bill) => (result != null && result.billPaid.indexOf("no")!= -1) ?  
                    this.billService.deleteBill(this.bill.id)
                    .subscribe(
                        result => this.router.navigateByUrl('/bills/refreshbills'),
                        err => console.log(err)
                    ) 
                    :  swal({text:'Bill record deletion is not allowed',
                    type:"info"}),
                    error => {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
            );
            }
            
        }

        onMakePayment(){
            if(this.userService.isLoggedIn() && this.userService.isUser()){
                this.bill.billPaid = 'yes'; 
                this.bill.paidDate = new Date();
                console.log('makepayment');
                console.log(this.bill.userMailId);
                this.billService.editBillPayment(this.bill).subscribe(
                    result => this.router.navigateByUrl('/bills/refreshbills/'+this.bill.userMailId),
                    error => {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
                    )                    
            }            
        }

        isAdmin(){
            return this.userService.isAdmin();            
        }

        isUser(){
            return this.userService.isUser();            
        }
}