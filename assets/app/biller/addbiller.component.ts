import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators, ValidatorFn } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';

import { BillerService } from "./biller.service";
import { BillService } from "../bill/bill.service";
import { Biller } from "./biller.model";
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';


 


@Component({
    selector: 'add-biller',
    templateUrl: './addbiller.component.html'
})

export class AddBillerComponent implements OnInit{
    addBillerForm: FormGroup;
    myid:string;
    billers: Biller[];
    biller: Biller;
    validator: ValidatorFn;  
    billerNames:string[];
   
    constructor(private billerService:BillerService, private userService: UserService, private route: ActivatedRoute, private router: Router,
    private billService:BillService)
    {  
        this.validator = this.billerNameValidator();    
    }

    ngOnInit() {
        if(!this.userService.isLoggedIn() || !this.userService.isAdmin()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            //this.router.navigateByUrl('/auth/signin');
        }

        this.myid = this.route.snapshot.params['id'];
        if(this.myid != undefined){
            this.billerService.getBillerById(this.myid)
            .subscribe(
                (biller:Biller) => {
                    this.biller = biller;
                    },
                error => {                    
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
                
            );
        }

        this.billService.getAllBillerNames().subscribe(
            (billerNames: string[]) => {
                this.billerNames = billerNames;
                },
            error =>  {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
            }
        );

      

        this.addBillerForm = new FormGroup({
            billerName: new FormControl(null, [Validators.required, this.validator]),
            billerDescription: new FormControl(null,Validators.required),
            id: new FormControl(null,null)
        })
    }

    onSubmit(){
        this.myid = this.route.snapshot.params['id'];
        if(this.myid){
            const biller = new Biller(this.addBillerForm.value.billerName, this.addBillerForm.value.billerDescription, this.myid);
            this.billerService.getBillerById(this.myid)
            .subscribe(
                (biller:Biller) => {
                    this.biller = biller;
                    },
                error => {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
                
            );
            this.billerService.editBiller(biller)
                .subscribe(
                    result => this.router.navigateByUrl('/billers/allbillers'),
                    error => {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    } 
                );
            this.biller = null;
        } else {
            const biller = new Biller(this.addBillerForm.value.billerName,this.addBillerForm.value.billerDescription);
            this.billerService.addBiller(biller)
                .subscribe(
                    data => this.router.navigateByUrl('/billers/allbillers'),
                    error => {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
                );
        }
        this.addBillerForm.reset();
        
    }

   

    billerNameValidator() : ValidatorFn { 
        console.log('called');
        //console.log(c);
        return (c: FormControl) => {  
            console.log(c);
            console.log(c.value);
            if(c.value != null && c.value != undefined){
            let billerName = c.value;
            console.log(billerName);
            for(let biller of this.billerNames){
                 if(billerName.toLowerCase() == biller.toLowerCase()){
                    return {
                        billerNamevalidator: {
                          valid: false
                        }
                      }
                }
            }
        }
        return null; 
        }
      }
      
}