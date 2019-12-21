const express = require('express');
const router  = express.Router();
const uploadCloud = require('../config/cloudinary.js');
const Post = require('../models/post.js')
const Comment = require('../models/comment.js')

router.get('/new' , (req , res , next) => {
  res.render('posts/new')
})

router.post('/new' , uploadCloud.single('photo') , (req , res , next) => {
    const user = req.user
    const content = req.body.content;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    Post.create({
        creatorId : user.id,
        content : content,
        imgPath : imgPath,
        imgName : imgName
    })
    .then(post => {
        res.redirect('/')
    })
    .catch(err => next(err))
})

router.post('/new' , uploadCloud.single('photo') , (req , res , next) => {
    const user = req.user
    const content = req.body.content;
    const imgPath = req.file.url;
    const imgName = req.file.originalname;

    Post.create({
        creatorId : user.id,
        content : content,
        imgPath : imgPath,
        imgName : imgName
    })
    .then(post => {
        res.redirect('/')
    })
    .catch(err => next(err))
})

router.get('/:id' , (req , res , next) => {
    Post.findById(req.params.id)
    .populate('creatorId')
    .then(post => {
        res.render('posts/show' , {post})
    })
    .catch(err => {next(err)})
})

module.exports = router;