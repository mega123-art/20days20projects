import express from "express";
import { executeCode, getTaskStatus } from "../controllers/codeController.js";

const router = express.Router();
router.post("/execute", executeCode);
router.get("/status/:taskId", getTaskStatus);
export default router;
