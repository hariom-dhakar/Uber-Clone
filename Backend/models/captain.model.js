const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minLength: [3, "First name must ne at least 3 char long"],
    },
    lastname: {
      type: String,
      minLength: [3, "First name must ne at least 3 char long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      require: true,
      minLength: [3, "color must be at least 3 char long"],
    },
    plate: {
      type: String,
      required: true,
      minLength: [3, "Number plat must be 3 char long"],
    },
    capacity: {
      type: Number,
      require: true,
      min: [1, "capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["auto", "car", "motorcycle"],
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.methods.comparePassword = async function (password) {
  const captain = await this.model("Captain").findById(this._id).select("+password");
  return await bcrypt.compare(password, captain.password);
};

captainSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("Captain", captainSchema);

module.exports = captainModel;
