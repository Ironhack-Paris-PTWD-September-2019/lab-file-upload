mongoose = require("mongoose");
Schema = mongoose.Schema;

const CommentSchema = new Schema ({
    content: [{ type : Schema.Types.ObjectId, ref: 'Post' }],
    authorId: String,
    imagePath: String,
    imageName: String
    },{
    timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;