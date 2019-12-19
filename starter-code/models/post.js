const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const UserSchema = Schema({
  content: String,
  creatorId: Schema.Types.ObjectId,
  picName: String,
  picPath: String
});

const Post = mongoose.model('Post', UserSchema);

module.exports = Post;