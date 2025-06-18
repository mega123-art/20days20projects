import mongoose from "mongoose";

const todoschema=new mongoose.Schema({




},{timestamps:true})


export const Todo = mongoose.model("Todo", todoschema);
