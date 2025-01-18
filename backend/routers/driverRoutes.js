const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const driverController = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("driverName")
      .isLength({ min: 5 })
      .withMessage("The Driver name should be minimum 5 characters"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("The password should be minimum 6 letters"),
    body("vehicle.numberPlate")
      .isLength({ min: 5 })
      .withMessage("Vehicle Number plate should have atleast 5 characters"),
    body("vehicle.capacity")
      .isLength({ min: 1 })
      .withMessage("Capacity must be atleast 1"),
    body("vehicle.vehicleType")
      .isIn(["bike", "cab", "auto"])
      .withMessage("Invalid vehicle type"),
    body("location.latitude"),
    body("location.longitude"),
  ],
  driverController.registerDriver
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be atleast 6 characters long"),
  ],
  driverController.loginDriver
);

router.get(
  "/profile",
  authMiddleware.authDriver,
  driverController.getDriverProfileDetails
);

router.get("/logout", authMiddleware.authDriver, driverController.logoutDriver)

module.exports = router;
