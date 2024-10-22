//cus array
let customer_array =[];
let item_array =[];

const loadCustomerTable = () => {
    $("#customerTableBody").empty();
    customer_array.map((item,index) =>{
        console.log(item);
        let data =`<tr><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.mobile}</td><td>${item.email}</td><td>${item.address}</td>`
        $("#customerTableBody").append(data);
    })
}
const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item,index) =>{
        console.log(item);
        let data =`<tr><td>${item.name}</td><td>${item.qty}</td><td>${item.description}</td><td>${item.price}</td></tr>`
        $("#itemTableBody").append(data);
    })
}

//add customer
$("#customer_add_button").on("click", function (){
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    let customer = {
        id : customer_array.length + 1,
        first_name : first_name,
        last_name : last_name,
        mobile : mobile,
        email : email,
        address : address

    }
    customer_array.push(customer);
    loadCustomerTable();

});
// add item
$("#item_add_button").on("click", function (){
    let item_name = $('#itemName').val();
    let qty = $('#qty').val();
    let description = $('#itemDescription').val();
    let price = $('#price').val();


    let item = {
        id : item_array.length + 1,
        name : item_name,
        qty : qty,
        description : description,
        price : price,

    }
    item_array.push(item);
    loadItemTable();


});