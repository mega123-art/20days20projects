import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getRecipesByChef,
} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";
const router=express.Router()
router.get("/:id",protect, getUserProfile); 
router.put("/:id",protect, updateUserProfile); 
router.get("/:id/recipes", getRecipesByChef); 

export default router;