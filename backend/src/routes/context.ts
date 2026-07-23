import { Router } from "express";
import { handle } from "../controllers/context.controller";

const router = Router();
router.post("/", handle);
export default router;