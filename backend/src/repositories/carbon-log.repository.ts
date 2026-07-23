import { eq } from "drizzle-orm";
import { db } from "../db";
import { carbonLogs, type CarbonLogs, type NewCarbonLog } from "../db/schema";

export async function insertLog(data: NewCarbonLog): Promise<CarbonLogs> {
  const [log] = await db.insert(carbonLogs).values(data).returning();
  if (!log) throw new Error("Failed to insert carbon log");
  return log;
}

export async function getLogsBySession(sessionId: string): Promise<CarbonLogs[]> {
  return await db.select().from(carbonLogs).where(eq(carbonLogs.sessionId, sessionId));
}