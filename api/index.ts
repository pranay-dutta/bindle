import express from "express";
import routers from "../src/routes";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(routers);

app.get("/", (_, res) => {
  res.json("Bindle backend is running...");
});

export default app;