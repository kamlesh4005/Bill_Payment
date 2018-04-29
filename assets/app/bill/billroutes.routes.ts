import { Routes } from '@angular/router';

import { BillsComponent } from './bills.component';
import { AddBillComponent } from './addbill.component';
import { BillsListComponent } from "./bills-list.component";
import { RefreshBillsComponent } from "./refreshbill.component";
import { BillsHistoryListComponent } from "./billshistory-list.component";
import { AboutComponent } from "../about.component";
import { ProfileUpdateComponent} from "../user/profileupdate.component";
import { ProfileListComponent} from "../user/profile-list.component";

export const BILL_ROUTES: Routes = [
    {path: '',  component: AboutComponent }, //redirectTo: 'allbills', pathMatch: 'full'},
    {path: 'allbills', component: BillsListComponent},
    {path: 'allbills/:userId', component: BillsListComponent},
    {path: 'addbill', component: AddBillComponent},
    {path: 'addbill/:id', component: AddBillComponent},
    {path: 'refreshbills', component: RefreshBillsComponent},
    {path: 'refreshbills/:userMailId', component: RefreshBillsComponent},
    {path: 'viewbillhistory', component: BillsHistoryListComponent },
    { path: 'updateProfile/:email', component: ProfileUpdateComponent },
    { path: 'profile', component: ProfileListComponent }
];