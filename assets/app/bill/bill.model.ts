export class Bill {
    billerName: string;
    userMailId: string;
    billingAmount: number;
    billingDate: Date;
    dueDate: Date;
    paidDate: Date;
    billPaid: string;
    id?: string;

constructor(billerName: string,
    userMailId: string,
    billingAmount: number,
    billingDate: Date,
    dueDate: Date,
    paidDate: Date,
    billPaid: string,
    id?: string){
    this.billerName = billerName;
    this.userMailId = userMailId;
    this.billingAmount = billingAmount;
    this.billingDate = billingDate;
    this.dueDate = dueDate;
    this.paidDate = paidDate;
    this.billPaid = billPaid;
    this.id = id;
}
}