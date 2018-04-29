import { Routes } from "@angular/router";
import { BillersComponent } from "./billers.component";
import { AddBillerComponent } from "./addbiller.component";
import { BillersListComponent } from "./billers-list.component";
import { RefreshBillersComponent } from "./refreshbiller.component";
import { ChartComponent } from "./chart.component";
import { AboutComponent } from "../about.component";
export var BILLER_ROUTES = [
    { path: '', component: AboutComponent },
    //redirectTo: 'allbillers', pathMatch: 'full'},
    { path: 'allbillers', component: BillersListComponent },
    { path: 'addbiller', component: AddBillerComponent },
    { path: 'addbiller/:id', component: AddBillerComponent },
    { path: 'refreshbillers', component: RefreshBillersComponent },
    { path: 'chart', component: ChartComponent }
];
