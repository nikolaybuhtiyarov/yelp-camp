// REQUIRES
// Paquages
var express           = require("express");
var app               = express();
var bodyParser        = require("body-parser");
var mongoose          = require("mongoose"); mongoose.Promise = global.Promise;
var passport          = require("passport");
var LocalStrategy     = require("passport-local");
var methodOverride    = require("method-override");
var flash             = require("connect-flash");

app.locals.moment     = require("moment");
// Models
var Campground        = require("./models/campground");
var User              = require("./models/user");
var Comment           = require("./models/comment");
// Routes
var campgroundRoutes  = require("./routes/campgrounds");
var commentRountes    = require("./routes/comments");
var authRoutes        = require("./routes/auth");

//var seedDB            = require("./seeds");
//seedDB();
var port              = process.env.PORT || 3000;


//DataBase:============================================
//Connection
mongoose.connect("mongodb://127.0.0.1/database");


//=====================================================

// PASSPORT CONFIGURATION==============================
app.use(require("express-session")({
    secret: "Tiesto is the greatest DJ in the world!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//====================================================

app.set("view engine", "ejs");
//=====================================================

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"/public"));
app.use(methodOverride("_method"));
app.use(flash());

//passing data over all routes
app.use(function(req, res, next){
    //user data
    res.locals.currentUser = req.user;
    //flash data
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//=====================================================




app.use(campgroundRoutes);
app.use(commentRountes);
app.use(authRoutes);


// SERVER========================================================
app.listen(port, function(){
    console.log("Server has started!");
});
//===============================================================