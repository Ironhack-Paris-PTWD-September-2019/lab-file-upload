const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const PostSchema = Schema({
    content : String,
    creatorId : { type : Schema.Types.ObjectId, ref: 'User' },
    imgPath : String,
    imgName : String,
    comments : [{
        content : String,
        creatorId : { type : Schema.Types.ObjectId, ref: 'User' },
        imgPath : String,
        imgName : String,
    }],
} , 
{timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;