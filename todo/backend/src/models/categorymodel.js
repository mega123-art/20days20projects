import mongoose from "mongoose";
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
   
});
categorySchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "category",
});

categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });
  
export const Category = mongoose.model("Category", categorySchema);

