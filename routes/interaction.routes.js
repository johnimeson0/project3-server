const router = require("express").Router();
const Post = require('../models/Post.model');
const Car = require('../models/Car.model');
const User = require('../models/User.model');
const Group = require('../models/Group.model');
const Event = require('../models/Event.model');

router.post("/friends-request/:id", async (req, res, next) => {
    console.log("pls work");
    const {id} = req.params;
    const userId = req.payload._id;


    try {
        /* console.log("Current User Id: ", userId) */
        
         await User.findByIdAndUpdate(userId, {
            $push: {
                friendsSent: id
            }
        }, {new: true});
        
        const otherUser = await User.findById(id)

       
        
        if (otherUser.friendsRecieved.includes(userId)) {
            await User.findByIdAndUpdate(otherUser._id, {
                $pull: {
                    friendsRecieved: userId
                },
                $push: {
                    friends: userId
                }
            })
            await User.findByIdAndUpdate(userId, {
                $pull: {
                 friendsRecieved: otherUser._id
                 },
                $push: {
                 friends: otherUser._id
                 }
            })
        } else {
            await User.findByIdAndUpdate(id, {
                $push: {
                    friendsRecieved: userId
                }
            })
        }
        //  && (userId.friends.includes(otherUser)))

        res.json(`Your friend request to the user with the id ${otherUser._id} has been sent successfully`)

    } catch (error) {
        res.json(error)
    }
});

router.post('/comment-create/:id', (req, res, next) => {
    console.log("pls work");
    const {id} = req.params;
    const userId = req.payload._id;



})

module.exports = router;
