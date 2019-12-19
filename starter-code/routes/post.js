const express = require('express');
const router  = express.Router();

const passport = require('passport');
const User = require('../models/post.js');

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;


router.get("/show", (req, res) => {
    if (!req.user) {
      res.redirect('/login'); // not logged-in
      return;
    }
    
    router.post("/new", uploadCloud.single("photo"), (req, res, next) => {
        const content = req.body.content;
        const creatorId = req.body.creatorId;
        const imgName = req.file.originalname;
        const imgPath = req.file.url;
    
        const newPost = new Post({
              content,
              imgName: req.file.originalname,
              imgPath: req.file.url
            });
      
            newPost.save()
              .then(post => {
                // save post in session: req.user
                req.login(post, err => {
                  if (err) return next(err); // Session save went bad
      
                  res.redirect('/');
                });
              })
              .catch(err => next(err))
            ;
              
          })
          .catch(err => next(err));
  });
  



module.exports = router;