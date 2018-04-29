import { Component } from '@angular/core';
import { BillerService } from './biller/biller.service';
import { BillService } from './bill/bill.service';


@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    providers: [BillerService, BillService]
})
export class AppComponent {
    
}