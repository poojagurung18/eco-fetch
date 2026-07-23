import { v4 as uuid } from "uuid";
import { FEATURE_MAP, type EcoContext } from "@eco-fetch/shared";
import { getCoordinates } from "./geo.service";
import { getCarbonIntensity } from "./carbon.service";
import { getGridStatus, computeEcoLevel } from "./scoring.service";
import { insertSession } from "../repositories/eco-session.repository";
import { insertLog } from "../repositories/carbon-log.repository";

export async function buildEcoContext(
  ip: string,
  clientNetwork?: { bandwidth?: number; rtt?: number }
): Promise<EcoContext> {
  const { lat, lng, region } = await getCoordinates(ip);
  const { carbonIntensity } = await getCarbonIntensity(lat, lng);

  const gridStatus = getGridStatus(carbonIntensity);
  const ecoLevel = computeEcoLevel(
    gridStatus,
    clientNetwork?.bandwidth,
    clientNetwork?.rtt
  );
  const features = FEATURE_MAP[ecoLevel];
  const sessionId = uuid();

  await insertSession({
    sessionId,
    ip,
    region,
    carbonIntensity,
    gridStatus,
    bandwidth: clientNetwork?.bandwidth,
    rtt: clientNetwork?.rtt,
    ecoLevel,
    features,
  });

  await insertLog({ sessionId, carbonIntensity, gridStatus, region });

  return {
    sessionId,
    ip,
    region,
    carbonIntensity,
    gridStatus,
    network: {
      bandwidth: clientNetwork?.bandwidth ?? 0,
      rtt: clientNetwork?.rtt ?? 0,
    },
    ecoLevel,
    features,
    createdAt: new Date().toISOString(),
  };
}