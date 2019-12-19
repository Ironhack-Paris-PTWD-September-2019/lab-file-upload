const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const uploadCloud = require('../config/cloudinary.js'); 


// New-post routes - private!!!
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
  
  if (req.user) {
    const newPost = new Post ({
    content,
    creatorId,
    picPath,
    picName
    });

    return newPost;

  }

  newPost.save()
  .then(post => {
    res.redirect('/'); 
  })
  .catch(err => {
    next(err);
  })
});


// Home - list all posts routes
router.get('/index', (req, res, next) => {
  Post.find()
  .then(allThePostsFromDB => {
    res.render('posts/index', {posts : allThePostsFromDB});
  })
  .catch(err => { res.redirect('/')});
});

// Show-post route
router.get('/:id', (req, res, next) => {
  Post.findOne({_id: req.params.id})
  .populate('creatorId')
  .then(post => {
    res.render('posts/show', {post : post});
  })
  .catch(err => { res.redirect('/')});
});




 module.exports = router;