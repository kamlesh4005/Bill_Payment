import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'billerFilter'})
export class BillerFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((biller) =>
            biller.billerName.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}
