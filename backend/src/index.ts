import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import contextRouter from "./routes/context";
import metricsRouter from "./routes/metrics";
import imagesRouter from "./routes/images"
import { errorHandler } from "./middleware/error-handler";
import { ecoHeaderMiddleware } from "./middleware/eco-header";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(ecoHeaderMiddleware);

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/context", contextRouter);
app.use("/api/metrics", metricsRouter);
app.use("/api/images", imagesRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[Eco-Fetch] Backend running on http://localhost:${PORT}`);
});