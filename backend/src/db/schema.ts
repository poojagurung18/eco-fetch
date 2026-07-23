import { pgTable, serial, uuid, text, doublePrecision, integer, jsonb, timestamp} from "drizzle-orm/pg-core"
export const ecoSessions = pgTable("eco_sessions", {
    id: serial("id").primaryKey(),
    sessionId: uuid("session_id").notNull().unique(),
    ip: text("ip"),
    region: text("region"),
    carbonIntensity: doublePrecision("carbon_intensity"),
    gridStatus: text("grid_status"),
    bandwidth: doublePrecision("bandwidth"),
    rtt: doublePrecision("rtt"),
    ecoLevel: integer("eco_level").notNull(),
    features: jsonb("features").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
})

export const carbonLogs = pgTable("carbon_logs", {
    id: serial("id").primaryKey(),
    sessionId: uuid("session_id").notNull(),
    carbonIntensity: doublePrecision("carbon_intensity").notNull(),
    gridStatus: text("grid_status").notNull(),
    region: text("region"),
    recordedAt: timestamp("recorded_at").notNull().defaultNow(),
})

export type EcoSessions = typeof ecoSessions.$inferSelect;
export type NewEcoSession = typeof ecoSessions.$inferInsert;
export type CarbonLogs = typeof carbonLogs.$inferSelect;
export type NewCarbonLog = typeof carbonLogs.$inferInsert;