const express = require("express");
const router = express.Router();
const { getCoordinates, getDistance,getSuggestion} = require("../controllers/getCoodrinates.controller");
// const { authCaptain } = require("../middleware/auth.middleware");
const { authUser } = require("../middleware/auth.middleware");
const { query } = require("express-validator");
router.get("/get-coordinate",
     query("address").isString().isLength({min: 3}),
     authUser,
     getCoordinates);

router.get('/get-distance-time',
     query("origin").isString().isLength({min: 3}),
     query("destination").isString().isLength({min: 3}),
     authUser,
     getDistance);     

router.get('/get-suggestions',
    query('input').isString().isLength({min:3}),
    authUser,
    getSuggestion
)
module.exports = router;
