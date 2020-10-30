const express = require('express'); 
const router = express.Router(); // every express has a Router application

// Add fruit model
//const fruits = require('../fruits.js');
const Fruit = require('../models').Fruit;
const User = require('../models').User; 
const Season = require('../models').Season; 

// New index page / 
router.get("/", (req, res) => {
    Fruit.findAll().then((fruits) => {
      res.render("index.ejs", {
        fruits: fruits,
      });
    });
  });

// GET ==> show (new.ejs) form to user // changed app ==> router and removed /fruit from new fruit link
router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// New create route / Fruit.create to create new fruit w/ sequelize 
router.post("/", (req, res) => {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
  
    Fruit.create(req.body).then((newFruit) => {
      res.redirect("/fruits");
    });
  });

// New show route 
router.get("/:id", (req, res) => {
  Fruit.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ["name"],
      },
      {
        model: Season,
      },
    ],
    attributes: ["name", "color", "readyToEat"],
  }).then((fruit) => {
    res.render("show.ejs", {
      fruit: fruit,
    });
  });
});

// New edit route   
router.get("/:id/edit", function (req, res) {
  Fruit.findByPk(req.params.id).then((foundFruit) => {
    Season.findAll().then((allSeasons) => {
      res.render("edit.ejs", {
        fruit: foundFruit,
        seasons: allSeasons,
      });
    });
  });
});

// New edit method
router.put("/:id", (req, res) => {
  console.log(req.body);
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }

  Fruit.update(req.body, {
    where: { id: req.params.id },
    returning: true,
  }).then((updatedFruit) => {
    Season.findByPk(req.body.season).then((foundSeason) => {
      Fruit.findByPk(req.params.id).then((foundFruit) => {
        foundFruit.addSeason(foundSeason);
        res.redirect("/fruits");
      });
    });
  });
});

// New delete route / destroy sequeluze method 
router.delete("/:id", (req, res) => {
    Fruit.destroy({ where: { id: req.params.id } }).then(() => {
      res.redirect("/fruits");
    });
  });




module.exports = router; 

