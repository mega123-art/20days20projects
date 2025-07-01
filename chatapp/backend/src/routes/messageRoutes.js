import express from "express";
import { authenticate } from "../middlewares/authmiddleware.js";
import { getMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get("/history", authenticate, getMessages);

export default router;
