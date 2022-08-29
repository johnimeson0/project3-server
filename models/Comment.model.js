const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const commentSchema = new Schema({
    body: Array,
    imgUrl: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: Array,
    // replies: [{
    //     body: String,
    //     author: {type: Schema.Types.ObjectId, ref: 'User'},

    // }]
},
{
    timestamps: true
})


const Comment = model("Comment", commentSchema);


module.exports = Comment;