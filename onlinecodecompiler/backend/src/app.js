import express from "express";
import bodyParser from "body-parser";
import codeRoutes from "./routes/codeRoutes.js";

const app = express();
app.use(bodyParser.json());
app.use("/api/20d20p", codeRoutes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
});
export default app;
