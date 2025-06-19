import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectdb from "./config/db.js";
import noteroutes from "./routes/noteroutes.js"
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('api/notes',noteroutes)

connectdb();
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
