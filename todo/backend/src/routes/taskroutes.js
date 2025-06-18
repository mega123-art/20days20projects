import express from "express";
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} from "../controllers/taskcontroller";
import { authmiddleware } from "../middleware/authmiddleware";

export const router = express.Router();

router.post("/", authmiddleware, createTask);

router.get("/", authmiddleware, getTasks);
router.put("/:id",authmiddleware,updateTask)
router.delete("/:id",authmiddleware,deleteTask)


