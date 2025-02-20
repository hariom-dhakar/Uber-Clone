const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectedTodb = require("./database/db");
const userRoutes = require("./routes/user.routes");
const captainRoutes = require("./routes/captain.routes");
const mapsRoutes = require("./routes/maps.routes");
const cookies = require("cookie-parser");
const rideRoutes = require("./routes/ride.routes");

connectedTodb();

app.use(cookies());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/captains", captainRoutes);
app.use("/maps", mapsRoutes);
app.use("/rides", rideRoutes);

app.get("/", (req, res) => {
  res.send("Hello");
});

module.exports = app;
