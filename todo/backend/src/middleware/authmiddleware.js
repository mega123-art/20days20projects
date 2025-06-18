import jwt from "jsonwebtoken";
import { User } from "../models/usermodel.js";
import mongoose from "mongoose";

export const authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token payload:", decoded);

    // Use consistent payload key (userId)
    const userId = decoded.userId || decoded.id;
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    console.log("User fetched by ID:", user);

    if (!user) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error in middleware:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
};
