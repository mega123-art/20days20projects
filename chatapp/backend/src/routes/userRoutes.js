import express from "express"
import { authenticate } from "../middlewares/authmiddleware.js"
import { getOnlineUsers } from "../controllers/userController.js"

const router = express.Router();

router.get("/online", authenticate, getOnlineUsers);

export default router;