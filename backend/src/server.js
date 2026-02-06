import express from "express";
import { ENV } from "./helper/env.js";
const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ msg: "success from api" });
});
app.listen(ENV.PORT, (req, res) => {
  console.log("Server is running on port 3000");
});
