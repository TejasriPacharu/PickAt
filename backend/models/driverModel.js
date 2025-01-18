const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const driverSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
    minLength: [5, "Driver name should be 5 characters long"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  isAvailableForRides: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    numberPlate: {
      type: String,
      required: true,
      minLength: 5,
    },
    capacity: {
      type: Number,
      required: true,
      min: 1,
    },
    vehicleType: {
      type: String,
      enum: ["bike", "cab", "auto"],
    },
  },

  location: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
});

driverSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "24h",
    }
  );
  return token;
};

driverSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

driverSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const driverModel = mongoose.model("Driver", driverSchema);

module.exports = driverModel;
