//import { on } from "cluster";

$(document).ready(function() {
  var addItemForm = $("form.add-item");
  var itemNameInput = $("input#itemName-input");
  var itemDescriptionInput = $("textarea#itemDescription-input");
  var itemQtInput = $("input#itemQt-input");
  
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user").then(function(data) {
    console.log(data);
    $(".username").text(data[0].name);
    console.log(data);
  
  });
  $.get("/api/fridge").then(function(data) {
    console.log(data);
    $(".fridgeName").text(data[0].fridgeName);
    console.log(data);
  
  });
  addItemForm.on("submit", function(event){
    event.preventDefault();
    var itemData = {
      itemName: itemNameInput.val().trim(),
      itemDescription: itemDescriptionInput.val().trim(),
      itemQt: itemQtInput.val().trim(),
      
    };
    console.log(itemData);
    if (!itemData.itemName || !itemData.itemDescription || !itemData.itemQt) {
      //return;
      console.log("nothing returned");
    }
    addItem(itemData.itemName, itemData.itemDescription, itemData.itemQt);
    itemNameInput.val("");
    itemDescriptionInput.val("");
    itemQtInput.val("");

  })


  function addItem(itemName, itemDescription, itemQt) {
    console.log(itemName, itemDescription, itemQt);
    $.post("/api/add_item", {
      itemName: itemName,
      itemDescription: itemDescription,
      itemQt: itemQt
    })
      .then(function(data) {
        console.log("deu certo");
        //window.location.replace("/members");
        //res.render("members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr); 
  }
  function handleLoginErr(err) {
    console.log(err.responseJSON)
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }









});
