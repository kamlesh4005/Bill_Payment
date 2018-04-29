import { Component, OnInit, AfterViewInit } from "@angular/core";
import { NgForm, FormGroup, FormControl, Validators } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location } from "@angular/common";
import { BillService } from "./bill.service";
import { Bill } from "./bill.model";
import { UserService } from "../user/user.service";
import swal from 'sweetalert2';


@Component({
    selector: 'add-bill',
    templateUrl: './addbill.component.html'
})

export class AddBillComponent implements OnInit {
    addBillForm: FormGroup;
    myid:string;
    bills: Bill[];
    billerNames: string[];
    userMailIds: string[];
    bill: Bill;
     
    constructor(private billService:BillService,private userService: UserService, private route: ActivatedRoute, private router: Router, private location:Location){}

    ngOnInit() {

        if(!this.userService.isLoggedIn() || !this.userService.isAdmin()){
            console.log("Invalid Authentication");
            sessionStorage.clear();
            this.router.navigateByUrl('/auth/signin');
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


        this.billService.getAllUsers().subscribe(
            (userMailIds: string[]) => {
                var index = userMailIds.indexOf('admin@test.com');
                if(index > -1){
                    userMailIds.splice(index,1);
                }
                console.log(userMailIds);
                this.userMailIds = userMailIds;
                },
            error =>  {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
            }
        );

        this.myid = this.route.snapshot.params['id'];

        if(this.myid != undefined){
            this.billService.getBillById(this.myid)
            .subscribe(
                (bill: Bill) => {
                    this.bill = bill;
                },
                error =>  {
                    console.log(error);
                    swal({text:error.error.message,
                        type:"error"
                    });
                }
            );
        }

        this.addBillForm = new FormGroup({
            billerName: new FormControl(null, Validators.required),
            userMailId: new FormControl(null, Validators.required),
            billingAmount: new FormControl(null, [Validators.required, Validators.min(1)]),
            billingDate: new FormControl(null, Validators.required),
            dueDate: new FormControl(null,Validators.required),
            paidDate: new FormControl(null,null),
            billPaid: new FormControl(null,null),
            id: new FormControl(null,null)
        })
    }

    ngAfterViewInit() {
      /*  var d = new Date();
        var end_date = new Date();
        end_date.setDate(d.getDate() + 30); 
        $('#billingDate').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            max: d,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            format: 'dd/mm/yyyy',
            closeOnSelect: false // Close upon selecting a date,
        });

        $('.datepicker_DueDate').pickadate({
            selectMonths: true, // Creates a dropdown to control month
            selectYears: 15, // Creates a dropdown of 15 years to control year,
            min: d,
            max: end_date,
            today: 'Today',
            clear: 'Clear',
            close: 'Ok',
            format: 'dd/mm/yyyy',
            closeOnSelect: false // Close upon selecting a date,
        });*/
    }

    onSubmit(){
        console.log('submit called');
        this.myid = this.route.snapshot.params['id'];
        
        if(this.myid){
            // this.biller.billerName = this.addBillerForm.value.billerName;
            // this.biller.billerDescription = this.addBillerForm.value.billerDescription;

            const bill = new Bill(this.addBillForm.value.billerName, this.addBillForm.value.userMailId,
                this.addBillForm.value.billingAmount, this.addBillForm.value.billingDate,
                this.addBillForm.value.dueDate, undefined,
                'no', 
                this.myid);
            console.log(bill);
            this.billService.editBill(bill)
                .subscribe(
                    result => this.router.navigateByUrl('/bills/allbills'),
                    error =>  {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
                );
            
            this.bill = null;
        } else {
            console.log(this.addBillForm.value.billingDate);
            console.log(this.addBillForm.value.dueDate);
            const bill = new Bill(this.addBillForm.value.billerName, this.addBillForm.value.userMailId,
                this.addBillForm.value.billingAmount, this.addBillForm.value.billingDate,
                this.addBillForm.value.dueDate, undefined,
                'no');
            this.billService.addBill(bill)
                .subscribe(
                    data => this.router.navigateByUrl('/bills/allbills'),
                    error =>  {
                        console.log(error);
                        swal({text:error.error.message,
                            type:"error"
                        });
                    }
                );
        }
        this.addBillForm.reset();
        
    }

    
}