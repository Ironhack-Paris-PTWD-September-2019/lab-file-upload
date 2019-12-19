const express = require('express');
const router  = express.Router();
const Post = require('../models/post.js');

/* GET home page. */
router.get('/', (req, res, next) => {
      res.render('index', { 
        user: req.user
      });
});

router.get('/posts', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.render('posts/posts', { 
        posts : posts,
      });
    })
    .catch((error) => next(error))
  ;
});

router.get('/posts/show/:id',function(req,res,next){
  Post.findById({_id:req.params.id})
  .populate('creatorId')
  .populate('comment')
  .then(function(post){
    console.log("post",post)
    res.render("posts/show", {
      post: post
    })
  }).catch(err => console.error(err))
  
})

module.exports = router;
