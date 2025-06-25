import express from "express";
import {
  createTheater,
  getTheaters,
  addScreenToTheater,
} from "../controllers/theaterController.js";
const router = express.Router();

router.post("/", createTheater);
router.get("/", getTheaters);
router.post("/:theaterId/screens", addScreenToTheater);
export default router;
