const { validationResult } = require('express-validator')
const rideService = require('../services/ride.service')
const mapService = require('../services/maps.service')
const {sendMessageToSocketId} = require('../socket')
const rideModel = require('../models/ride.model')
module.exports.createRide = async(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {pickup,destination,vehicleType} = req.body;
    const user = req.user._id;
    try{
        const ride = await rideService.createRide({user,pickup,destination,vehicleType});
        res.status(201).json(ride);
        const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
        const captainsInTheRadius = await mapService.getCaptainsInTheRadius(pickupCoordinates.lat,pickupCoordinates.lng,2)
        ride.otp="";    
        const rideData = await rideModel.findOne({_id: ride._id}).populate('user');
        captainsInTheRadius.map(captain=>{
            sendMessageToSocketId(captain.socketId,{
                event:'new-ride',
                data: rideData
            })
        })
    }catch(err){
        return res.status(400).json({message:err.message})
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

