const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require('./user.js');

const PostSchema = Schema({
  content: String,
  creatorId: [ { type : Schema.Types.ObjectId, ref: 'User' } ],
  picture: String,
  picName: String
});

const Post = mongoose.model('User', PostSchema);

module.exports = User;
