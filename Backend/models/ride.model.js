const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Captain",
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "ongoing", "completed", "cancel"],
    default: "pending",
  },
  fare: {
    type: Number,
    require: true,
  },
  duration: {
    type: Number,
  },
  distance: {
    type: Number,
  },
  paymentId: {
    type: String,
  },
  orderId: {
    type: String,
  },
  signature: {
    type: String,
  },
  otp:{
    type:String,
    select:false,
    required: true
  }
});

module.exports = mongoose.model('ride',rideSchema);