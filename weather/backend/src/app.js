import express from "express";
import dotenv from "dotenv";
import weatherroutes from "./routes.js";
import redisclient from "./redisclient.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

redisclient.connect();

app.use(express.json());

app.use("/api", weatherroutes);

app.listen(PORT,()=>{

    console.log(`server is running on http://localhost:${PORT}`);
    
})
