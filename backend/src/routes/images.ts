import { Router } from "express";
import { proxyImage } from "../controllers/image.controller";
const router = Router();
router.get("/proxy", proxyImage);
export default router;