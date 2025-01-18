const driverModel = require("../models/driverModel");
const driverServices = require("../services/driverServices");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const removedTokenModel = require("../models/tokenRemovedModel");

module.exports.registerDriver = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Request  Body: ", req.body);
  const { driverName, email, password, vehicle, location } = req.body;

  const hashedPassword = await driverModel.hashPassword(password);

  const driver = await driverServices.createDriver({
    driverName: driverName,
    email,
    password: hashedPassword,
    numberPlate: vehicle.numberPlate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
    latitude: location.latitude,
    longitude: location.longitude,
  });

  const token = driver.generateAuthToken();

  res.status(201).json({ token, driver });
};

module.exports.loginDriver = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log("Request  Body: ", req.body);
  const { email, password } = req.body;

  const driver = await driverModel.findOne({ email }).select("+password");

  if (!driver) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await driver.comparePassword(password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = driver.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, driver });
};

module.exports.getDriverProfileDetails = async (req, res, next) => {
  res.status(200).json(req.driver);
};

module.exports.logoutDriver = async(req,res,next) => {
  res.clearCookie("token");

  const token = req.cookies?.token || (req.headers.authorization?.startsWith("Bearer ") &&
  req.headers.authorization.split(" ")[1]);

  await removedTokenModel.create({token});

  res.status(200).json({message:"Logged Out"})
};