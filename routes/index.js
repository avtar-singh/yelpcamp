var express   = require("express"),
    router    = express.Router(),
    passport  = require("passport"),
    User      = require("../models/user");

// ROOT ROUTE
router.get("/", function(req, res){
  res.render("landing");
});

// REGISTER FORM
router.get("/register", function(req, res){
  res.render("register");
});

// SIGN UP LOGIC
router.post("/register", function(req, res){
  var uName = new User({username: req.body.username});
  User.register(uName, req.body.password, function(err, newUser){
    if(err){
      req.flash("error", err.message);
      return res.render("register");
    } 
      passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to YelpCamp " + newUser.username);
        res.redirect("/campgrounds");
      });
  });
});

// SHOW LOGIN FORM
router.get("/login", function(req, res){
  res.render("login");
});

// SIGN IN LOGIC
router.post("/login", passport.authenticate("local",
{
  successRedirect: "/campgrounds", 
  failureRedirect: "/login"
}), function(req, res){
});

// LOGOUT FORM
router.get("/logout", function(req, res){
  req.logout();
  req.flash("success", "Successfully Logged Out!");
  res.redirect("/campgrounds");
});

module.exports = router;