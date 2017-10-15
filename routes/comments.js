var express     = require("express"),
    router      = express.Router({mergeParams: true}),
    Campground  = require("../models/campgrounds"),
    Comment     = require("../models/comment"),
    Middleware  = require("../middleware");

// New Route
router.get("/new", Middleware.isLoggedIn, function(req, res){
  Campground.findById(req.params.id, function(err, data){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new", {campgrounds: data});
    }
  });
});

// Post Route
router.post("/", Middleware.isLoggedIn, function(req, res){
  //lookup comment using id
  Campground.findById(req.params.id, function(err, campground){
    if(err){
      res.redirect("/campgrounds")
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          req.flash("error", "Something went wrong!");
          console.log(err);
        }else{
          // add username and id to comment
          comment.author.id = req.user._id;
          comment.author.username = req.user.username;
          comment.rating = req.user.rating;
          // save comment          
          comment.save();
          campground.comments.push(comment);
          campground.save();
          console.log(comment);
          req.flash("success", "Successfully added comment");
          res.redirect('/campgrounds/' + campground._id); 
        }               
      });
    }
  });
});

// Edit Route
router.get("/:comment_id/edit", Middleware.checkCommentOwnership, function(req, res){
  Comment.findById(req.params.comment_id, function(err, foundComment){
    if(err){
      res.redirect("back");
    } else {
      res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
  });  
});

// Update Route
router.put("/:comment_id", Middleware.checkCommentOwnership, function(req, res){
  //find and update the correct campground
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, uComment){
    if(err){
      res.redirect("back");
    } else {
        //redirect somewhere
      res.redirect("/campgrounds/" + req.params.id);
    }
  });  
});

// Delete Route
router.delete("/:comment_id", Middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err){
    if(err){
      res.redirect("back");
    } else {
      req.flash("success", "Comment deleted");
      res.redirect("/campgrounds/" + req.params.id);
    }
  });  
});

module.exports = router;