import express from "express"
import { getWorkoutReport } from "../controllers/reportController.js"
import { protect } from "../middlewares/authMiddleware.js"

const router = express.Router();

router.get("/", protect, getWorkoutReport);

export default router;
