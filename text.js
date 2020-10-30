const express = require("express");
const router = express.Router();

// const users = require("../users");
const User = require('../models').User;

// INDEX
router.get("/", (req, res) => {
    res.render("users/index.ejs");
});

// GET SIGNUP FORM
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});

// GET LOGIN
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});

// POST LOGIN
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username,
            password: req.body.password,
        },
    }).then((foundUser) => {
        res.redirect(`/users/profile/${foundUser.id}`);
    })
});

// POST - CREATE NEW USER FROM SIGNUP
router.post("/", (req, res) => {
    User.create(req.body).then((newUser) => {
        res.redirect(`/users/profile/${newUser.id}`);
    });
});

// GET USERS PROFILE
router.get("/profile/:id", (req, res) => {
    User.findByPk(req.params.id).then((userProfile) => {
        res.render("users/profile.ejs", {
            user: userProfile,
        });
    });
});

// EDIT PROFILE
router.put("/profile/:id", (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id,
        },
        returning: true,
    }).then((updatedUser) => {
        console.log(updatedUser);
        res.redirect(`/users/profile/${req.params.id}`);
    });
});

// DELETE USER
router.delete("/:id", (req, res) => {
    User.destroy({
        where: {
            id: req.params.id,
        },
    }).then(() => {
        res.redirect("/users");
    });
});
module.exports = router;