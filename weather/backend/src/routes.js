import express from "express";
import { getweatherdata } from "./services";

const router = express.Router();

router.get("/weather/:city", async (req, res) => {
  const city = req.params.city;
  try {
    const result = await getweatherdata(city);
    res.json(result);
  } catch (error) {
    res.status(500).json("failed to fetch weatehr data...");
  }
});

export default router;
