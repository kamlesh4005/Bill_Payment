export class Biller {
    billerName: string;
    billerDescription: string;
    id?: string;

constructor(billerName: string, billerDescription: string, billerId?: string){
    this.billerName = billerName;
    this.billerDescription = billerDescription;
    this.id = billerId;
}
}