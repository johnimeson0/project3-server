const router = require("express").Router();
const Post = require('../models/Post.model')
const User = require('../models/User.model');

router.post('/create-post', (req, res, next)=> {
    
    const {title, body, authorId, imgUrl, likes, comments} = req.body;

    if (!title) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide a title for your post" });
      }
    if (!body) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide a body for your post" });
      }
    
    Post.create({title, body, authorId, imgUrl, likes, comments})
    .then((newPost) => {
        Post.findByIdAndUpdate(newPost._id, {$push : {authorId: authorId}})
        return User.findByIdAndUpdate(authorId, {$push : {posts: newPost._id}})
    })
        .then((response) => res.json(response))
            .catch((err) => {
                res.json(err)
                console.log(err)
            })
});

router.get('/all-posts', (req, res, next) => {
    Post.find()
    .populate('authorId')
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.json(err))
});

router.get('/post/:postId', (req, res, next) => {
    const {postId} = req.params;

    Post.findById(postId)
    .populate('authorId')
    .then((posts) => res.status(200).json(posts))
    .catch((err)=> res.json(err))
});

router.put('/edit/:postId', (req, res, next) => {
    const {postId} = req.params;
    const {title, body, authorId, imgUrl, likes, comments} = req.body;

    Post.findByIdAndUpdate(postId, {title, body, authorId, imgUrl, likes, comments}, {new: true})
    .then((post) => res.status(201).json(post))
    .catch((err) => res.json(err))
});

router.delete('/post/:postId', (req, res, next) => {
    const {postId} = req.params;

    Post.findByIdAndRemove(postId)
    .then(() => res.status(200).json({message: `The post with id ${postId} has been deleted successfully`}))
    .catch((err) => res.json(err))
})

module.exports = router;