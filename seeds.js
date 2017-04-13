var mongoose = require("mongoose");
var Campground = require("./models/campground.js");
var Comment = require("./models/comment.js")
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg",
        description: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century."
    },
    {
        name: "Yelp Camp",
        image: "https://farm7.staticflickr.com/6105/6381606819_df560e1a51.jpg",
        description: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century."
    },
    {
        name: "Rila",
        image: "https://farm4.staticflickr.com/3185/2677193999_7490d5bcf5.jpg",
        description: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century."
    },
    {
        name: "Pirin",
        image: "https://farm3.staticflickr.com/2054/2229707213_302c00f6b5.jpg",
        description: "In a professional context it often happens that private or corporate clients corder a publication to be made and presented with the actual content still not being ready. Think of a news blog that's filled with content hourly on the day of going live. However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper or the internet. The are likely to focus on the text, disregarding the layout and its elements. Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely since the sixteenth century."
    }

];

// Removes all campgrounds
function seedBD(){
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("Database wiped out!");

// Adds new campgrounds

        data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else{
                    console.log("Added data");

// Create a comment

                    Comment.create(
                        {
                            text: "The best comment ever!",
                            author: "Nicky"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment");
                            }
                        }
                    );
                 }
            });
        });
    });    
}

module.exports = seedBD;