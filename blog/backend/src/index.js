import dotenv from "dotenv";
import express from "express";
import connectdb from "./db.js";
import { Blog } from "./model.js";
import mongoose from "mongoose";
import cors from "cors"
export const app = express();

const PORT = 3000;
dotenv.config();
app.use(
  cors({
    origin: "http://127.0.0.1:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);
// Middleware to parse JSON
app.use(express.json());
connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort("date");
    res.json(blogs);
  } catch (error) {
    res.status(500).send("nahi milre articles...");
  }
});

app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("nhi milra blog vo wala");
    res.json(blog);
  } catch (error) {
    res.status(500).send("kuch to galat hogya bhai dhundhte hue");
  }
});

app.post("/blogs", async (req, res) => {
  try {
    const newblog = new Blog({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
    });

    const saved = await newblog.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).send("nhi bana blog...");
  }
});

app.delete("/blogs/:id", async (req, res) => {
  try {
    console.log("Received ID:", req.params.id);
    const deletedblog = await Blog.findByIdAndDelete(
      new mongoose.Types.ObjectId(req.params.id)
    );
    
    if (!deletedblog) return res.status(404).send("blog nhi mila wo wala...");
  } catch (error) {
    console.error("Error during deletion:", error);
    res.status(500).send("kuch to bhi hogya yaar nhi paya delete...");
  }
});

app.put("/blogs/:id", async (req, res) => {
  try {
    const updatedblog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
      },
      { new: true }
    );
    if (!updatedblog) return res.status(404).send("nhi mila vo blog...");
    res.json(updatedblog);
  } catch (error) {
    res.status(400).send("update nhi ho paya boss...");
  }
});
