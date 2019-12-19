const express = require('express');
const router  = express.Router();

const Post = require('../models/post.js');

const uploadCloud = require('../config/cloudinary.js'); 

router.get('/show', (req, res, next) => {
  Post.find()
    .then((post) => {
      res.render('show', { post });
    })
    .catch((error) => next(error))
  ;
});

router.get('/post/add', (req, res, next) => {
  res.render('post');
});

router.post('/post/add', uploadCloud.single('photo'), (req, res, next) => {
  const content = req.body.content;
  //const creatorId =
  const picPath = req.file.url;
  const picName = req.file.originalname;
  
  const newPost = new Post({content, creatorId, picPath, picName});
  
  newPost.save()
    .then(post => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    })
  ;
});



module.exports = router;
