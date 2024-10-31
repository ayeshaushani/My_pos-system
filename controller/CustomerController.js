import CustomerModels from "../models/customerModels.js";
import {customer_array } from "../db/database.js";


//cus array
/*let customer_array =[];*/
/*let item_array =[];*/


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

             <td>${item.id}</td>
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
        alert("invalid customer");
    }else if(last_name.length===0){
        alert("invalid last name");
    }else if(!validEmail(email)){
        alert("invalid email");
    }else if(!validMobile(mobile)){
        alert("invalid mobile");
    }else if(address.length===0){
        alert("invalid address");
    }else{
        let customer = new CustomerModels(
            customer_array.length + 1,
            first_name,
            last_name,
            mobile,
            email,
            address
        );
        new CustomerModels();
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "customer has been saved",
            showConfirmButton: false,
            timer: 1500
        });

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
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
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

        let timerInterval;
        Swal.fire({
            title: "customer updating...",
            html: "I will close in <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("customer updated...!");
            }
        });
    } else {
        alert("Please select a customer to update.");
    }
});
