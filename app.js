// REQUIRING NPM PACKAGES AND OTHER DEPENDENCIES
var express       = require("express"),
    bodyParser    = require("body-parser"),
    app           = express(),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    flash         = require("connect-flash"),
    LocalStrategy = require("passport-local"),
    methodOveride = require("method-override"),
    Campground    = require("./models/campgrounds"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");

// REQUIRING ROUTES
var campgroundRoute = require("./routes/campground"),
    commentsRoute   = require("./routes/comments"),
    indexRoute      = require("./routes/index");

// USING IMPORTANT THINGS
var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp";
mongoose.connect(url);
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOveride("_method"));
app.use(flash());
app.set("view engine", "ejs");
//seedDB(); //seeding the database

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "Otaku rocks!",
  resave: false,
  saveUninitialized: true
}));

// USING PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

// USING ROUTES
app.use("/", indexRoute);
app.use("/campgrounds", campgroundRoute);
app.use("/campgrounds/:id/comments", commentsRoute);

app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The YelpCamp Server has started!!!");
});