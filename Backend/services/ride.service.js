const rideModel = require("../models/ride.model");
const mapService = require("../services/maps.service");
const crypto = require('crypto');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }
  const distance = await mapService.getDistanceAndTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 40,
    motorcycle: 10,
  };

  const perKmRate = {
    auto: 4,
    car: 7,
    motorcycle: 2,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    motorcycle: 1,
  };

  const fare = {
    auto:
      Math.round(baseFare.auto +
      (distance.distance.value / 1000) * perKmRate.auto +
      (distance.duration.value / 60) * perMinuteRate.auto),
    car:
      Math.round(baseFare.car +
      (distance.distance.value / 1000) * perKmRate.car +
      (distance.duration.value / 60) * perMinuteRate.car),
    motorcycle:
      Math.round(baseFare.motorcycle +
      (distance.distance.value / 1000) * perKmRate.motorcycle +
      (distance.duration.value / 60) * perMinuteRate.motorcycle),
  };
  return fare;
}

module.exports.getFare = getFare;

function getOTP(num) {
  function generateOTP(num) {
    const otp = crypto
      .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
      .toString();
    return otp;
  }
  return generateOTP(num);
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !destination || !pickup || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFare(pickup, destination);

  const ride = rideModel.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: fare[vehicleType],
  });
  return ride;
};
