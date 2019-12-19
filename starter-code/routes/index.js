const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('posts/show', {message: req.flash('error')});
});

module.exports = router;
