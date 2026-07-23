import type { Request, Response, NextFunction } from "express";
import { getSummaryStats } from "../repositories/eco-session.repository";

export async function handleSummary(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const stats = await getSummaryStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
}