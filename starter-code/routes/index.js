const express = require('express');
const router  = express.Router();
const Post = require('../models/post.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.render('index', { 
        posts : posts,
        user: req.user
      });
    })
    .catch((error) => next(error))
  ;
});

module.exports = router;
