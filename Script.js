//cus array
let customer_array =[];
let item_array =[];
let order_array=[];

const validEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};
const validMobile = (mobile) => {
    const sriLankanMobileRegex = /^(?:\+94|0)?7[0-9]{8}$/;
    return sriLankanMobileRegex.test(mobile);
};

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
       /* console.log(item);*/
         let data =`<tr>
             <td>${item.first_name}</td>
             <td>${item.last_name}</td>
             <td>${item.mobile}</td>
             <td>${item.email}</td>
             <td>${item.address}</td></tr>`
         $("#customerTableBody").append(data);
    });
 }
 //save customer
$("#customer_add_button").on("click", function (){
    let first_name = $('#firstName').val();
    let last_name = $('#lastName').val();
    let mobile = $('#mobile').val();
    let email = $('#email').val();
    let address = $('#address').val();

    if(first_name.length===0){
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500
        });
    }else if(last_name.length===0){
        alert("invalid last name");
    }else if(!validEmail(email)){
        alert("invalid email");
    }else if(!validMobile(mobile)){
        alert("invalid mobile");
    }else if(address.length===0){
        alert("invalid address");
    }else{
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
    }



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

    console.log(customer);

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
//------------------------------------------------------- Update Customer--------------------------------------------------
// Update button functionality
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                ITEM                                                                                        //
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//+++++++++++++++++++++++++++++++++++++++++++ add item ++++++++++++++++++++++++++++++++++++++++//
// Clear form function
const clearForm1 = () => {
    $('#itemForm')[0].reset(); // Reset the form fields
    selectedItemIndex = undefined; // Reset the selected item index
    $("#itemTableBody tr").removeClass("table-active"); // Clear any row highlights
};
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
    clearForm1();


});
// Click event to select an item row
$("#itemTableBody").on("click", "tr", function() {
    selectedItemIndex = $(this).index(); // Get the index of the clicked row
    let item = item_array[selectedItemIndex]; // Get the item data
    // Populate the form with the selected item's data
    $('#itemName').val(item.name);
    $('#qty').val(item.qty);
    $('#itemDescription').val(item.description);
    $('#price').val(item.price);

    // Highlight the selected row
    $("#itemTableBody tr").removeClass("table-active"); // Remove highlight from all rows
    $(this).addClass("table-active"); // Highlight the selected row
});

// Delete button functionality
$("#item_delete_button").on("click", function () {
    if (selectedItemIndex !== undefined) {
        item_array.splice(selectedItemIndex, 1); // Remove the selected item
        loadItemTable(); // Refresh the table
        clearForm(); // Clear the form
    } else {
        alert("Please select an item to delete.");
    }
});

// Update button functionality
$("#item_update_button").on("click", function () {
    if (selectedItemIndex !== undefined) {
        let item_name = $('#itemName').val();
        let qty = $('#qty').val();
        let description = $('#itemDescription').val();
        let price = $('#price').val();

        // Update the selected item
        item_array[selectedItemIndex] = {
            id: selectedItemIndex + 1, // Keep the same ID for simplicity
            name: item_name,
            qty: qty,
            description: description,
            price: price,
        };

        loadItemTable(); // Refresh the table
        clearForm(); // Clear the form
    } else {
        alert("Please select an item to update.");
    }
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
