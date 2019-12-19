const express = require('express');
const router = express.Router();

const passport = require('passport');
const User = require('../models/user.js');
const uploadCloud = require('../config/cloudinary.js'); 

const bcrypt = require("bcryptjs");
const bcryptSalt = 10;



router.get('/signup', (req, res) => {
  res.render('authentication/signup', { message: req.flash('error')});
});

router.post('/signup', uploadCloud.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const photoPath = req.file.url;
  const photoName = req.file.originalname;

  // 1. Check username and password are not empty
  if (username === "" || password === "" || email === "") {
    res.render("authentication/signup", { errorMessage: "Indicate username, password and email" });
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
        photoPath,
        photoName
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

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
