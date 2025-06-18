import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";

import authroutes from "./routes/authroutes.js";
import categoryroutes from "./routes/categoryroutes.js";
import taskroutes from "./routes/taskroutes.js";
import errorhandler from "./middleware/errorhandler.js";
dotenv.config();
const app = express();
connectdb();
app.use(express.json());

app.use("/api/auth", authroutes);
app.use("/api/categories", categoryroutes);
app.use("/api/tasks", taskroutes);

app.use(errorhandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`server bhagra bhai on port ${PORT}`)
})