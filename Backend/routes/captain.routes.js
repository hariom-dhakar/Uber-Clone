const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { authCaptain } = require("../middleware/auth.middleware");
const captainController = require("../controllers/captain.controller");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 char long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 char long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Color must be at least 3 char long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plat must be at least 3 char long"),
      body("vehicle.vehicleType")
      .isIn(["auto", "car", "motorcycle"])
      .withMessage("Invalid vehicle type"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Capacity must be at least 1"),
  ],
  captainController.registerCaptain
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 char long"),
  ],
  captainController.loginCaptain
);

router.get("/profile", authCaptain, captainController.getCaptainProfile);

router.get("/logout", authCaptain, captainController.logoutCaptain);

module.exports = router;
