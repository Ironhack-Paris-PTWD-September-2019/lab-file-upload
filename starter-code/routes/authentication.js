const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user.js');
const Post = require('../models/post.js');
const Comment = require('../models/comment.js');
const uploadCloud = require('../config/cloudinary.js');

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post("/signup", uploadCloud.single("userphoto"),(req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;

  // 1. Check username and password are not empty
  if (username === "" || password === "") {
    res.render("authentication/signup", { errorMessage: "Indicate username and password" });
    return;
  }

  User.findOne({ username })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("authentication/signup", { errorMessage: "The username already exists" });
        return;
      }

      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        username,
        password: hashPass,
        email,
        imgPath,
        imgName
      });

      newUser.save()
        .then(user => {
          // save user in session: req.user
          req.login(user, err => {
            if (err) return next(err); // Session save went bad

            res.redirect('/'); // All good, we are now logged in and `req.user` is now set
          });
        })
        .catch(err => next(err))
      ;
        
    })
    .catch(err => next(err))
  ;
});

router.get('/login', (req, res) => {
  res.render('authentication/login', { message: req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
  successRedirect : '/',
  failureRedirect : '/login',
  failureFlash : true
}));

const ensureLogin = require("connect-ensure-login");


router.get("/posts/new", ensureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.render("posts/new", { user: req.user });
});

router.post('/posts/new', uploadCloud.single('photo'), (req, res, next) => {
  const { content} = req.body;
  const picPath = req.file.url;
  const picName = req.file.originalname;
  const creatorId = req.user._id;
  const comment=[];
  
  const newPost = new Post({content, creatorId, picPath, picName,comment});

  newPost.save()
    .then(post => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    })
  ;
});

router.get("/posts", ensureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/posts/show/:id/comment", ensureLogin.ensureLoggedIn('/login'), (req, res) => {
  res.render("posts/posts", { user: req.user });
});

router.post('/posts/show/:id/comment', uploadCloud.single('commentPhoto'), (req, res, next) => {
  const content = req.body.content;  
  const imagePath = req.file && req.file.url; //execute .url si req.file existe
  const imageName = req.file && req.file.originalname;
  const authorId = req.user._id;
  
  const newComment = new Comment({content, authorId, imagePath, imageName});

  newComment.save()
    .then(comment => {
      Post.findById(req.params.id)
        .then(post => {
          post.comment.push(comment._id); //syntax mongoose à mettre
          console.log('post.comment',post.comment);
          res.redirect(`/posts/show/${req.params.id}`);
        })
        .catch(err => next(err))
    })
    .catch(error => {
      next(error);
    });
});


router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
