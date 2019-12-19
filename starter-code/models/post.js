const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    content: String,
    creatorId: [{ type : Schema.Types.ObjectId, ref: 'User' }], //ou String ?
    picPath: String,
    picName: String
    },{
    timestamps: true
  });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;