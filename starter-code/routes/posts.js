const express = require('express');
const router  = express.Router();
const Post = require('../models/post')
const uploadCloud = require('../cloudinary.js');

/* new, create, show */
router.get('/new', (req, res, next) => {
  res.render('../views/posts/new.hbs');
});

router.get('/show', (req, res, next) => {
  res.render('../views/posts/show', {
    title: 'Post',
    user: req.user
  });
});

router.post('/new', uploadCloud.single('picture'), (req, res, next) => {
  const content = req.body.content;
  const picture = req.file.url;
  const picName = req.body.picName;

  console.log(req.file)

  if (content.length <=0) {
    res.render("posts/new", { errorMessage: "please fill in content" });
    return;
  }
  const newPost = new Post ({
    content: content,
    picture: picture,
    picName: picName,
    creatorId: req.user.id
  });

  newPost.save()
  .then(
    res.redirect('/posts/show')
    )
  .catch(err => next(err));

  });



module.exports = router;
