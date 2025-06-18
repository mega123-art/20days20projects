import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  dueDate: { type: Date },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  priority:{type:String,enum:["high","med","low"],default:"low"}
});

export const Task = mongoose.model("Task", taskSchema);
