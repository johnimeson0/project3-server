const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const eventSchema = new Schema ({
    title: String,
    body: Array,
    address: String,
    imgUrl: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: Array,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
})

const Event = model("Event", eventSchema);

module.exports = Event;