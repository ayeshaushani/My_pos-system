import OrderDetailsModels from "../models/orderDetailsModel.js";
import { orderDetails_array } from "../db/database.js";

$(document).ready(function() {
    // Function to show order details modal
    $('#placeOrderBtn').on('click', function() {
        // Clear previous items
        $('#orderItemsList').empty();

        // Populate the modal with order items
        orderItems.forEach(item => {
            const listItem = `
                <li class="list-group-item">
                    <strong>Item ID:</strong> ${item.itemId}<br>
                    <strong>Name:</strong> ${item.itemName}<br>
                    <strong>Price:</strong> $${item.price.toFixed(2)}<br>
                    <strong>Quantity:</strong> ${item.orderQuantity}<br>
                    <strong>Total:</strong> $${item.total.toFixed(2)}
                </li>
            `;
            $('#orderItemsList').append(listItem);
        });

        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('orderDetailsModal'));
        modal.show();

        // Optionally, save order details in orderDetails_array
        const orderDetail = new OrderDetailsModels(orderItems);
        orderDetails_array.push(orderDetail);
    });
});
