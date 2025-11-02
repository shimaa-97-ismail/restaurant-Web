import jwt from "jsonwebtoken";
import AppError from "../config/appError.js";
import User from "../models/user.js";

export default async function authMiddelware (req, res, next) {
  if (!req.headers || !req.headers.authorization) {
    return next(new AppError("Authorization header is missing", 401));
  }
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  try {
  
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
    const user = await User.findById(decoded.id).select("-password");
    console.log(user,"verity");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
