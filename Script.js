//cus array
let customer_array =[];
let item_array =[];
let order_array=[];


///////////////////////////////////////////////////////////////////////////////////////////////////
//                                          CUSTOMER                                            //
/////////////////////////////////////////////////////////////////////////////////////////////////

//+++++++++++++++++++++++++++++++++++++++++++=add customer+++++++++++++++++++++++++++++++++++++++++++++++
const clearForm = () => {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#mobile').val('');
    $('#email').val('');
    $('#address').val('');
}
const loadCustomerTable = () => {
     $("#customerTableBody").empty();
    customer_array.map((item,index) =>{
        console.log(item);
         let data =`<tr>
             <td>${item.first_name}</td>
             <td>${item.last_name}</td>
             <td>${item.mobile}</td>
             <td>${item.email}</td>
             <td>${item.address}</td></tr>`
         $("#customerTableBody").append(data);
    });
 }
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
    clearForm();

});
//----------------------------------------------------------------------- Delete Customer----------------------------------------
let selectedCustomerIndex;

// Click event to select a customer row
$("#customerTableBody").on("click", "tr", function() {
    selectedCustomerIndex = $(this).index(); // Get the index of the clicked row
    let customer = customer_array[selectedCustomerIndex]; // Get the customer data
    // Populate the form with the selected customer's data
    $('#firstName').val(customer.first_name);
    $('#lastName').val(customer.last_name);
    $('#mobile').val(customer.mobile);
    $('#email').val(customer.email);
    $('#address').val(customer.address);
});

// Delete button functionality
$("#customer_delete_button").on("click", function() {
    if (selectedCustomerIndex !== undefined) {
        customer_array.splice(selectedCustomerIndex, 1); // Remove the selected customer
        loadCustomerTable(); // Refresh the table
        selectedCustomerIndex = undefined; // Reset selection
        $('#customerForm')[0].reset(); // Clear the form
    } else {
        alert("Please select a customer to delete.");
    }
});
//------------------------------------------------------- Edit Customer--------------------------------------------------
// Update button functionality
/*
$("#customer_update_button").on("click", function() {
    if (selectedCustomerIndex !== undefined) {
        let first_name = $('#firstName').val();
        let last_name = $('#lastName').val();
        let mobile = $('#mobile').val();
        let email = $('#email').val();
        let address = $('#address').val();

        // Update the selected customer
        customer_array[selectedCustomerIndex] = {
            id: selectedCustomerIndex + 1,
            first_name,
            last_name,
            mobile,
            email,
            address
        };

        loadCustomerTable(); // Refresh the table
        selectedCustomerIndex = undefined; // Reset selection
        $('#customerForm')[0].reset(); // Clear the form
    } else {
        alert("Please select a customer to update.");
    }
});
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                ITEM                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//+++++++++++++++++++++++++++++++++++++++++++ add item ++++++++++++++++++++++++++++++++++++++++//
 const loadItemTable = () => {
     $("#itemTableBody").empty();
     item_array.map((item,index) =>{
         console.log(item); let data =`<tr>
          <td>${item.name}</td>
             <td>${item.qty}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
             </tr>`
        $("#itemTableBody").append(data);
    });
 }
$("#item_add_button").on("click", function (){CustomerId_array
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
    clearForm();


});
//////////////////////////////////////////////////////////////////////////// add order////////////////////////////////////////////////////

/*
const loadOrderTable = () => {
    $("#orderTableBody").empty();
    order_array.map((item,index) =>{
        console.log(item);
        let data =`<tr><td>${item.customer}</td><td>${item.item}</td><td>${item.quantity}</td><td>${item.price}</td><td>${item.total}</td></tr>`
        $("#orderTableBody").append(data);
    });
}

$("#order_add_btn").on("click", function (){
    let customer = $('#customerSelect').val();
    let item_name = $('#itemSelect').val();
    let qty = $('#quantity').val();
   /!* let price = $('#').val();
    let total = $('#price').val();
*!/

    let order = {
        id : order_array.length + 1,
        customer : customer,
        item : item_name,
        quantity : qty,
        price : price,
        total : total

    }
    item_array.push(order);
    loadOrderTable();


});*/  let CustomerId_array = [];
   const CustomerSelect = () => {
    CustomerId_array = customer_array;

    $("#customer").empty();
    CustomerId_array.map(customer => {
        let option = `<option value="${customer.id}">${customer.id}</option>`;
        $("#customer").append(option);
    });

}

$("#customer").on("change", function () {
    let selectedId = $(this).val(); // Get selected customer ID
    let selectedCustomer = CustomerId_array.find(customer => customer.id === selectedId);

    // Update customer details based on selected ID
    if (selectedCustomer) {
        $("#name1").val(selectedCustomer.first_name + " " + selectedCustomer.last_name);
        $("#address1").val(selectedCustomer.address);
    }
});
