import express from "express"
import connectdb from "./config/db.js"
import dotenv from "dotenv"

export const app=express()
connectdb()
dotenv.config()
app.use(express.json())