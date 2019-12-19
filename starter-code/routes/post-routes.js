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
  let picPath=req.file && req.file.url || "";
  let picName= req.file && req.file.originalname || "";


  const newPost= new Post ({
  content,
  creatorId,
  picPath, 
  picName
  });

  newPost.save()
    .then(post=>{
      //filling user name in Post 
      post.creatorId=req.user; 
      res.render('posts/show', {post:post});
    })
    .catch(err=>{
      console.error(err);
      next(err);
    });

});

router.get('/posts', (req,res,next)=>{
  res.redirect('/');
});

router.get('/posts/:id', (req,res,next)=>{
  const postId= req.params.id;

  Post.findById({_id:postId}).populate('creatorId').then(post=>{

    res.render("posts/show", {post});
  }).catch(err=>{
    console.error(err);
    next(err);
  })

  
});

router.get('/posts/:id/comments', (req,res,next)=>{
  const postId= req.params.id;

  Post.findById({_id:postId}).then(post=>{
    res.render("posts/comment", {post});
  }).catch(err=>{
    console.error(err);
    next(err);
  })

  
});

router.post('/posts/:id/comments', uploadCloud.single("commentImg"), (req,res,next)=>{
  if(!req.user){
    res.redirect('/login');
    return;
  }

  const postId=req.params.id;
  console.log(postId);
  const authorId=req.user.id;
  const content=req.body.contentComment;
  let imagePath=req.file && req.file.url || "";
  let imageName=req.file && req.file.originalname || "";
 

  Post.findById({_id:postId}).populate('creatorId').then(post=>{
    console.log("post found");
    
    post.comments=post.comments.concat([{
      content:content,
      authorId:authorId,
      imagePath:imagePath,
      imageName:imageName
    }]); 
    post.save().then(post=>{
      console.log(post,"saved");
      res.render("posts/show", {post})
    }).catch(err=>{
      console.error(err, "Error while saving post comment");
      next(err);
    });

  }).catch(err=>{
    console.error(err);
    next(err);
  })

});

module.exports=router;