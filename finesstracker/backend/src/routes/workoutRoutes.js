import express from "express";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
  deleteWorkout,
  addWorkoutComment,
  updateExerciseNotes,
  toggleFavoriteWorkout
} from "../controllers/workoutController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createWorkout).get(protect, getWorkouts);
router.route("/:id").put(protect, updateWorkout).delete(protect, deleteWorkout);
router.put("/:id/comment",protect,addWorkoutComment);
router.put("/:id/exercise/:exerciseIndex/notes",updateExerciseNotes);
router.route("/:id/favorite").put(protect, toggleFavoriteWorkout);

export default router;
