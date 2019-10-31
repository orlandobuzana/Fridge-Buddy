// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {

    res.json(req.user);
    
    // res.render("members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.Fridge.create({
      fridgeName: req.body.fridgeName,
      User: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
    }, {include: db.User})
      .then(function(data) {
        console.log(data);
        res.redirect(307, "/api/login");
        // res.render('members')
      })
      .catch(function(err) {
        res.status(401).json(err);
      })
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    
    req.logout();
    res.redirect("/");
    
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({error:"not Logged-in"});
    } else {
      // Otherwise send back the user's email and name
      // Sending back a password, even a hashed password, isn't a good idea
      
      res.json({
        username: req.user.username,
        email: req.user.email
      });
    }
  });

  //Route for all the fridges
  app.get("/api/fridge", function(req,res){
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({error:"not Logged-in"});
    }else{
    db.Fridge.findAll({where:{
      UserId : req.user.id
    }
    }).then(function(result){
      res.json(result);

    });
  }
});

};
