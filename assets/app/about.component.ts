import { Component } from '@angular/core';
import { UserService } from "./user/user.service";

@Component({
  template: `<div class="w3-container w3-center w3-display-middle w3-tangerine w3-padding-64">
  <div id="home" *ngIf="isAdmin()" >
    <div class="w3-jumbo"><b>Welcome to makeMyPayment System</b></div>
    <p class="w3-xxlarge">This system helps you to do create, edit and delete bills and billers. It shows chart for top bill payments done by users.</p>
  </div>
  <div id="home1" *ngIf="isUser()" >
    <div class="w3-jumbo"><b>Welcome to makeMyPayment System</b></div>
      <p class="w3-xxlarge">This system helps you to make payment and view payments history</p>
  </div>
</div>`
})
export class AboutComponent { 

    constructor(private userService: UserService){}

    isAdmin(){
        return this.userService.isAdmin();
    }

    isUser(){
        return this.userService.isUser();
    }


}
     