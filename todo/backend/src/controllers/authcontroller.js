import { User } from "../models/usermodel.js";
import jwt from "jsonwebtoken";

// Function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({ username, email, password });

    // Generate JWT token
    const token = generateToken(user._id);
    console.log("User registered:", user);

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login a user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    // const isPasswordValid = await user.comparePassword(password);
    // if (!isPasswordValid) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }

    // Generate JWT token
    const token = generateToken(user._id);
    console.log("User fetched by email:", user);

    res.status(200).json({
      message: "Login successful!",
      user: { id: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get user profile (optional endpoint)
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
