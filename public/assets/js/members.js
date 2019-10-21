//import { on } from "cluster";

$(document).ready(function() {
  var fridgeId;
  var addItemForm = $("form.add-item");
  var itemNameInput = $("input#itemName-input");
  var itemDescriptionInput = $("textarea#itemDescription-input");
  var itemQtInput = $("input#itemQt-input");
  var uList = $("<ul></ul>");
  var ulItem = $("<li></li>");
  
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    console.log("this is the user data")
    console.log(data);
    $(".username").text(data.username);
    console.log(data.username);
  
  });
  $.get("/api/fridge").then(function(fridgeData) {
    console.log("this is the ffridge data");
    console.log(fridgeData);
    $(".fridgeName").append(fridgeData[0].fridgeName);
    fridgeId = fridgeData[0].id;
    
  
  });
  $.get("/api/items").then(function(data) {
    console.log(`this is running the jquery`);
    console.log(data);
    for(let x=0;x < data.lenght;x++){
      
      $(".fridgeContents").append(`<li>${data[x].itemName}</li>`);

    }
    $(".itemList").text(data[0].itemName);
    console.log(data[0].itemName);
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
    addItem(itemData.itemName, itemData.itemDescription, itemData.itemQt, fridgeId);
    itemNameInput.val("");
    itemDescriptionInput.val("");
    itemQtInput.val("");
  })
  

  function addItem(itemName, itemDescription, itemQt, fridgeId) {
    console.log(itemName, itemDescription, itemQt, fridgeId);
    $.post("/api/items/add_item", {
      itemName: itemName,
      itemDescription: itemDescription,
      itemQt: itemQt,
      fridgeId: fridgeId
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
