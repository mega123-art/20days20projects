import express from "express"
import { initiatePaymentHandler,confirmPaymentHandler } from "../controllers/paymentController.js"
const router=express.Router()
router.post("/initiate", initiatePaymentHandler);
router.post("/confirm", confirmPaymentHandler);
export default router;
