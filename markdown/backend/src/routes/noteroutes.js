import express from "express";
import { upload } from "../middlewares/uploadmiddleware.js";
import {
  savenote,
  rendernote,
  grammarcheck,
} from "../controllers/notecontollers.js";

const router = express.Router();

router.post("/upload", upload.single("file"), savenote);
router.post("/render", rendernote);
router.post("/checkgrammar", grammarcheck);

export default router;
