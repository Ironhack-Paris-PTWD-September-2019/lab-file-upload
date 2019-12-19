const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
  content: String, //texte du post
  //creatorId: {_id}, //objectID du createur de la publication du post
  picPath: String, //où image est stocké donc url ?
  picName: String //le nom de l image
}, {
  timestramps: true
});

const User = mongoose.model('Post', PostSchema);

module.exports = Post;
