import OrderModels from "../models/orderModels.js";
import { customer_array, item_array,order_array } from "../db/database.js";

function populateCustomerDropdown() {
    const customerSelect = document.getElementById("customer1");

    // Clear existing options if any
    customerSelect.innerHTML = "";

    // Loop through CustomerDB to create option elements
    customer_array.forEach(customer => {
        const option = document.createElement("option");
        option.value = customer.id;
        option.textContent = customer.id;
        customerSelect.appendChild(option);
    });

}
function handleCustomerSelection() {
    const customerSelect = document.getElementById("customer1");
    const nameField = document.getElementById("name1");
    const addressField = document.getElementById("address1");

    // Find the selected customer from CustomerDB
    const selectedCustomerId = customerSelect.value;

    const customer = customer_array.find(c => {
        return String(c.id) === String(selectedCustomerId);
    });
    // Update name and address fields if a customer is found
    if (customer) {
        nameField.value = customer.first_name;
        addressField.value = customer.address;
    } else {
        nameField.value = "";
        addressField.value = "";
    }
}

$("#customer1").on("click",function (){
    handleCustomerSelection();
});


/*Populate Item in Order ItemID Selection */


function populateItemDropdown(){
    const itemSelect = document.getElementById("item");

    itemSelect.innerHTML = "";

    item_array.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = item.id;
        itemSelect.appendChild(option);
    });
}

function handleItemSelection(){
    const itemSelect = document.getElementById("item");
    const ItemName = document.getElementById("itemName1");
    const price = document.getElementById("price1");
    const qty = document.getElementById("qty1");

    const selectedItemId = itemSelect.value;

    const item = item_array.find(i => {
        return String(i.id) === String(selectedItemId);
    });


    if (item) {
        ItemName.value = item.name;
        price.value = item.price;
        qty.value = item.qty;
    } else {
        ItemName.value = "";
        price.value = "";
        qty.value = "";
    }
}
$("#item").on("click", function (){
    handleItemSelection();
});
/////////////////////////////////////////////////////////////////
/*Genarate Order Id */
/////////////////////////////////////////////////////////////////

function genarateOrderId () {
    if (order_array.length === 0) return 'O001'

    const lastOrderId = order_array[order_array.length - 1].id;
    const lastIdNum = parseInt(lastOrderId.slice(1),10);
    return 'O' + String(lastIdNum + 1).padStart(3, '0');
}

/////////////////////////////////////////////////////////////////
/*Content Load */
/////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function() {
    const orderIdField = document.getElementById("orderID");
    if (orderIdField) {
        orderIdField.value = genarateOrderId();
    } else {
        console.error("Order ID field not found");
    }


});

$("#Order").on("click",function (){
    populateCustomerDropdown();
    populateItemDropdown();
});

/*
// Load customers into the customer dropdown
export function loadCustomers() {
    const customerSelect = document.getElementById('customer1');
    customerSelect.innerHTML = '<option value="" disabled selected>Select Customer</option>';
    customer_array.forEach(customer => {
        customerSelect.insertAdjacentHTML('beforeend', `<option value="${customer.first_name},${customer.address}">${customer.id}</option>`);
    });
}

// Load items into the item dropdown
export function loadItems() {
    const itemSelect = document.getElementById('item');
    itemSelect.innerHTML = '<option value="" disabled selected>Select Item</option>';
    item_array.forEach(item => {
        itemSelect.insertAdjacentHTML('beforeend', `<option value="${item.name},${item.price},${item.qty}">${item.id}</option>`);
    });
}

// Update customer details based on selection
function updateCustomerDetails() {
    const customerId = document.getElementById('customer1').value;
    const selectedCustomer = customer_array.find(customer => customer.id === customerId);
    if (selectedCustomer) {
        document.getElementById('id').value = selectedCustomer.id;
        document.getElementById('name1').value = selectedCustomer.name;
        document.getElementById('address1').value = selectedCustomer.address;
    } else {
        document.getElementById('name1').value = '';
        document.getElementById('address1').value = '';
    }
}

// Update item details based on selection
function updateItemDetails() {
    const itemId = document.getElementById('item').value;
    const selectedItem = item_array.find(item => item.id === itemId);
    if (selectedItem) {
        document.getElementById('id').value = selectedItem.id;
        document.getElementById('itemName1').value = selectedItem.name;
        document.getElementById('price1').value = selectedItem.price.toFixed(2);
        document.getElementById('qty1').value = selectedItem.qty;
    } else {
        document.getElementById('itemName1').value = '';
        document.getElementById('price1').value = '';
        document.getElementById('qty1').value = '';
    }
}

// Add an item to the order
function addItemToOrder() {
    const customerSelect = document.getElementById('customer1');
    if (!customerSelect.value) {
        alert('Please select a customer first!');
        return;
    }

    const itemId = document.getElementById('item').value;
    const orderQty = parseInt(document.getElementById('orderQty').value);

    const selectedItem = item_array.find(item => item.id === itemId);
    if (selectedItem && orderQty > 0 && orderQty <= selectedItem.qty) {
        const total = selectedItem.price * orderQty;
        const orderItem = new OrderModels(selectedItem.id, selectedItem.name, selectedItem.price, orderQty, total);
        order_array.push(orderItem); // Ensure this line is executed

        updateOrderTable();
        updateTotal();
    } else {
        alert('Invalid item selection or quantity!');
    }
}

// Update order table
function updateOrderTable() {
    const orderTableBody = document.getElementById('OrderTable');
    orderTableBody.innerHTML = ''; // Clear existing rows

    order_array.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Item_ID}</td>
            <td>${item.Item_Name}</td>
            <td>$${item.Price.toFixed(2)}</td>
            <td>${item.Quantity}</td>
            <td>$${item.Total.toFixed(2)}</td>
        `;
        orderTableBody.appendChild(row);
    });
}

// Calculate total cost of the order
function updateTotal() {
    const orderTotalElement = document.getElementById('orderTotal');
    const total = order_array.reduce((sum, item) => sum + item.Total, 0);
    orderTotalElement.textContent = `Order Total: $${total.toFixed(2)}`;
}

// Place the order and reset the form
function placeOrder() {
    console.log(order_array); // Check the contents of order_array
    if (order_array.length > 0) {
        alert('Order placed successfully!');
        order_array.length = 0; // Clear the array
        updateOrderTable();
        updateTotal();
        // Reset fields
    } else {
        alert('No items in the order to place!');
    }
}
function genarateOrderId () {
    if (OrderDB.length === 0) return 'O001'
    const lastOrderId = OrderDB[OrderDB.length - 1].orderId;
    const lastIdNum = parseInt(lastOrderId.slice(1),10);
    return 'O' + String(lastIdNum + 1).padStart(3, '0');
}
// Event listeners for the form
document.addEventListener('DOMContentLoaded', () => {
    loadCustomers(); // Load customers into dropdown
    loadItems(); // Load items into dropdown
    document.getElementById('customer1').addEventListener('change', updateCustomerDetails);
    document.getElementById('item').addEventListener('change', updateItemDetails);
    document.getElementById('orderQty').addEventListener('input', () => {
        const itemId = document.getElementById('item').value;
        const selectedItem = item_array.find(item => item.id === itemId);
        const orderQty = parseInt(document.getElementById('orderQty').value) || 0;
        if (selectedItem) {
            const total = selectedItem.price * orderQty;
            document.getElementById('total').innerText = `Total: $${total.toFixed(2)}`;
        }
    });
    document.querySelector('.btn-success').addEventListener('click', addItemToOrder);
    document.getElementById('PurchaseItem').addEventListener('click', placeOrder);
});
*/
