 const mongoose = require('mongoose');
 const {Schema, model} = mongoose; 

 const groupSchema = new Schema ({
    groupPosts: {
            groupPostAuthor: {type: Schema.Types.ObjectId, ref: 'User'},
            title: String,
            body: String,
            likes: Array,
            comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
        },
    groupCreator: {type: Schema.Types.ObjectId, ref: 'User'},
    groupMembers: [{type: Schema.Types.ObjectId, ref: 'User'}],
    groupName: {
        type: String,
        unique: true,
        required: true
    },
        
    groupDescription: String,
    groupPass: String,
    groupImgUrl: String

 });

const Group = model("Group", groupSchema);

 module.exports = Group;