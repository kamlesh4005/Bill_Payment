//import { Http, Headers, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Http, Headers, Response } from '@angular/http';
import { Bill } from "./bill.model";
import { error } from 'util';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class BillService{
    private _httpURL: string = "https://my-bill-app.herokuapp.com/";
    constructor(private http: Http, private errorService: ErrorService){}
    
    getAllBillsForUser(userId: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/bills/user/get/'+userId+token)
        .map((response: Response)=>{
            const bills = response.json().obj;
            let tempBills: Bill[] = [];
            for(let bill of bills){
                tempBills.push(new Bill(bill.billerName, bill.userMailId,bill.billingAmount, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            return tempBills;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
    }

    getAllBillsForAdmin(){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/bills'+token)
        .map((response: Response)=>{
            const bills = response.json().obj;
            let tempBills: Bill[] = [];
            for(let bill of bills){
                tempBills.push(new Bill(bill.billerName, bill.userMailId,bill.billingAmount, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            return tempBills;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });        
    }

    getBillById(id: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/bills/get/'+id+token)
        .map((response: Response)=>{
            const bill = response.json().obj;
            let tempBill: Bill;
            tempBill =new Bill(bill.billerName, bill.userMailId,bill.billingAmount, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid, bill.id);
            return tempBill;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });   
        
    }

    addBill(bill: Bill) {
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.post(this._httpURL + '/api/billpay/bills/create'+token,bill)
        .map((response: Response)=>{
            const bill = response.json().obj;
            let tempBill: Bill;
            tempBill =new Bill(bill.billerName, bill.userMailId,bill.billingAmount, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid, bill.id);
            console.log('got bill');
            console.log(bill);
            console.log('temp bill');    
            console.log(tempBill);
            return tempBill;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.post(this._httpURL + '/api/billpay/bills/create'+token,bill);            
    }

    editBill(bill: Bill){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.put(this._httpURL +'/api/billpay/bills/edit/'+bill.id+token,bill)
        .map((response: Response)=>{
            const bill = response.json().obj;
            let tempBill: Bill;
            tempBill =new Bill(bill.billerName, bill.userMailId,bill.billingAmount, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid, bill.id);
            return tempBill;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.put(this._httpURL +'/api/billpay/bills/edit/'+bill.id+token,bill);
    }

    deleteBill(id: string) {
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.delete(this._httpURL + '/api/billpay/bills/delete/'+id+token)
        .map((response: Response)=>{ console.log(response);
            console.log(response.json());
            return response.json()})
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.delete(this._httpURL + '/api/billpay/bills/delete/'+id+token);
    }

    editBillPayment(bill: Bill){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        //var billPaid='yes';
        return this.http.put(this._httpURL +'/api/billpay/bills/editBillPayment/'+bill.id+token,bill)
        .map((response: Response)=>{ console.log(response);
            console.log(response.json());
            return response.json()})
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.put(this._httpURL +'/api/billpay/bills/editBillPayment/'+bill.id+token,bill);
    }

    getAllBillsForUserHistory(userId: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/bills/user/get/billsHistory/'+userId+token)
        .map((response: Response)=>{
            const bills = response.json().obj;
            let tempBills: Bill[] = [];
            for(let bill of bills){
                tempBills.push(new Bill(bill.billerName, bill.userMailId,bill.billingAmount, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid, bill.id));
            }
            return tempBills;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        }); 
        //return this.http.get(this._httpURL + '/api/billpay/bills/user/get/billsHistory/'+userId+token);
    }

    getAllBillerNames(){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + "/api/billpay/bills/getBillerNames/"+token)
        .map((response: Response)=>{
            const billerNames = response.json().obj;
            let tempBillerNames= [];
            for(let billerName of billerNames){
                tempBillerNames.push(billerName);
            }
            return tempBillerNames;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.get(this._httpURL + "/api/billpay/bills/getBillerNames/"+token);
    }

    getAllUsers(){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + "/api/billpay/bills/getUsers/"+token)
        .map((response: Response)=>{
            const users = response.json().obj;
            let tempUsers= [];
            for(let user of users){
                tempUsers.push(user);
            }
            return tempUsers;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        //return this.http.get(this._httpURL + "/api/billpay/bills/getUsers/"+token);
    }

}