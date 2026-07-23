import { db } from "../db";
import { ecoSessions, type EcoSessions, type NewEcoSession } from "../db/schema";

export async function insertSession(data: NewEcoSession): Promise<EcoSessions> {
    const [session] = await db.insert(ecoSessions).values(data).returning();
    if(!session) throw new Error("Failed to insert session");
    return session;
}

export async function getAllSessions(): Promise<EcoSessions[]> {
    return await db.select().from(ecoSessions);
}

export async function getSummaryStats() {
    const sessions = await db.select().from(ecoSessions);
    const total = sessions.length;
    const sessionsByGrid: Record<string, number> = {};
    let totalEcoLevel = 0;

    for (const s of sessions) {
        const status = s.gridStatus ?? "unknown";
        sessionsByGrid[status] = (sessionsByGrid[status] ?? 0) + 1;
        totalEcoLevel += s.ecoLevel;
    }

    return {
        totalSessions: total,
        sessionsByGrid,
        avgEcoLevel: total > 0 ? Math.round((totalEcoLevel / total)*10) /10 : 0,
    }
}