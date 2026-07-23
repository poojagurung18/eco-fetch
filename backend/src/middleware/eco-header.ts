import type { Request, Response, NextFunction } from "express";

export function ecoHeaderMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const cookieHeader = req.headers.cookie ?? "";
  const cookies = Object.fromEntries(
    cookieHeader.split(";").map((c) => {
      const [key, ...val] = c.trim().split("=");
      return [key, val.join("=")];
    })
  );

  const ecoLevel = cookies["eco-level"];

  if (ecoLevel !== undefined) {
    res.setHeader("x-eco-mode", ecoLevel);
  }

  next();
}