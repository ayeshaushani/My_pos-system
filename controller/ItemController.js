import ItemModels from "../models/itemModels.js";
import {item_array} from "../db/database.js";


const clearForm1 = () => {
    $('#itemForm')[0].reset(); // Reset the form fields
    let selectedItemIndex = undefined; // Reset the selected item index
    $("#itemTableBody tr").removeClass("table-active"); // Clear any row highlights
};
const loadItemTable = () => {
    $("#itemTableBody").empty();
    item_array.map((item,index) =>{
        console.log(item); let data =`<tr>
           <td>${item.id}</td>
          <td>${item.name}</td>
             <td>${item.qty}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
             </tr>`
        $("#itemTableBody").append(data);
    });
}
$("#item_add_button").on("click", function (){
    let name = $('#itemName').val();
    let qty = $('#qty').val();
    let description = $('#itemDescription').val();
    let price = $('#price').val();

    if(name.length===0){
        alert("invalid name");
    }else if (qty.length===0){
        alert("invalid qty");
    }else if(description===0){
        alert("invalid description");
    }else if(price.length===0){
        alert("invalid price");
    }else{
        let item = new ItemModels(
            item_array.length+1,
            name,
            qty,
            description,
            price
        );
        new ItemModels();
        item_array.push(item);
        loadItemTable();
        clearForm1();
    }
});

// Click event to select an item row
let selectedItemIndex;
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
// delete item function
$("#item_delete_button").on("click", function (selectedItemIndex) {
    if (selectedItemIndex !== undefined) {
        item_array.splice(selectedItemIndex, 1); // Remove the selected item
        loadItemTable(); // Refresh the table
        clearForm1(); // Clear the form
    } else {
        alert("Please select an item to delete.");
    }
});
// Update item function
$("#item_update_button").on("click", function () {
    if (selectedItemIndex !== undefined) {
        let name = $('#itemName').val().trim();
        let qty = $('#qty').val().trim();
        let description = $('#itemDescription').val().trim();
        let price = $('#price').val().trim();

        if (name.length === 0 || qty.length === 0 || isNaN(qty) || qty <= 0 ||
            description.length === 0 || price.length === 0 || isNaN(price) || price < 0) {
            alert("Please fill out all fields correctly.");
            return;
        }

        // Update the selected item
        item_array[selectedItemIndex] = new ItemModels(
            selectedItemIndex + 1, // Keep the same ID for simplicity
            name,
            qty,
            description,
            price
        );

        loadItemTable(); // Refresh the table
        clearForm1(); // Clear the form
        selectedItemIndex = undefined; // Reset selection
    } else {
        alert("Please select an item to update.");
    }
});
