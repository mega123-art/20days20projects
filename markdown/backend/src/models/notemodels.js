import mongoose from "mongoose";

const noteschema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    htmlcontent: { type: String },
    createdAt:{type:Date,default:Date.now}

  },

);
export const Note= mongoose.model("Note",noteschema)