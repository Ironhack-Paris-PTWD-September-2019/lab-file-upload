const mongoose = require('mongoose');
const Post = require('../models/post.js');
const User = require('../models/user.js');

mongoose.connect('mongodb://localhost:27017/tumblr-lab-development', {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
  .then(() => {
    console.log('🔌 Connected to Mongo!');
  })
  .catch(err => console.error('Error connecting to mongo', err))
;

//
// Posts
//

var datas = [
  {
    content: 'Marre de la grève',
    creatorId: '5dfb538170ba7c1932e7c9f3',
    picPath: 'http://res.cloudinary.com/dkwcrwudm/image/upload/v1576751998/lab-file-upload/cat.jpg.jpg',
    picName: 'cat.jpg'
  },
  {
    content: 'Bientôt les vacances !!!',
    creatorId: '5dfb93f4e4ea51042a0a529c',
    picPath: 'http://res.cloudinary.com/dkwcrwudm/image/upload/v1576768497/lab-file-upload/jdo.jpeg.jpg',
    picName: 'jdo.jpeg'
  }
];

const p1 = Post.create(datas);
p1.then(posts => console.log(`${posts.length} posts created!`))

Promise.all([p1])
  .then(() => mongoose.disconnect())
  .catch(err => console.error(err))
;