export class Product{
    private itemId: number;
    private itemName: string;
    private itemUnitCost: string;
    
    constructor( itemName: string, itemUnitCost: string){
        this.itemName = itemName;
        this.itemUnitCost = itemUnitCost;
    }
}
