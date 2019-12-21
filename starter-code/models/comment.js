const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const CommentSchema = Schema({
    content : String,
    creatorId : { type : Schema.Types.ObjectId, ref: 'User' },
    imgPath : String,
    imgName : String,
} , 
{timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;