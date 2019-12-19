const express = require('express');
const router  = express.Router();

const User = require('../models/user.js');

const uploadCloud = require('../config/cloudinary.js'); 

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Express - Generated with IronGenerator',
    user: req.user
  });
});

router.post('/authentification/signup', uploadCloud.single('photo'), (req, res, next) => {
  const username = req.body.username;
  const imgPath = req.file.url;
  const imgName = req.file.originalname;
  const email = req.body.email;
  const password = req.body.password;

  const newUser = new User({username, imgPath, imgName, email, password});
  
  newUser.save()
    .then(user => {
      res.redirect('/');
    })
    .catch(error => {
      next(error);
    })
  ;
});

// const Post = require('../models/post.js');

// router.get('/show', (req, res, next) => {
//   Post.find()
//     .then((post) => {
//       res.render('show', { post });
//     })
//     .catch((error) => next(error))
//   ;
// });

// router.get('/post/add', (req, res, next) => {
//   res.render('post');
// });

// router.post('/post/add', uploadCloud.single('photo'), (req, res, next) => {
//   const content = req.body.content;
//   //const creatorId =
//   const picPath = req.file.url;
//   const picName = req.file.originalname;
  
//   const newPost = new Post({content, creatorId, picPath, picName});
  
//   newPost.save()
//     .then(post => {
//       res.redirect('/');
//     })
//     .catch(error => {
//       next(error);
//     })
//   ;
// });



module.exports = router;

