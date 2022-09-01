const router = require("express").Router();
const Event = require('../models/Event.model')
const User = require('../models/User.model');

router.post('/create-event', (req, res, next)=> {
    
    const {title, body, address, authorId, imgUrl, likes, comments} = req.body;

    if (!title) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide a title for your event" });
      }
    if (!body) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide a body for your event" });
      }
    
    Event.create({title, body, address, authorId, imgUrl, likes, comments})
    .then((newEvent) => {
        Event.findByIdAndUpdate(newEvent._id, {$push : {authorId: authorId}})
        return User.findByIdAndUpdate(authorId, {$push : {Events: newEvent._id}})
    })
        .then((response) => res.json(response))
            .catch((err) => {
                res.json(err)
                console.log(err)
            })
});

router.get('/all', (req, res, next) => {
    Event.find()
    .populate('authorId')
    .then((events) => res.status(200).json(events))
    .catch((err) => res.json(err))
});

router.get('/:id', (req, res, next) => {
    const {id} = req.params;

    Event.findById(id)
    .populate('authorId')
    .then((Events) => res.status(200).json(Events))
    .catch((err)=> res.json(err))
});

router.put('/event/:eventId', (req, res, next) => {
    const {eventId} = req.params;
    const {title, body, address, authorId, imgUrl, likes, comments} = req.body;

    Event.findByIdAndUpdate(eventId, {title, body, address, authorId, imgUrl, likes, comments}, {new: true})
    .then((Event) => res.status(201).json(Event))
    .catch((err) => res.json(err))
});

router.delete('/event/:eventId', (req, res, next) => {
    const {eventId} = req.params;

    Event.findByIdAndRemove(eventId)
    .then(() => res.status(200).json({message: `The Event with id ${eventId} has been deleted successfully`}))
    .catch((err) => res.json(err))
})

module.exports = router;