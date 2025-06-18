import express from "express";
import {
  createcategory,
  getcategories,
  updatecategory,
  deleteCategory,
} from "../controllers/categorycontroller";

import { authmiddleware } from "../middleware/authmiddleware";

const router = express.Router();
router.post("/", authmiddleware, createcategory);
router.get("/", authmiddleware, getcategories);
router.put("/:id", authmiddleware, updatecategory);
router.delete("/:id", authmiddleware, deleteCategory);
export default router