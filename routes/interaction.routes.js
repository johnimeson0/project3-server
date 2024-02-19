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
        const myUser = await User.findById(userId)
        const otherUser = await User.findById(id)
         await User.findByIdAndUpdate(userId, {
            $push: {
                friendsSent: otherUser._id
            }
        }, {new: true});
        

       
        
        if (otherUser.friendsRecieved.includes(myUser._id)) {
            await User.findByIdAndUpdate(otherUser._id, {
                $pull: {
                    friendsRecieved: myUser._id
                },
                $push: {
                    friends: myUser._id
                }
            })
            await User.findByIdAndUpdate(myUser._id, {
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
                    friendsRecieved: myUser._id
                }
            })
        }
        //  && (userId.friends.includes(otherUser)))

        res.json(`Your friend request to the user with the id ${otherUser._id} has been sent successfully`)

    } catch (error) {
        res.json(error)
    }
});

router.post('/like/:id', async (req, res, next) => {
    console.log("pls work");
    const {id} = req.params;
    const userId = req.payload._id;

    try {
        /* console.log("Current User Id: ", userId) */
        const myUser = await User.findById(userId)
        const post = await Post.findById(id)
         await Post.findByIdAndUpdate(post._id, {
            $push: {
                likes: myUser._id
            }
        }, {new: true});
        res.json(`Your like to the post with id ${post._id} has been sent successfully`);
    } catch (error) {
    res.json(error)
    }
});

module.exports = router;
