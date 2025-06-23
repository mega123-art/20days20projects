import express from "express";
import {
  createWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workoutController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createWorkout).get(protect, getWorkouts);
router.route("/:id").put(protect, updateWorkout).delete(protect, deleteWorkout);

export default router;
