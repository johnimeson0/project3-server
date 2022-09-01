const router = require("express").Router();
const User = require('../models/User.model')
const fileUploader = require("../config/cloudinary.config")

router.get("/your-profile", (req, res, next) => {
    const user = req.payload._id
    .populate('cars', 'posts', 'groups', 'events')
    .then((user) => res.status(200).json(user))
    .catch((err)=> res.json(err))
});

router.get("/view-profile/:id", (req, res, next) => {
    const {id} = req.params
    User.findById(id)
    .populate('cars posts events')
    .then((users) => res.status(200).json(users))
    .catch((err)=> res.json(err))
    })



/* connect the profile page with the edit page */
router.get("/edit-profile", (req, res, next) => {
    const user = req.payload._id
    
});

/* edit form */
router.put("/edit-profile/:userId", (req, res, next) => {
    const {userId} = req.params
    const {name, bio, location, imgUrl, cars, posts, events, favoriteCar} = req.body
    
    // let image;

    // if(req.file){
    //     image = req.file.path
    // } else {
    //     image = previousUrl
    // }
    User.findByIdAndUpdate(userId,
        {
            name,
            bio,
            location,
            imgUrl,
            cars,
            posts,
            events,
            favoriteCar

        }
        // , {new:true}
    ) 
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err))
});

/* take the created profile and connect to the profile page */
router.get("/create-profile", (req, res, next) => {
    const user = req.payload._id
        // res.render("profile/create-profile", user);
});


/* show the first create page */
router.post("/create-profile", fileUploader.single("imgUrl"), (req, res, next) => {
    const user = req.payload._id
    console.log(user)
    User.findByIdAndUpdate(user,
        {
            name: req.body.name,
            bio: req.body.bio,
            location: req.body.location,
            imgUrl: req.body.imgUrl,
            cars: req.body.cars,
            posts: req.body.posts,
            events: req.body.events,
        }
        , {new:true}
    ) .then((user) => {
        req.session.user = user
        res.redirect("/home")
    })
});

/* delete function */
router.get("/delete-profile", (req, res, next) => {
    const user = req.payload._id
    User.findByIdAndDelete(user)
    .then((user) => {
        req.payload.destroy()
        res.redirect('/signup')
    })
})

module.exports = router;