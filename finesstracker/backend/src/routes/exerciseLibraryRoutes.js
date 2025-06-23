import express from "express";
import {
  getAllExercises,
  addExercise,
  updateExercise,
  deleteExercise,
} from "../controllers/exerciseLibrary.js";
import { protect } from "../middlewares/authMiddleware.js";
const router = express.Router();
router.route("/").get(protect, getAllExercises).post(protect, addExercise);
router
  .route("/:id")
  .put(protect, updateExercise)
  .delete(protect, deleteExercise);
export default router;
