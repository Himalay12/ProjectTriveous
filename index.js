
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const app = express();

//app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
//app.use(express.static("public"));

//TODO
mongoose.connect("mongodb://localhost:27017/TriveousDB", {useNewUrlParser: true, useUnifiedTopology: true});

// Unique id of the bookmark (something like UUID)
// Link of the bookmark (Should be unique)
// Title of the bookmark
// Time when bookmark was created (in epoch time)
// Time when bookmark was updated (in epoch time)
// Publisher of the bookmark
// User created tags associated with the given bookmark

//BOOKMARK

const bookmarkSchema = new mongoose.Schema({
    Id: String,
    Link: String,
    Title: String,
    TimeCreated: String,
    TimeUpdated: String,
    Publisher: String,
    Tags: String
});

const Bookmark = mongoose.model("bookmark", bookmarkSchema);


//TAG

const tagSchema = new mongoose.Schema({
    Id: String,
    Title: String,
    TimeCreated: String,
    TimeUpdated: String
});

const Tag = mongoose.model("tag", tagSchema);


//1. Bookmarking
//      Create a Bookmark
//      Delete a Bookmark


app.route("/bookmark")
    .get((req, res) => {
        Bookmark.find({}, (err, results) => {
            if(err) throw err;
            res.send(results);
        });
    })
    .post((req, res) => {
        const bookmark = new Bookmark(req.body);
        
        bookmark.save(err => {
            if(err) res.send(err);
            res.send("Successfully added a new bookmark.");
        });
    })
    .delete((req, res) => {
        Bookmark.deleteMany({}, err => {
            if(err) res.send(err);
            res.send("succesfully deleted all Bookmark");
        });
    });


//////////////////////////////REQUEST TARGETING SPECIFIC Bookmark///////////////////

app.route("/bookmark/:bookmarkId")
    .get((req, res) => {
        Article.findOne({title: req.params.bookmarkId}, (err, result) => {
            if(err) res.send;
            else if(result) res.send(result);
            else res.send("Not Found");
        })
    })
    .delete((req, res) => {
        Bookmark.deleteOne(
            {Id: req.params.bookmarkId},
            (err) => {
                if(err) console.log(err);
                else console.log('successfully deleted');
            })
    });

//2. Tag
//    Create a Tag
//    Delete a Tag
//    Add a Tag to a Bookmark
//    Remove a Tag from a Certain Bookmark


app.route("/tag")
    .get((req, res) => {
        Tag.find({}, (err, results) => {
            if(err) throw err;
            res.send(results);
        });
    })
    .post((req, res) => {
        const tag = new Tag(req.body);
        
        tag.save(err => {
            if(err) res.send(err);
            res.send("Successfully added a new bookmark.");
        });
    })
    .delete((req, res) => {
        Tag.deleteMany({}, err => {
            if(err) res.send(err);
            res.send("succesfully deleted all Bookmark");
        });
    });


//////////////////////////////REQUEST TARGETING SPECIFIC Bookmark///////////////////

app.route("/tag/:tagId")
    .get((req, res) => {
        Tag.findOne({title: req.params.tagId}, (err, result) => {
            if(err) res.send;
            else if(result) res.send(result);
            else res.send("Not Found");
        })
    })
    .delete((req, res) => {
        Tag.deleteOne(
            {Id: req.params.tagId},
            (err) => {
                if(err) console.log(err);
                else console.log('successfully deleted');
            })
    });



let PORT = process.env.PORT;

if(PORT) PORT = 3000;


app.listen(PORT, function() {
  console.log(`Server started on port ${PORT}`);
});



/* 
    .put((req, res) => {
        Article.update(
            {title: req.params.articleTitle}, 
            {title: req.body.title, content: req.body.content}, 
            {overwrite: true}, 
            (err, result) => {
                if(err) res.send(err);
                res.send("successful");
        });
    })
    .patch((req, res) => {
        Article.update(
            {title: req.params.articleTitle}, 
            {$set: req.body}, 
            (err, result) => {
                if(err) res.send(err);
                res.send("successful");
        });
    }) */