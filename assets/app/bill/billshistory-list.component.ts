import { Component, OnInit } from "@angular/core";
import { Bill } from "./bill.model";
import { BillService } from "./bill.service";
import { UserService } from "../user/user.service";
import { Router, ActivatedRoute, Params} from '@angular/router';
import swal from 'sweetalert2';
import { BillFilterPipe } from "./bills-filter.pipe";
@Component({
    selector: 'billshistory-list',
    template: `
    <div class="w3-padding-64 w3-col m7 col-md-offset-2">
    <div class="w3-padding-16"></div>
    <div class="center">
    <b class="pagetitle">Bills History</b>
    
    </div>

    <div class="row">
    <label for="filterby">Filter by:</label>
    <input type='text'
        [(ngModel)]='nameFilter' />

    <input type='checkbox' name='billerName' value='options[0]' id='billerName' 
    [checked]='options.indexOf(options[0]) >= 0'
        (change)='updateCheckedOptions(options[0], $event)' 
        [ngModel]='options.indexOf(options[0]) >= 0' 
            />
    <label for='billerName'>Biller Name</label>

    <input type='checkbox' name='userEmailId' value='options[1]' id='userEmailId'
    [checked]='options.indexOf(options[1]) >= 0'
        (change)='updateCheckedOptions(options[1], $event)' 
        [ngModel]='options.indexOf(options[1]) >= 0' 
            />    
    <label for='userEmailId'>User Email Id</label>

    <input type='checkbox' name='billingAmount' value='options[2]' id='billingAmount'
    [checked]='options.indexOf(options[2]) >= 0'
        (change)='updateCheckedOptions(options[2], $event)' 
        [ngModel]='options.indexOf(options[2]) >= 0' 
            />    
    <label for='billingAmount'>Billing Amount</label>


    <input type='checkbox' name='billingDate' value='options[3]' id='billingDate'
    [checked]='options.indexOf(options[3]) >= 0'
        (change)='updateCheckedOptions(options[3], $event)' 
        [ngModel]='options.indexOf(options[3]) >= 0' 
            />    
    <label for='billingDate'>Billing Date</label>

    <input type='checkbox' name='dueDate' value='options[4]' id='dueDate'
    [checked]='options.indexOf(options[4]) >= 0'
        (change)='updateCheckedOptions(options[4], $event)' 
        [ngModel]='options.indexOf(options[4]) >= 0' 
            />    
    <label for='dueDate'>Due Date</label>

    <input type='checkbox' name='paidDate' value='options[5]' id='paidDate'
    [checked]='options.indexOf(options[5]) >= 0'
        (change)='updateCheckedOptions(options[5], $event)' 
        [ngModel]='options.indexOf(options[5]) >= 0' 
            />    
    <label for='paidDate'>Paid Date</label>

    <input type='checkbox' name='billPaid' value='options[6]' id='billPaid'
    [checked]='options.indexOf(options[6]) >= 0'
        (change)='updateCheckedOptions(options[6], $event)' 
        [ngModel]='options.indexOf(options[6]) >= 0' 
            />    
    <label for='billPaid'>Bill Paid</label>

        <bill-history [bill]="bill" [optionArr]='optionsMap' *ngFor='let bill of bills| billFilter: nameFilter'> </bill-history>
    </div>
    `
})


export class BillsHistoryListComponent implements OnInit {
    bills: Bill[];
    userId: string;
    options=['billerName', 'userEmailId', 'billingAmount','billingDate', 'dueDate', 'paidDate', 'billPaid'];
    optionsMap = {
        billerName: false,
        userEmailId: false,
        billingAmount: false,
        billingDate: false,
        dueDate: false,
        paidDate: false,
        billPaid: false
    };
    optionsChecked = [];
    nameFilter: BillFilterPipe;

    constructor(private billService:BillService, private userService: UserService){}
    
    ngOnInit(){
        console.log('called ng');
        if(this.userService.isLoggedIn() && this.userService.isUser()){
            //this.userId = this.route.snapshot.params['userId'];
            console.log(sessionStorage.getItem('userId'));
            this.billService.getAllBillsForUserHistory(sessionStorage.getItem('userId'))
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