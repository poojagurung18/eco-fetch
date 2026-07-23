import { DEFAULT_RULES, type GridStatus, type EcoLevel } from "@eco-fetch/shared";

export function evaluate(input: {
  carbon: GridStatus;
  bandwidth?: number;
  rtt?: number;
}): EcoLevel {
  for (const rule of DEFAULT_RULES) {
    const { conditions } = rule;
    if (conditions.carbon && conditions.carbon !== input.carbon) continue;
    if (
      conditions.bandwidthMax !== undefined &&
      (input.bandwidth ?? 0) > conditions.bandwidthMax
    )
      continue;
    if (
      conditions.rttMin !== undefined &&
      (input.rtt ?? 0) < conditions.rttMin
    )
      continue;
    return rule.ecoLevel;
  }
  return 0;
}