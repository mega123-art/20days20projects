import express from "express"
import connectdb from "./config/db.js"
import dotenv from "dotenv"
dotenv.config()
connectdb()

export const app=express()
app.use(express.json())