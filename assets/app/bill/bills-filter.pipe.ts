import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'billFilter'})
export class BillFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((bill) =>
            bill.billerName.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}
