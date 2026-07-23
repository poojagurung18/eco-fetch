import { DEGRADATION_PROFILES, type EcoLevel } from "@eco-fetch/shared";
import { generatePlaceholder } from "../services/placeholder.service"
import type { NextFunction, Request, Response } from "express";
import { isAllowedUrl } from "../services/url-validator.service";
import sharp from "sharp";
const PLACHOLDER_SVG = generatePlaceholder(400, 200, "Image unavailable in ecomode");

export async function proxyImage(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    try {
        const { url, level: levelStr } = req.query;
        if (!url || typeof url != "string") {
            res.status(400).json({error: "missing url param"});
            return;
        }

        const level = Number(levelStr) || 0;
        if (![0, 1, 2, 3].includes(level)) {
            res.status(400).json({error: "Invalid level parameter (0-3)"});
            return;
        }
        const ecoLevel: EcoLevel = level as EcoLevel;

        if(!isAllowedUrl(url)) {
            res.status(400).json({error: "URL not allowed"});
            return;
        }

        const profile = DEGRADATION_PROFILES[ecoLevel];

        if (profile.image.format === "svg-placeholder") {
            const customPlaceholder = generatePlaceholder(400, 200, "Image placeholder- eco mode");
            res.setHeader("Content-Type", "image/svg+xml");
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.send(customPlaceholder);
            return;
        }

        if (profile.image.format === "original") {
            const response = await fetch(url);
            if (!response.ok || !response.body) {
                res.status(502).json({ error: "Failed to fetch upstream image" });
                return;
            }
            res.setHeader("Content-Type", response.headers.get("content-type") ?? "image/jpeg");
            res.setHeader("Cache-Control", "public, max-age=3600");

            const reader = response.body.getReader();
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                res.write(value);
            }
            res.end();
            return;
        }

        const response = await fetch(url);
        if(!response.ok || !response.body) {
            res.status(502).json({ error: "Failed to fetch upstream image"});
            return;
        }
        const buffer = Buffer.from(await response.arrayBuffer());
            let pipeline = sharp(buffer).rotate();

            if (profile.image.maxWidth !== Infinity) {
            pipeline = pipeline.resize({ width: profile.image.maxWidth, fit: "inside", withoutEnlargement: true });
            }

            if (profile.image.format === "jpeg") {
            pipeline = pipeline.jpeg({ quality: profile.image.quality });
            res.setHeader("Content-Type", "image/jpeg");
            } else if (profile.image.format === "webp") {
            pipeline = pipeline.webp({ quality: profile.image.quality });
            res.setHeader("Content-Type", "image/webp");
            }

            res.setHeader("Cache-Control", "public, max-age=3600");

            const processedBuffer = await pipeline.toBuffer();
            res.end(processedBuffer);
        } catch (err) {
        next(err);
    }
}   
