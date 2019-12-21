const mongoose=require('mongoose'); 
const Schema = mongoose.Schema;

const CommentSchema=new Schema({
  content:String, 
  authorId: {type:Schema.Types.ObjectId, ref:'User'},
  imagePath: String,
  imageName: String, 
},{
  timestamps:true,
});

const PostSchema= new Schema({
  content: String, 
  creatorId: {type:Schema.Types.ObjectId, ref:'User'},
  picPath:String, 
  picName: String,
  comments: [CommentSchema],
},{
  timestamps: true
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;