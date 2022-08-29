const mongoose = require('mongoose');
const {Schema, model} = mongoose; 

const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    ownerId: {type: Schema.Types.ObjectId, ref: 'User'},
    likes: Array,
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
})

const Car = model("Car", carSchema);


module.exports = Car;