const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true
    },

    email: {
      type: String,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    name: String,
    bio: String,
    imgUrl: String,
    location: String,
    likesSent: Array,
    favoriteCar: String,
    friendsRecieved: [{type: Schema.Types.ObjectId, ref: 'User'}],
    friendsSent: [{type: Schema.Types.ObjectId, ref: 'User'}],
    friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
    cars: [{type: Schema.Types.ObjectId, ref: 'Car'}],
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
    commentsPosted: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    events: [{type: Schema.Types.ObjectId, ref: 'Event'}],

  },
  
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
