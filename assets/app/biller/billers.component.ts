import { Component, OnInit,Input} from "@angular/core";
import { Biller } from "./biller.model";
import { Bill } from "../bill/bill.model";
import { BillerService } from "./biller.service";
import { Router} from '@angular/router';
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';

@Component({
    selector: 'all-biller',
    templateUrl: './billers.component.html',
    styles: [`
        .billerDescription {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})

export class BillersComponent implements OnInit{
    @Input() biller: Biller;
    @Input() optionArr;
    bill: Bill[];
    customizeFilter: any;
    nameFilter: any;
    

    constructor(private billerService:BillerService,private userService: UserService, private router: Router){}

    ngOnInit(){
        if(!this.userService.isLoggedIn() || !this.userService.isAdmin()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }
    }
        
    
    

    onEdit(id: string){
        this.billerService.getAllBillsofBiller(this.biller.billerName).subscribe(
            (result: Bill[]) => { console.log(result);
                console.log(result.length);
                console.log(id);
                (result == null || result.length == 0) ?  
            this.router.navigateByUrl('/billers/addbiller/'+id)
            : swal({text:'Biller record updation is not allowed',
                type:"info"})},
            error =>  {
                console.log(error);
                swal({text:error.error.message,
                    type:"error"
                });
            }
       );
    }

    onDelete(id: string){
        this.billerService.getAllBillsofBiller(this.biller.billerName).subscribe(
            (result: Bill[]) => {console.log(id);
                (result == null || result.length == 0) ?    
            this.billerService.deleteBiller(id)
            .subscribe(
                result => this.router.navigateByUrl('/billers/refreshbillers'),
                err => console.log(err)
            ) 
            : swal({text:'Biller record deletion is not allowed',
            type:"info"}),
            error =>  {
                console.log(error);
                swal({text:error.error.message,
                    type:"error"
                });
            }
        }
       ); 
    }


  
}