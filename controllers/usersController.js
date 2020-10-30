const express = require('express');
const router = express.Router(); 

// const users = require('../users');
const User = require('../models').User;
const Fruit = require('../models').Fruit;  



// // each profile index
// router.get('/profile/:index', (req, res) => { 
//     res.render('users/profile.ejs', { 
//         user: users[req.params.index] 
//     });
// });  

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
  // IF USER ID FROM TOKEN MATCHES THE REQUESTED ENDPOINT, LET THEM IN
  if (req.user.id == req.params.id) {
    User.findByPk(req.params.id, {
      include: [
        {
          model: Fruit,
          attributes: ["id", "name"],
        },
      ],
    }).then((userProfile) => {
      res.render("users/profile.ejs", {
        user: userProfile,
      });
    });
  } else {
    // res.json("unauthorized");
    res.redirect("/");
  }
});

// signUp form w/ redirect 
// router.post('/', (req, res) => {
//     users.push(req.body);
//     res.redirect(`/users/profile/${users.length - 1}`); // why just /users? 
// });


//   GET ==> prefilled the data from the model and show the edit form to the user // changed app ==> router and index link // needs to go after new.ejs link
// router.get('/profile/:index/edit', function(req, res){
// 	res.render(
// 		'users/edit.ejs', //render views/edit.ejs
// 		{ //pass in an object that contains
// 			user: users[req.params.index], //the fruit object
// 			index: req.params.index //... and its index in the array
// 		}
// 	);
// });

router.get("/profile/:id/edit", function (req, res) {
    User.findByPk(req.params.id).then((user) => {
      res.render("users/edit.ejs", {
        user: user,
      });
    });
  });

router.put("/profile/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    }).then((updatedUser) => {
        res.redirect(`/users/profile/${req.params.id}`);
    });
});

router.delete("/:id", (req, res) => {
    User.destroy(req.body, {
        where: {
            id: req.params.id,
        }
    })
})

module.exports = router;