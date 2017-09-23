var mongoose = require("mongoose"),
    Campground = require("./models/campgrounds"),
    Comment = require("./models/comment");

var data = [
  {
    title: "Cloud's Rest", 
    image: "https://image.shutterstock.com/display_pic_with_logo/2547541/358158596/stock-photo-camping-and-tent-under-the-pine-forest-in-sunset-at-north-of-thailand-358158596.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar dignissim erat, et posuere quam placerat eget. Aenean efficitur arcu sed nulla tincidunt bibendum. Donec fringilla ut felis quis mollis. Vestibulum viverra porta turpis, nec dapibus purus commodo ac. Cras mi magna, egestas eu ipsum non, tincidunt viverra nulla. Nullam quis arcu consequat, cursus metus et, dictum ante. Maecenas enim mi, feugiat vitae metus vitae, elementum hendrerit arcu. Aliquam vehicula facilisis ex vel cursus. Morbi sapien enim, accumsan vitae egestas sed, vehicula vitae libero. In hac habitasse platea dictumst."
  },
  {
    title: "Heaven's Palace", 
    image: "https://cdn.pixabay.com/photo/2015/07/10/17/24/night-839807__340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar dignissim erat, et posuere quam placerat eget. Aenean efficitur arcu sed nulla tincidunt bibendum. Donec fringilla ut felis quis mollis. Vestibulum viverra porta turpis, nec dapibus purus commodo ac. Cras mi magna, egestas eu ipsum non, tincidunt viverra nulla. Nullam quis arcu consequat, cursus metus et, dictum ante. Maecenas enim mi, feugiat vitae metus vitae, elementum hendrerit arcu. Aliquam vehicula facilisis ex vel cursus. Morbi sapien enim, accumsan vitae egestas sed, vehicula vitae libero. In hac habitasse platea dictumst."
  },   
  {
    title: "Canyon Floor", 
    image: "https://cdn.pixabay.com/photo/2017/08/29/04/16/site-2692058__340.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pulvinar dignissim erat, et posuere quam placerat eget. Aenean efficitur arcu sed nulla tincidunt bibendum. Donec fringilla ut felis quis mollis. Vestibulum viverra porta turpis, nec dapibus purus commodo ac. Cras mi magna, egestas eu ipsum non, tincidunt viverra nulla. Nullam quis arcu consequat, cursus metus et, dictum ante. Maecenas enim mi, feugiat vitae metus vitae, elementum hendrerit arcu. Aliquam vehicula facilisis ex vel cursus. Morbi sapien enim, accumsan vitae egestas sed, vehicula vitae libero. In hac habitasse platea dictumst."
  },
]

function seedDB(){
  //Remove all Campgrounds
  Campground.remove({}, function(err){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("Remove Campgrounds");
//      //Add Few Camogrounds
//       data.forEach(function(seed){
//         Campground.create(seed, function(err, campground){
//           if(err){
//           console.log(err);
//           }else{
//             console.log("Added a Campground");
//             Comment.create(
//             {
//               text: "This place looks great!!",
//               author: "Jake"
//             },function(err, data){
//               if(err){
//                 console.log(err);
//               }else{
//                 campground.comments.push(data);
//                 campground.save();
//                 console.log("Created new comment");
//               }
//             });
//           }                  
//         });
//       });
//     }
  });  
}

module.exports = seedDB;