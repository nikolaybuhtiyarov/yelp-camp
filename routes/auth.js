var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
//==============================================


// AUTHENTICATE ROUTS===========================
// Show register form

router.get("/register", function(req, res){
    res.render("register");
});

// Handle the sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            return res.render("register", {"error": err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Wellcome " + user.username + " to YellpCamp!");
            res.redirect("/campgrounds");
        });
    });
});

// Show login form

router.get("/login", function(req, res){
    res.render("login");
});

// Handle the login logic

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login",
        //Shows message if username or password are incorrect
        failureFlash: true
    }), function(req, res){
});

// Logout logic

router.get("/logout", function(req, res){
    req.logOut();
    req.flash("success", "Successfully logged out!");
    res.redirect("/campgrounds");
});



//==============================================
module.exports = router;