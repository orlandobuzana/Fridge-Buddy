// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members");
    }
    //res.sendFile(path.join(__dirname, "../public/signup.html"));
    res.render("login", {
      title: 'Fridge Buddy'
    });
  });

  app.get("/signup", function (req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("members", {
        title: 'members'
      });
    }
    //res.sendFile(path.join(__dirname, "../views/signUp"));
    res.render("signup")
  });
    
  app.get("/members", isAuthenticated, function(req, res) {
    //res.sendFile(path.join(__dirname, "../public/members.html"));
    res.render("members",{title:'members'});
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members/:id", isAuthenticated, function (req, res) {
    //res.sendFile(path.join(__dirname, "../public/members.html"));
    db.Items.findAll({
      where: {
        fridgeId: req.params.id
      }
    }).then(function (dbItem) {
      res.render("members", {
        title: 'members',
        items: dbItem
      });
      console.log(`this is dbItem `);
    });


  });
  

};