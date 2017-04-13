var Campground = require("../models/campground");
var Comment = require("../models/comment");

//ALL MIDDLEWARE

var middleware = {};

// Campground Authorization
middleware.isCampgroundAuthorized = function(req, res, next){
    // is the user logged in
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                //does the user own the campground
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                }                
            }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

// Comment Authorization
middleware.isCommentAuthorized = function(req, res, next){
    // is the user logged in
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else{
                //does the user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("error", "You dont have permission to do that!");
                    res.redirect("back");
                }                
            }
        });
    } else {
        req.flash("error", "You need to be logged in first to do that!");
        res.redirect("back");
    }
};

// User Authorization
middleware.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in first to do that!");
    res.redirect("/login");
};

//=====================================================

module.exports = middleware;