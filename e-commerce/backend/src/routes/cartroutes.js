import express from "express";
import {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} from "../contollers/cartcontoller.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();
router.get("/", protect, getCart);

router.post("/", protect, addItemToCart);

router.put("/", protect, updateCartItem);
router.delete("/", protect, removeItemFromCart);
