const express = require('express');
const router  = express.Router();
const User = require('../models/user'
const Post = require('../models/posts'

/* new, create, show */
router.get('/new', (req, res, next) => {
  res.render('../views/posts/new.hbs');
});

router.post('/new', uploadCloud.single('picture'), (req, res, next) => {
  const content = req.body.content;
  //const picture = req.file.url;
  const picName = req.body.picName;

  console.log(req.file)

  if (content.length <=0) {
    res.render("posts/new", { errorMessage: "please fill in content" });
    return;
  }
  const newPost = new Post ({
    content: content,
    //picture: picture,
    picName: picName,
    creatorId: req.user.id
  });

  newPost.save()
  .then(post => {
    res.render('../views/posts/show')
    })
  .catch(err => next(err))
;

router.get('/create', (req, res, next) => {
  res.render('index', {
    title: 'Express - Generated with IronGenerator',
    user: req.user
  });
});

router.get('/show', (req, res, next) => {
  res.render('index', {
    title: 'Express - Generated with IronGenerator',
    user: req.user
  });
});

module.exports = router;
