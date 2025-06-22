import express from "express";
import {
  placeOrder,
  getOrderById,
  getUserOrders,
  markOrderAsDelivered,
  requestRefund,
  cancelOrder,
  handleRefund
} from "../contollers/ordercontroller.js";
import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();
router.post(".", protect, placeOrder);
router.get("/", protect, getUserOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id", protect, markOrderAsDelivered);
router.patch("/:id", protect, cancelOrder);
router.post('/:id/refund',protect,requestRefund)
router.put('/:id/refund',protect,handleRefund)
export default router;

