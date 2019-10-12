// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/items", function(req, res) {
    var query = {};
    if (!req.user) {
        // The user is not logged in, send back an empty object
        res.json({error:"not Logged-in"});
    }else if (req.query.fridgeId) {
      query.fridgeId = req.query.fridgeId;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Items.findAll({
      where: query,
      include: [db.Fridge]
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/items/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Item.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Fridge]
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // POST route for saving a new post
  app.post("/api/items/add_item", function(req, res) {
    db.Items.create({
        itemName: req.body.itemName,
        itemDescription: req.body.itemDescription,
        itemQt: req.body.itemQt
      },{include: db.Fridge})
        .then(function(data) {
          console.log(data);
          console.log("nao deu certo");
            //res.redirect(307, "/api/add_item");
        })
        .catch(function(err) {
          res.status(401).json(err);
        })
  });

  // DELETE route for deleting posts
  app.delete("/api/items/:id", function(req, res) {
    db.Items.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    db.Post.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
