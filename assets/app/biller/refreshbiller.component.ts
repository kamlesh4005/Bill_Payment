import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';

@Component({
    selector: 'biller',
    template: `
    `
})

export class RefreshBillersComponent implements OnInit {
    constructor(private router: Router){}

    ngOnInit() {
        this.router.navigateByUrl('/billers/allbillers');
    }
    
}