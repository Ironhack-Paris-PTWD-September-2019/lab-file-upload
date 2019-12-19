const express = require('express');
const router = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/post');

router.get('/new', (req,res, next)=>{
    res.render('posts/new')
})

router.post('/',uploadCloud.single('photo'),(req, res, next)=>{
  const content = req.body.content;
  const authorId = req.body.authorId;
  const picPath = req.file.url;
  const picName = req.file.originalname;  
  
  const newPost = new Post({
    content,
    authorId,
    picPath, 
    picName
  });

  newPost.save()
    .then(post => {
        res.redirect('/show'); // All good, we are now logged in and `req.user` is now set
     
    })
    .catch(err => next(err))
  ;
    
})
route.get('/show',(req,res,next)=>{
    res.render('posts/show')
})

module.exports = router;