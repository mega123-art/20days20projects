import express from "express";
import {
  createRecipe,
  getRecipes,
  getRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
router.get("/", getRecipes);
router.get("/:id", getRecipe);
router.post("/", protect,upload.single("image"),createRecipe);
router.put("/:id", protect, updateRecipe);
router.delete("/:id", protect, deleteRecipe);
export default router;
