import { Router } from "express";
import { handleSummary } from "../controllers/metrics.controller";

const router = Router();
router.get("/summary", handleSummary);
export default router;