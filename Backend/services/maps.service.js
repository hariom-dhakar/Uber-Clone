const axios = require("axios");
const dotenv = require("dotenv");
const captainModel = require("../models/captain.model");
dotenv.config();
const API = process.env.GOOGLE_MAPS_API_KEY;
module.exports.getAddressCoordinate = async (address) => {
  if (!API) {
    throw new Error("Google Maps API key is not configured");
  }
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API}`
    );

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else {
      throw new Error(
        `Failed to get coordinates: Status ${response.data.status}`
      );
    }
  } catch (error) {
    throw new Error("Error getting coordinates: " + error.message);
  }
};

module.exports.getDistanceAndTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
    origin
  )}&destinations=${encodeURIComponent(destination)}&key=${API}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
        throw new Error("No results found");
      }
      return response.data.rows[0].elements[0];
    } else {
      throw new Error("Unable to fetch distance and time");
    }
  } catch (err) {
    throw new Error("Error calculating distance and time: " + err.message);
  }
};

module.exports.getSugesstions = async (input) => {
  if (!input) {
    throw new Error("Address is required");
  }
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
    input
  )}&key=${API}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === "OK") {
      return response.data.predictions
        .map((prediction) => prediction.description)
        .filter((value) => value);
    } else {
      throw new Error("Unable to fetch suggestions");
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {
  const captains = await captainModel.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};
