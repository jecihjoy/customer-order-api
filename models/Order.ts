export class Order{
    private orderId: number;
    private orderDate: any;
    private customerId: number;
    private itemId: number;
    private itemQuantity: any;

    constructor(o_id, o_date, c_id, i_id, i_quantity){
        this.orderId = o_id;
        this.orderDate = o_date;
        this.customerId = c_id;
        this.itemId = i_id;
        this.itemQuantity = i_quantity;
    }
}