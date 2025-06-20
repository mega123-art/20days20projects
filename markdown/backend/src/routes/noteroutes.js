import express from "express";
import { upload } from "../middlewares/uploadmiddleware.js";
import {
  savenote,
  rendernote,
  grammarcheck,
  getnotebyid,getnotes,deleteNote,updateNote
} from "../controllers/notecontollers.js";

const router = express.Router();

router.post("/upload", upload.single("file"), savenote);
router.post("/render", rendernote);
router.post("/checkgrammar", grammarcheck);
router.get("/",getnotes)
router.get("/:id",getnotebyid)
router.get("/:id",updateNote)
router.delete("/:id",deleteNote)

export default router;
