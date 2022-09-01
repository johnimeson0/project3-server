const router = require("express").Router();
const Car = require('../models/Car.model');
const User = require('../models/User.model');

router.post('/create', (req, res, next)=> {

    
    
    const {make, model, year, imgUrl, userId} = req.body;

    if (!make) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide the make of your vehicle." });
      }
    if (!model) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide the model of your vehicle." });
      }
    if (!year) {
        return res
          .status(400)
          .json({ errorMessage: "Please provide the year of your vehicle." });
      }
    
    Car.create({make, model, year, imgUrl })
    .then((newCar) => {
        return Car.findByIdAndUpdate(newCar._id, {$push : {ownerId: userId}}, {new: true})

    }) .then((updatedCar) => {
        return User.findByIdAndUpdate(userId, {$push : {cars: updatedCar._id}})
    })
        .then((response) => res.json(response))
            .catch((err) => {
                res.json(err)
                console.log(err)
            })
});

router.get('/all', (req, res, next) => {
    Car.find()
    .populate('ownerId')
    .then((cars) => res.status(200).json(cars))
    .catch((err) => res.json(err))
});

router.get('/:id', (req, res, next) => {
    const {id} = req.params;

    Car.findById(id)
    .populate('ownerId')
    .then((cars) => res.status(200).json(cars))
    .catch((err)=> res.json(err))
});

router.put('/edit/:carId', (req, res, next) => {
    const {carId} = req.params;
    const {make, model, year, ownerId} = req.body;

    Car.findByIdAndUpdate(carId, {make, model, year, ownerId}, {new: true})
    .then((car) => res.status(201).json(car))
    .catch((err) => res.json(err))
});

router.delete('/delete/:carId', (req, res, next) => {
    const {carId} = req.params;

    Car.findByIdAndRemove(carId)
    .then(() => res.status(200).json({message: `The car with id ${carId} has been deleted successfully`}))
    .catch((err) => res.json(err))
})

router.put('', (req, res, next) => {

})

module.exports = router;
