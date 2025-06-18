import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/usermodel.js";

export const authmiddleware = async (req, res) => {
  try {
    const token = req.headers.authorization?.split("")[1];
    if (!token) {
      return res.status(401).json("no token provided.....");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId=decoded.userId
    const user=await User.findById(req.userId)
    if(!user){
        return res.status(404).json("user not found")
    }
    req.user=user
    next()
  } catch (error) {
    res.status(401).json("invalid token")
  }
};
