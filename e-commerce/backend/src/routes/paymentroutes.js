import express from "express"
import { handlePaypalPayment,handleStripePayment,paypalSuccess } from "../contollers/paymentcontorller.js"
import { protect } from "../middleware/authmiddleware.js"

const router=express.Router()
router.post("/stripe", protect, handleStripePayment);
router.post("/paypal", protect, handlePaypalPayment);
router.get("/paypal/success", paypalSuccess);

export default router;