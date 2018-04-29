import { Component, OnInit } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { UserService } from "../user/user.service";
import { Router, ActivatedRoute, Params} from '@angular/router';
import swal from 'sweetalert2';

@Component({
    selector: 'bills-list',
    template: `
    <div class="center w3-container w3-metro-dark-red w3-lobster">
        <p class="w3-xlarge">Bills</p>
    </div>
    <br>
    <div class="w3-container" *ngIf="display==true">
    <label for="filterby">Filter by:</label>
    <p>
    <input type='text'
        [(ngModel)]='nameFilter' />
    </p>
    <br>
    <p>
    <input type='checkbox' name='billerName' value='options[0]' id='billerName' class="w3-check" 
    [checked]='options.indexOf(options[0]) >= 0'
        (change)='updateCheckedOptions(options[0], $event)' 
        [ngModel]='options.indexOf(options[0]) >= 0' 
            />
    <label for='billerName'>Biller Name</label>
    </p>
    <p>
    <input type='checkbox' name='userEmailId' value='options[1]' id='userEmailId' class="w3-check" 
    [checked]='options.indexOf(options[1]) >= 0'
        (change)='updateCheckedOptions(options[1], $event)' 
        [ngModel]='options.indexOf(options[1]) >= 0' 
            />    
    <label for='userEmailId'>User Email Id</label>
    </p>
    <p>
    <input type='checkbox' name='userEmailId' value='options[2]' id='billingAmount' class="w3-check" 
    [checked]='options.indexOf(options[2]) >= 0'
        (change)='updateCheckedOptions(options[2], $event)' 
        [ngModel]='options.indexOf(options[2]) >= 0' 
            />    
    <label for='billingAmount'>Billing Amount</label>
    </p>
    <p>
    <input type='checkbox' name='billingDate' value='options[3]' id='billingDate' class="w3-check" 
    [checked]='options.indexOf(options[3]) >= 0'
        (change)='updateCheckedOptions(options[3], $event)' 
        [ngModel]='options.indexOf(options[3]) >= 0' 
            />    
    <label for='billingDate'>Billing Date</label>
    </p>
    <p>
    <input type='checkbox' name='dueDate' value='options[4]' id='dueDate' class="w3-check" 
    [checked]='options.indexOf(options[4]) >= 0'
        (change)='updateCheckedOptions(options[4], $event)' 
        [ngModel]='options.indexOf(options[4]) >= 0' 
            />    
    <label for='dueDate'>Due Date</label>    
    </p>
        <all-bill [bill]='bill' [optionArr]='optionsMap' *ngFor='let bill of bills| billFilter: nameFilter'> </all-bill>
    </div>
    <div class="w3-container" *ngIf="display==false">
    <label for="message">No bills are pending for payment</label>
    </div>
    
    `
})

export class BillsListComponent implements OnInit {
    bills: Bill[];
    userId: string;
    options=['billerName', 'userEmailId', 'billingAmount','billingDate', 'dueDate'];
    optionsMap = {
        billerName: false,
        userEmailId: false,
        billingAmount: false,
        billingDate: false,
        dueDate: false       
    };
    optionsChecked = [];
    display=true;

    constructor(private billService:BillService, private userService: UserService, private route: ActivatedRoute){}
    
    ngOnInit(){
        console.log(this.userService.isAdmin());
        console.log(this.userService.isLoggedIn());
        
        if(this.userService.isLoggedIn() && this.userService.isAdmin()){
            this.billService.getAllBillsForAdmin()
            .subscribe(
                (bills:Bill[]) => {
                    this.bills = bills;
                },
                error => {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
        } else if(this.userService.isLoggedIn() && this.userService.isUser()){
            this.userId = this.route.snapshot.params['userId'];
            console.log(this.userId);
            this.billService.getAllBillsForUser(this.userId)
            .subscribe(
                (bills:Bill[]) => {
                    this.bills = bills;
                    if(bills.length == 0){
                        this.display = false;
                        console.log(this.display);
                    }
                },
                error => {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
        }

        
        for (var x = 0; x<this.options.length; x++) {
            this.optionsMap[this.options[x]] = true;
        }
    }

    updateCheckedOptions(option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
     }
}