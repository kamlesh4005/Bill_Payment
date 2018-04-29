import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from "./app.component";
import { HeaderComponent } from './header.component';
import { AboutComponent } from './about.component';
import { BillComponent } from './bill/bill.component';
import { BillerComponent } from './biller/biller.component';
import { BillsComponent } from './bill/bills.component';
import { BillHistoryComponent } from './bill/billhistory.component';
import { BillsListComponent } from './bill/bills-list.component';
import { BillsHistoryListComponent } from "./bill/billshistory-list.component";
import { AddBillComponent } from './bill/addbill.component';
import { BillersComponent } from './biller/billers.component';
import { BillersListComponent } from './biller/billers-list.component';
import { AddBillerComponent } from './biller/addbiller.component';
import { RefreshBillsComponent } from './bill/refreshbill.component';
import { RefreshBillersComponent } from './biller/refreshbiller.component';
import { ChartComponent } from './biller/chart.component';
import { routing } from './app.routing';
import { AuthenticationComponent } from './user/authentication.component';
import { SignupComponent } from './user/signup.component';
import { SigninComponent } from './user/signin.component';
import { UserService } from './user/user.service';

import { BillerFilterPipe } from './biller/billers-filter.pipe';
import { BillFilterPipe } from './bill/bills-filter.pipe';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import { ProfileListComponent } from './user/profile-list.component';
import { ProfileUpdateComponent} from './user/profileupdate.component';
import { UserFilterPipe} from './user/users-filter.pipe';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AboutComponent,
        BillComponent,
        BillsComponent,
        BillHistoryComponent,
        BillsHistoryListComponent,
        AddBillComponent,
        BillerComponent,
        BillersComponent,
        AddBillerComponent,
        BillsListComponent,
        BillersListComponent,
        RefreshBillsComponent,
        RefreshBillersComponent,
        ChartComponent,
        AuthenticationComponent,
        SignupComponent,
        SigninComponent,
        BillerFilterPipe,
        BillFilterPipe,
        ErrorComponent,
        ProfileListComponent,
        ProfileUpdateComponent,
        UserFilterPipe       
    ],
    imports: [
        BrowserModule, 
        HttpModule, 
        HttpClientModule, 
        FormsModule,
        ReactiveFormsModule,
        routing
    ],
    providers: [UserService,ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}