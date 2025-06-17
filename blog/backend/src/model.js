import mongoose from "mongoose";

const blogschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    tags: [String],
    date: { type: Date, default: Date.now },
  },

  { timestamps: true }
);
export const Blog = mongoose.model("Blog", blogschema);
