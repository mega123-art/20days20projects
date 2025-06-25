import express from "express"
import { createSchedule,getSchedulesByMovie } from "../controllers/scheduleController.js"
const router =express.Router()
router.post("/", createSchedule);
router.get("/:movieId", getSchedulesByMovie);
export default routerw