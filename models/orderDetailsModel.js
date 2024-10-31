export default class OrderDetailsModels{
    constructor(itemId,itemName,price,orderQuantity,total) {
        this.qty = orderQuantity;
        this._itemId = itemId;
        this._itemName = itemName;
        this._price = price;
        this._orderQuantity = orderQuantity;
        this._total = total;
    }


    get itemId() {
        return this._itemId;
    }

    set itemId(value) {
        this._itemId = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get orderQuantity() {
        return this._orderQuantity;
    }

    set orderQuantity(value) {
        this._orderQuantity = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}