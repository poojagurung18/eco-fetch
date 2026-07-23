import type { Request, Response, NextFunction } from "express";
import { buildEcoContext } from "../services/eco-context.service";

export async function handle(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const ip = (
      req.headers["x-forwarded-for"]?.toString().split(",")[0]?.trim() ??
      req.ip ??
      "127.0.0.1"
    ).replace("::ffff:", "");

    const { clientNetwork } = req.body ?? {};
    const context = await buildEcoContext(ip, clientNetwork);
    res.json(context);
  } catch (err) {
    next(err);
  }
}