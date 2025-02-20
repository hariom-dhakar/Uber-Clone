const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");
module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  const { address } = req.query;
  if (!address) {
    return res.status(400).json({ message: "Address parameter is required" });
  }
  try {
    const coordinates = await mapService.getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Internal server error" });
  }
};
module.exports.getDistance = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    if (!origin || !destination) {
      return res.status(400).json({ message: "Address parameter is required" });
    }
    const distance = await mapService.getDistanceAndTime(
      origin,
      destination
    );
    res.status(200).json(distance);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Internal server error" });
}
};

module.exports.getSuggestion = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }        
        const {input} = req.query
        if(!input){
            return res.status(400).json({error:'Address is required'})
        }
        const pred = await mapService.getSugesstions(input);
        res.status(200).json(pred);
    }catch(err){
        res.status(404).json({ message: "Internal server error" });
    }
}
