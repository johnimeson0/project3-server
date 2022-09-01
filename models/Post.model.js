const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const postSchema = new Schema ({
    title: String,
    body: Array,
    imgUrl: String,
    authorId: [{type: Schema.Types.ObjectId, ref: 'User'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],

})

const Post = model("Post", postSchema);

module.exports = Post;