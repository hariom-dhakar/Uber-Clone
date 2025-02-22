const express = require("express");
const router = express.Router();
const { body, query } = require('express-validator')
const rideController = require('../controllers/ride.controller')
const { authUser, authCaptain } = require('../middleware/auth.middleware')

router.post('/create',
    authUser,
    body('pickup').isString().isLength({min:3}).withMessage('Enter a Pickup Location'),
    body('destination').isString().isLength({min:3}).withMessage('Enter a Destinaion Location'),
    body('vehicleType').isString().isIn(['auto','motorcycle','car']).withMessage('Enter a Vehicle Type Location'),

    rideController.createRide
)

router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFare
)

router.post('/confirm-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.confirmRide
)

router.get('/start-ride',
    authCaptain,
    query('rideId').isMongoId().withMessage('Invalid ride id'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('Invalid otp'),
    rideController.startRide
)

router.post('/end-ride',
    authCaptain,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)

module.exports = router;