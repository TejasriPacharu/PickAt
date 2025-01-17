const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization.split(" ")[1]
        : null);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    const isRemoved = await userModel.findOne({ token });
    if (isRemoved) {
      return res.status(401).json({ message: "Unauthorized: Token revoked" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Token invalid or expired" });
    }

    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error during authentication" });
  }
};
