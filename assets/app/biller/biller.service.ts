//import { Http, Headers, Response } from '@angular/http';
import { Injectable, EventEmitter } from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, Response } from '@angular/http';
import { Biller } from "./biller.model";
import { Bill } from "../bill/bill.model";
import { ErrorService } from '../errors/error.service';

@Injectable()
export class BillerService{
    private billers: Biller[] = [];
    billerIsEdit = new EventEmitter<Biller>();
    private _httpURL: string = "https://my-bill-app.herokuapp.com/";
    constructor(private http: Http, private errorService: ErrorService){}

    getAllBillers(){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/billers'+token)
        .map((response: Response)=>{
            const billers = response.json().obj;
            let tempBillers: Biller[] = [];
            for(let biller of billers){
                tempBillers.push(new Biller(biller.billerName, biller.billerDescription, biller.id));
            }
            this.billers = tempBillers;
            return tempBillers;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });  
    }

 
    getBillerById(id: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/billers/get/'+id+token)
        .map((response: any) => {
            const biller = response.json().obj;
            let tempBiller: Biller;
            tempBiller = new Biller(biller.billerName, biller.billerDescription, biller.id);
            return tempBiller;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });            
    }

    addBiller(biller: Biller) {
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.post(this._httpURL + '/api/billpay/billers/create'+ token, biller)
        .map((response: any) => {
            const biller = response.json().obj;
            let tempBiller: Biller;
            tempBiller = new Biller(biller.billerName, biller.billerDescription, biller.id);
            return tempBiller;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });               
    }

    editBiller(biller: Biller){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.put(this._httpURL + '/api/billpay/billers/edit/'+biller.id+token, biller)
        .map((response: any) => {
            const biller = response.json().obj;
            let tempBiller: Biller;
            tempBiller = new Biller(biller.billerName, biller.billerDescription, biller.id);
            return tempBiller;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });    
    }

    deleteBiller(id: string) {
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.delete(this._httpURL + '/api/billpay/billers/delete/'+id+token)
        .map((response: Response)=>{ console.log(response);
            console.log(response.json());
            return response.json()})
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        
    }

    getAllBillsofBiller(billerName: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + "/api/billpay/billers/getBills/"+billerName+token)
        .map((response: Response)=>{
            const bills = response.json().obj;
            let tempBills: Bill[] = [];
            for(let bill of bills){
                tempBills.push(new Bill(bill.billerName, bill.userMailId, bill.billingDate,
                    bill.dueDate, bill.paidDate, bill.billPaid,bill.id));
            }
            //this.bills = tempBills;
            return tempBills;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });
        
    }

    getAggregateData(noOfUsers: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        console.log('no from service');
        console.log(noOfUsers);
        return this.http.get(this._httpURL + "/api/billpay/billers/aggregateData/"+noOfUsers+token)
        .map((response: any) => {
            const aggregateData = response.json().obj;
            let tempData = [];
            for(let data of aggregateData){
                tempData.push({userMailId: data.userMailId,
                    totalAmount: data.totalAmount,
                    count:data.count});
            }
            return tempData;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });    
    } 
    
    getAggregateDataWithBillerNames(){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + "/api/billpay/billers/getAggregateDataWithBillerNames"+token)
        .map((response: any) => {
            const aggregateDataBillerNames = response.json().obj;
            let tempData = [];
            for(let data of aggregateDataBillerNames){
                tempData.push({billerName: data.billerName,
                    userMailId: data.userMailId,
                    totalAmount: data.totalAmount,
                    count:data.count});
            }
            return tempData;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });    
    } 


}