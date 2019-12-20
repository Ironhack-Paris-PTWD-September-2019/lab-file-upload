const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const uploadCloud = require('../config/cloudinary.js'); 


// New routes - New post is private!!!
router.get("/new", (req, res, next) => {
  if (!req.user) {
    res.redirect('authentication/login'); // not logged-in
    return;
  }
  res.render('posts/new', { user: req.user });
});

router.post("/", uploadCloud.single('photo'), (req, res, next) => {
  const content = req.body.content;
  const creatorId = req.body.creatorId;
  const picPath = req.file.url;
  const picName = req.file.originalname;
  
  const post = new Post ({
    content,
    creatorId,
    picPath,
    picName
  });

  post.save()
    .then(post => {
      console.log("Post created");
      res.redirect('posts/index'); 
    })
    .catch(err => {
      res.render('posts/index');
  });
});


// Index route - list all posts 
router.get('/index', (req, res, next) => {
  Post.find()
  .then(allThePostsFromDB => {
    res.render('posts/index', {posts : allThePostsFromDB});
  })
  .catch(err => { res.redirect('/')});
});


// Show route - show one selected post
router.get('/:id', (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .populate('creatorId')
  .then(post => {
    res.render('posts/show', {post : post});
  })
  .catch(err => { res.redirect('/')});
});




 module.exports = router;