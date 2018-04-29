import { Component, OnInit } from "@angular/core";
import { Biller } from "./biller.model";
import { BillerService } from "./biller.service";
import { Router} from '@angular/router';
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';
import { BillerFilterPipe } from './billers-filter.pipe';

@Component({
    selector: 'billers-list',
    template: `
    <div class="w3-padding-64 w3-col m7 col-md-offset-2">
    <div class="w3-padding-16"></div>
    <div class="center">
    <b class="pagetitle">Billers</b>
    
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

    <input type='checkbox' name='billerDescription' value='options[1]' id='billerDescription'
    [checked]='options.indexOf(options[1]) >= 0'
           (change)='updateCheckedOptions(options[1], $event)' 
           [ngModel]='options.indexOf(options[1]) >= 0' 
            />    
    <label for='billerDescription'>Biller Description</label>
    <all-biller [biller]='biller' [optionArr]='optionsMap' *ngFor='let biller of billers| billerFilter: nameFilter'> 

            </all-biller>
        
    </div>
    </div>
    `
})

export class BillersListComponent implements OnInit {
    billers: Biller[];
    options=['billerName', 'billerDescription'];
    optionsMap = {
        billerName: false,
        billerDescription: false
    };
    optionsChecked = [];
    nameFilter: BillerFilterPipe;


    constructor(private billerService:BillerService, private userService: UserService, private router: Router){}
    
    ngOnInit(){
        if(!this.userService.isLoggedIn() || !this.userService.isAdmin()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
        }

        

        for (var x = 0; x<this.options.length; x++) {
            this.optionsMap[this.options[x]] = true;
        }


        this.billerService.getAllBillers()
        .subscribe(
            (billers:Biller[]) => {
                this.billers = billers;
                console.log(this.billers);
            },
            error => {
                console.log(error);
                swal({text:error.error.message,
                    type:"error"
                });
            }
        );
    }

    updateCheckedOptions(option, event) {
        this.optionsMap[option] = event.target.checked;
        console.log(this.optionsMap);
     }
    
   
}