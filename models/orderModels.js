export default class OrderModels {
    constructor(Item_ID,Item_Name,Price,Quantity,Total) {

        this._Item_ID = Item_ID;
        this._Item_Name = Item_Name;
        this._Price = Price;
        this._Quantity = Quantity;
        this._Total = Total;
    }


    get Item_ID() {
        return this._Item_ID;
    }

    set Item_ID(value) {
        this._Item_ID = value;
    }

    get Item_Name() {
        return this._Item_Name;
    }

    set Item_Name(value) {
        this._Item_Name = value;
    }

    get Price() {
        return this._Price;
    }

    set Price(value) {
        this._Price = value;
    }

    get Quantity() {
        return this._Quantity;
    }

    set Quantity(value) {
        this._Quantity = value;
    }

    get Total() {
        return this._Total;
    }

    set Total(value) {
        this._Total = value;
    }
}