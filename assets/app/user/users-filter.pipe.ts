import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'userFilter'})
export class UserFilterPipe implements PipeTransform {
    transform(value: any[], args: string): any[] {
        let filter: string = args ? args.toLocaleLowerCase() : null;
        return filter ? value.filter((user) =>
            user.firstName.toLocaleLowerCase().startsWith(filter) != false) : value;
    }
}

