const mongoose = require('mongoose');
const User = require('./user.js');
const Schema = mongoose.Schema;
const PostSchema = Schema({
  content: String,
  creatorId: { type : Schema.Types.ObjectId, ref: 'User' },
  picture: String,
  picName: String
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
