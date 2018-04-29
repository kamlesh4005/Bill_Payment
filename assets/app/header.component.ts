import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "./user/user.service";

@Component({
    selector: 'app-header',
    template: `
    
    <header id="home">

    

    <!-- Navbar -->
    <div class="w3-top">
      <div class="w3-bar  w3-flat-wet-asphalt w3-card">
        <div class="w3-bar-item applicationtitle">makeMyPayment</div>
        
        
        <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu">
        <i class="fa fa-bars"></i>
        </a>
        <a [routerLink]="['/bills/profile']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isLoggedIn()">Profile</a>
        <a [routerLink]="['/billers/chart']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">Chart</a>
        <a [routerLink]="['/billers/addbiller']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">NewBiller</a>    
        <a [routerLink]="['/billers/allbillers']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">Billers</a>
        <a [routerLink]="['/bills/addbill']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">NewBill</a>
        <a [routerLink]="['/bills/viewbillhistory']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isUser()">PaymentHistory</a>
        <a [routerLink]="['/bills/allbills',{userId:userId}]" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isUser()">Bills</a>
        <a [routerLink]="['/bills/allbills']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">Bills</a>
        <a [routerLink]="['']" class="w3-right w3-bar-item w3-button w3-padding-large" *ngIf="isLoggedIn()">Home</a>
        <!--<a [routerLink]="['']" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isLoggedIn()">ChangePassword</a>-->
        <a class="w3-bar-item w3-button w3-padding-large w3-hide-small w3-right" (click)="onLogout()" *ngIf="isLoggedIn()">Logout</a>
        <a [routerLink]="['/auth/signup']" *ngIf="!isLoggedIn()" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small"><i class="fa fa-user-plus"></i>Sign up</a>
        <a [routerLink]="['/auth/signin']" *ngIf="!isLoggedIn()" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small"><i class="fa fa-sign-in-alt"></i>Login</a>
        
        <div class="w3-padding-large w3-right w3-bar-item" *ngIf="isLoggedIn()">Welcome {{userName}}</div>
        
        <!--<a href="#" class="w3-bar-item w3-button w3-padding-large">HOME</a>
        <a href="#band" class="w3-bar-item w3-button w3-padding-large w3-hide-small">BAND</a>
        <a href="#tour" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TOUR</a>
        <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
        <div class="w3-dropdown-hover w3-hide-small">
          <button class="w3-padding-large w3-button" title="More">MORE <i class="fa fa-caret-down"></i></button>     
          <div class="w3-dropdown-content w3-bar-block w3-card-4">
            <a href="#" class="w3-bar-item w3-button">Merchandise</a>
            <a href="#" class="w3-bar-item w3-button">Extras</a>
            <a href="#" class="w3-bar-item w3-button">Media</a>
          </div>
        </div>-->
        
      </div>
    </div>
    
    <!-- Navbar on small screens -->
    <div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
    <a [routerLink]="['/bills/profile']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isLoggedIn()">Profile</a>
    <a [routerLink]="['/billers/chart']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">Chart</a>
    <a [routerLink]="['/billers/addbiller']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">NewBiller</a>    
    <a [routerLink]="['/billers/allbillers']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">Billers</a>
    <a [routerLink]="['/bills/addbill']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">NewBill</a>
    <a [routerLink]="['/bills/viewbillhistory']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isUser()">PaymentHistory</a>
    <a [routerLink]="['/bills/allbills',{userId:userId}]" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isUser()">Bills</a>
    <a [routerLink]="['/bills/allbills']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isAdmin()">Bills</a>
    <a [routerLink]="['']" class="w3-bar-item w3-button w3-padding-large" *ngIf="isLoggedIn()">Home</a>
    <!--<a [routerLink]="['']" class="w3-bar-item w3-button w3-padding-large w3-hide-small" *ngIf="isLoggedIn()">ChangePassword</a>-->
    <a class="w3-bar-item w3-button w3-padding-large w3-hide-small w3-right" (click)="onLogout()" *ngIf="isLoggedIn()">Logout</a>
    <a [routerLink]="['/auth/signup']" *ngIf="!isLoggedIn()" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small"><i class="fas fa-user-plus"></i>Sign up</a>
    <a [routerLink]="['/auth/signin']" *ngIf="!isLoggedIn()" class="w3-right w3-bar-item w3-button w3-padding-large w3-hide-small"><i class="fas fa-sign-in-alt"></i>Login</a>
    
    <div class="w3-padding-large w3-right w3-bar-item" *ngIf="isLoggedIn()">Welcome {{userName}}</div>
    </div>
    
    
   
    <!--<div class="w3-top">
    <div class="w3-white w3-xlarge" style="max-width:1200px;margin:auto">
      <div class="w3-button w3-padding-16 w3-left" onclick="w3_open()">☰</div>
      <div class="w3-right w3-padding-16">Welcome {{userName}}</div>
      <div class="w3-center w3-padding-16">MakeMyPayment</div>
    </div>
  </div>-->
  
  
    <!--<div class="w3-top">
    <div class="w3-bar w3-flat-belize-hole w3-wide w3-padding w3-card">
      <p class="w3-bar-item applicationtitle">makeMyPayment</p>
      <br>
      <div class="w3-right w3-hide-small">
      <div *ngIf="isLoggedIn()" class="w3-bar-item">Welcome {{userName}}</div>
  
        <a [routerLink]="['']" class="w3-bar-item" *ngIf="isLoggedIn()">Home</a>
        <a [routerLink]="['/bills/profile']" class="w3-bar-item" *ngIf="isLoggedIn()">Profile</a>
        <a [routerLink]="['']" class="w3-bar-item" *ngIf="isLoggedIn()">ChangePassword</a>
        <a [routerLink]="['/bills/allbills']" class="w3-bar-item" *ngIf="isAdmin()">Bills</a>
        <a [routerLink]="['/bills/allbills',{userId:userId}]" class="w3-bar-item w3-button" *ngIf="isUser()">Bills</a>
        <a [routerLink]="['/bills/viewbillhistory']" class="w3-bar-item w3-button" *ngIf="isUser()">PaymentHistory</a>
        <a [routerLink]="['/bills/addbill']" class="w3-bar-item w3-button" *ngIf="isAdmin()">NewBill</a>
        <a [routerLink]="['/billers/allbillers']" class="w3-bar-item w3-button" *ngIf="isAdmin()">Billers</a>
        <a [routerLink]="['/billers/addbiller']" class="w3-bar-item w3-button" *ngIf="isAdmin()">NewBiller</a>    
        <a [routerLink]="['/billers/chart']" class="w3-bar-item w3-button" *ngIf="isAdmin()">Chart</a>
        
        <a [routerLink]="['/auth/signup']" *ngIf="!isLoggedIn()" class="w3-bar-item w3-button"><span class="glyphicon glyphicon-user"></span>    Sign up</a>
        <a [routerLink]="['/auth/signin']" *ngIf="!isLoggedIn()" class="w3-bar-item w3-button"><span class="glyphicon glyphicon-log-in"></span> Login</a>
        <button class="w3-bar-item w3-button w3-teal" (click)="onLogout()" *ngIf="isLoggedIn()">Logout</button>
      </div>
              
    </div>
  </div>-->
  </header>
  <!-- Header -->
  <!--<header class="w3-display-container w3-content w3-wide" style="max-width:1500px;" id="home">
    <img class="w3-image" src="/w3images/architect.jpg" alt="Architecture" width="1500" height="800">
    <div class="w3-display-middle w3-margin-top w3-center">
      <h1 class="w3-xxlarge w3-text-white"><span class="w3-padding w3-black w3-opacity-min"><b>BR</b></span> <span class="w3-hide-small w3-text-light-grey">Architects</span></h1>
    </div>
  </header>-->
  

    <!--<header class="row">
    <nav class="navbar navbar-dark bg-primary">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="applicationtitle">makeMyPayment</a>
      </div>

        
       <ul class="nav nav-tabs">
        <li class="active" *ngIf="isLoggedIn()"><a [routerLink]="['']">Home</a></li>
        <li routerLinkActive="active" data-toggle="tab" *ngIf="isAdmin()"><a [routerLink]="['/bills/allbills']">BillDetails</a></li>
        <li routerLinkActive="active" data-toggle="tab" *ngIf="isUser()"><a [routerLink]="['/bills/allbills',{userId:userId}]">BillDetails</a></li>
        <li routerLinkActive="active" data-toggle="tab" *ngIf="isUser()"><a [routerLink]="['/bills/viewbillhistory']">PaymentHistory</a></li>
        <li routerLinkActive="active" data-toggle="tab" *ngIf="isAdmin()"><a [routerLink]="['/bills/addbill']">BillGenerator</a></li>
        <li routerLinkActive="active" *ngIf="isAdmin()"><a [routerLink]="['/billers/allbillers']">BillerDetails</a></li>
        <li routerLinkActive="active" *ngIf="isAdmin()"><a [routerLink]="['/billers/addbiller']">BillerCreate</a></li>    
        <li routerLinkActive="active" *ngIf="isLoggedIn() && isAdmin()"><a [routerLink]="['/billers/chart']">Chart</a></li>
        
        <ul class="nav navbar-nav navbar-right">
        <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['/auth/signup']"><span class="glyphicon glyphicon-user"></span>    Sign up</a></li>
        
        <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['/auth/signin']"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        <li routerLinkActive="active" *ngIf="isLoggedIn() && isAdmin()">Welcome Admin </li>
        <li routerLinkActive="active" *ngIf="isLoggedIn() && isUser()">Welcome {{userId}} </li>
        <button class="btn navbar-btn" (click)="onLogout()" *ngIf="isLoggedIn()">Logout</button>
        </ul>
      </ul>      
    </div>
  </nav>
    
    </header>-->

    `
})

export class HeaderComponent{
    userName: string;
    userId: string;
    constructor(private userService: UserService, private router: Router){}

    isLoggedIn(){
        return this.userService.isLoggedIn();
    }

    isAdmin(){
        return this.userService.isAdmin();
    }

    isUser(){
        this.userName = sessionStorage.getItem('userName');
        this.userId = sessionStorage.getItem('userId');
        return this.userService.isUser();
    }

    onLogout(){
        this.userService.logout();
        this.router.navigateByUrl('/auth/signin');
    }
}