const router = require("express").Router();
const Car = require('../models/Car.model');
const User = require('../models/User.model');

router.post('/create', (req, res, next)=> {
    
    const {make, model, year, ownerId} = req.body;

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
    
    Car.create({make, model, year, ownerId})
    .then((newCar) => {
        Car.findByIdAndUpdate(newCar._id, {$push : {ownerId: ownerId}})
        return User.findByIdAndUpdate(ownerId, {$push : {cars: newCar._id}})
    })
        .then((response) => res.json(response))
            .catch((err) => {
                res.json(err)
                console.log(err)
            })
});

router.get('/', (req, res, next) => {
    Car.find()
    .populate('ownerId')
    .then((cars) => res.status(200).json(cars))
    .catch((err) => res.json(err))
});

router.get('/:carId', (req, res, next) => {
    const {carId} = req.params;

    Car.findById(carId)
    .populate('ownerId')
    .then((cars) => res.status(200).json(cars))
    .catch((err)=> res.json(err))
});

router.put('/:carId', (req, res, next) => {
    const {carId} = req.params;
    const {make, model, year, ownerId} = req.body;

    Car.findByIdAndUpdate(carId, {make, model, year, ownerId}, {new: true})
    .then((car) => res.status(201).json(car))
    .catch((err) => res.json(err))
});

router.delete('/:carId', (req, res, next) => {
    const {carId} = req.params;

    Car.findByIdAndRemove(carId)
    .then(() => res.status(200).json({message: `The car with id ${carId} has been deleted successfully`}))
    .catch((err) => res.json(err))
})

router.put('', (req, res, next) => {

})

module.exports = router;
