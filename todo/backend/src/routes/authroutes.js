import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/authcontroller";
import { authmiddleware } from "../middleware/authmiddleware";
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authmiddleware, getUserProfile);
export default router