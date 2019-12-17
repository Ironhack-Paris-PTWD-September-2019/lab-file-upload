const express = require('express');
const router  = express.Router();

const passport = require('passport');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const uploadCloud = require('../config/cloudinary.js'); 


router.get('/posts/new', (req,res,next)=>{
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }

  res.render("posts/new");
});

router.post('/posts',uploadCloud.single("postpic"), (req,res,next)=>{
  if(!req.user){
    next(err);
    return;
  }

  const creatorId=req.user.id;
  const content=req.body.content;
  const picPath=req.file.url;
  const picName= req.file.originalname;

  const newPost= new Post ({
  content,
  creatorId,
  picPath, 
  picName
  });

  newPost.save()
    .then(post=>{
      res.render('posts/show', {post});
    })
    .catch(err=>{
      console.error(err);
      next(err);
    });

});


router.get('/posts/:id', (req,res,next)=>{
  const postId= req.params.id;

  Post.findById({_id:postId}).then(post=>{
    res.render("posts/show", {post});
  }).catch(err=>{
    console.error(err);
    next(err);
  })

  
});

module.exports=router;