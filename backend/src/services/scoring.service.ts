import { CARBON_THRESHOLDS, type GridStatus, type EcoLevel } from "@eco-fetch/shared";
import { evaluate } from "./engine.service";

export function getGridStatus(carbonIntensity: number): GridStatus {
  if (carbonIntensity < CARBON_THRESHOLDS.CLEAN_MAX) return "clean";
  if (carbonIntensity < CARBON_THRESHOLDS.MODERATE_MAX) return "moderate";
  return "dirty";
}

export function computeEcoLevel(
  gridStatus: GridStatus,
  bandwidth?: number,
  rtt?: number
): EcoLevel {
  return evaluate({ carbon: gridStatus, bandwidth, rtt });
}