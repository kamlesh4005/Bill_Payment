var Bill = /** @class */ (function () {
    function Bill(billerName, userMailId, billingAmount, billingDate, dueDate, paidDate, billPaid, id) {
        this.billerName = billerName;
        this.userMailId = userMailId;
        this.billingAmount = billingAmount;
        this.billingDate = billingDate;
        this.dueDate = dueDate;
        this.paidDate = paidDate;
        this.billPaid = billPaid;
        this.id = id;
    }
    return Bill;
}());
export { Bill };
