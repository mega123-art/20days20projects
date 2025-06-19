import express from "express";
import dotenv from "dotenv";
import connectdb from "./config/db.js";
import expenseroutes from "./routes/expenseRoutes.js"
import authroutes from "./routes/authRoutes.js"
dotenv.config();
connectdb();

const app = express();
app.use(express.json());

app.use('/auth',authroutes)
app.use('/expenses',expenseroutes)

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server is on port ${PORT}`)
})