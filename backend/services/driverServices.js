const driverModel = require("../models/driverModel");

module.exports.createDriver = async ({
  driverName,
  email,
  password,
  numberPlate,
  capacity,
  vehicleType,
  latitude,
  longitude,
}) => {
  if (
    !driverName ||
    !email ||
    !password ||
    !numberPlate ||
    !capacity ||
    !vehicleType ||
    !latitude ||
    !longitude
  ) {
    throw new Error("All fields are required for driver creation");
  }
  const driver = driverModel.create({
    driverName: driverName,
    email: email,
    password: password,
    vehicle: {
      numberPlate,
      capacity,
      vehicleType,
    },
    location: {
      latitude,
      longitude,
    },
  });

  return driver;
};
