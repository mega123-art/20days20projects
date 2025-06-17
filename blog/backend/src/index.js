import dotenv from "dotenv";
import express from "express";
import connectdb from "./db.js";
import {Blog} from "./model.js";

export const app = express();

const PORT = 3000;
dotenv.config();

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

app.get("blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).send("nhi milra blog vo wala");
    res.json(blog);
  } catch (error) {
    res.status(500).send("kuch to galat hogya bhai dhundhte hue");
  }
});

app.post("/articles", async (req, res) => {
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

app.delete("/articles/:id", async (req, res) => {
  try {
    const deletedblog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedblog) return res.status(404).send("blog nhi mila wo wala...");
  } catch (error) {
    res.status(500).send("kuch to bhi hogya yaar nhi paya delete...");
  }
});

app.put("/articles/:id", async (req, res) => {
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
