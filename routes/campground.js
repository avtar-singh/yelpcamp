var express     = require("express"),
    router      = express.Router(),
    Campground  = require("../models/campgrounds"),
    Middleware  = require("../middleware");

// Index Route
router.get("/", function(req, res){
  Campground.find({}, function(err, data){
    if(err){
      console.log(err);
    }else{
        res.render("campgrounds/index", {campgrounds: data});
    }
  });
});

// Create Route
router.post("/", Middleware.isLoggedIn, function(req, res){
  var name = req.body.name;
  var image = req.body.url; 
  var desc = req.body.description;
  var author = {
    username: req.user.username,
    id: req.user._id
  };
  var newCampground = {title: name, image: image, description: desc, author: author};
  Campground.create(newCampground, function(err, data){
    if(err){
      console.log(err);
    }else{
      console.log(data);
      res.redirect("/campgrounds");
    }
  });
});

// New Route 
router.get("/new", Middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new");
});

// Show Route
router.get("/:id", function(req, res){
  Campground.findById(req.params.id).populate("comments").exec(function(err, data){
    if(err){
      console.log(err);
    }else{
        res.render("campgrounds/show",{campgrounds:data});
    }
  });
});

// Edit Route
router.get("/:id/edit", Middleware.checkCampgroundOwnership, function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campgrounds: foundCampground});
  });
});

// Update Route
router.put("/:id", Middleware.checkCampgroundOwnership, function(req, res){
  //find and update the correct campground
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, uCampground){
    if(err){
      req.flash("error", "Campground not found");
      res.redirect("/campgrounds");
    } else {
        //redirect somewhere
      res.redirect("/campgrounds/" + req.params.id);
    }
  });
});

// Delete Route
router.delete("/:id", Middleware.checkCampgroundOwnership, function(req, res){
  Campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  });
});

module.exports = router;