import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { BillerComponent } from './biller/biller.component';
import { BILL_ROUTES } from './bill/billroutes.routes';
import { BILLER_ROUTES } from './biller/billerroutes.routes';
import { AuthenticationComponent } from './user/authentication.component';
import { AUTH_ROUTES } from './user/auth.routes';
var APP_ROUTES = [
    { path: '', redirectTo: '/bills', pathMatch: 'full' },
    { path: 'bills', component: BillComponent, children: BILL_ROUTES },
    { path: 'billers', component: BillerComponent, children: BILLER_ROUTES },
    { path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES }
];
export var routing = RouterModule.forRoot(APP_ROUTES);
