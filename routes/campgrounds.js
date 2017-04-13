var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware/index");
var geocoder = require("geocoder");
//==============================================

///
router.get("/", function(req, res){
    res.render("landing");
});

//INDEX
router.get("/campgrounds", function(req, res){
    //Gets all the campgrounds from database
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log("ERROR!");
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds:allCampgrounds});
        }
    }); 
});

//NEW
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW
router.get("/campgrounds/:id", function(req, res){
    //find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });   
});

//CREATE
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
    //Gets data from form
    var name = req.body.name;
    var image = req.body.image;
    var price =req.body.price;
    var description = req.body.description;

    var author = {
        id: req.user._id,
        username: req.user.username
    };

    geocoder.geocode(req.body.location, function (err, data){
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;

        var newCampground = {name: name, image: image,price: price, description: description, author: author, location: location, lat: lat, lng: lng};
        //Create a new campground and save to database
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log(err);
            } else{
                //Redirects to /campgrounds page
                res.redirect("/campgrounds");
            }
        });
    });
});

//EDIT
router.get("/campgrounds/:id/edit", middleware.isCampgroundAuthorized, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });   
});

//UPDATE

router.put("/campgrounds/:id", middleware.isCampgroundAuthorized, function(req, res){
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, location: location, lat: lat, lng: lng};
        Campground.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, updatedCampground){
            if(err){
                res.redirect("/campgrounds");
            }   else {
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    });
});

//DELETE

router.delete("/campgrounds/:id", middleware.isCampgroundAuthorized, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

//==============================================

module.exports = router;