const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

module.exports.authUser = async (req, res, next) => {
  try {
    
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith("Bearer ") &&
        req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token missing" });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    req.user = user;

    
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res
      .status(401)
      .json({ message: "Unauthorized: Token invalid or expired" });
  }
};
