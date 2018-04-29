import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { User } from "./user.model";
import { Http, Headers, Response } from '@angular/http';
import { ErrorService } from '../errors/error.service';

@Injectable()
export class UserService{
    private _httpURL: string = "https://my-bill-app.herokuapp.com/";
    constructor(private http: Http, private errorService: ErrorService){}

    signup(user: User){
       return this.http.post(this._httpURL +'/api/billpay/user/create', user)
       .map((response: Response)=>{
        const messageObj = response.json().obj;
        return messageObj;
    })
    .catch((error: any) => {
        console.log('caught error');
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
    }); 
    }

    signin(user: User){
        return this.http.post(this._httpURL +'/api/billpay/user/signin', user)
        .map((response: Response)=>{
            const data = response.json().obj;
            return data;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        }); 
    }

    updateUserByEmail(user: User){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.put(this._httpURL +'/api/billpay/user/updateProfile'+token, user)
        .map((response: Response)=>{
            const data = response.json().obj;
            let tempUser: User;
            tempUser = new User(data.email,data.mobileNumber, data.firstName, data.lastName, data.id);
            return tempUser;            
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        }); 
    }

    getUsersDetails(){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        return this.http.get(this._httpURL + '/api/billpay/user'+token)
        .map((response: Response)=>{
            const users = response.json().obj;
            let tempUsers: User[] = [];
            for(let data of users){
                tempUsers.push(new User(data.email, null, data.mobileNumber, data.firstName, data.lastName,null, data.id));
            }
            return tempUsers;
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });  
    }

 
    getUserDetailByEmail(email: string){
        var token = sessionStorage.getItem('token')
        ?'?token='+sessionStorage.getItem('token')
        :'';
        console.log(email);
        return this.http.get(this._httpURL + '/api/billpay/user/get/'+email+token)
        .map((response: any) => {
            const data = response.json().obj;
            let tempUser: User[] =[];
            tempUser.push(new User(data.email,null,data.mobileNumber, data.firstName, data.lastName, null,data.id));
            return tempUser; 
        })
        .catch((error: any) => {
            this.errorService.handleError(error.json());
            return Observable.throw(error.json());
        });            
    }



    logout() {
        sessionStorage.clear();
    }

    isLoggedIn() {
        return sessionStorage.getItem('token') !== null;
    }

    isAdmin(){
        return sessionStorage.getItem('userRole') == "admin";
    }

    isUser(){
        return sessionStorage.getItem('userRole') == "user";
    }

    retrieveUserId(){
        return sessionStorage.getItem('userRole') == "user";
    }
}