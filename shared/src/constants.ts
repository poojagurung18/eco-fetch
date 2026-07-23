import type { FeatureFlags, EcoLevel, DegradationRule, DegradationProfile } from "./types";

export const CARBON_THRESHOLDS = {
  CLEAN_MAX: 200,      // gCO2/kWh
  MODERATE_MAX: 400,   // gCO2/kWh
} as const;

export const BANDWIDTH_THRESHOLDS = {
  GOOD_MIN: 5,    // Mbps
  POOR_MAX: 1,    // Mbps
} as const;

export const FEATURE_MAP: Record<EcoLevel, FeatureFlags> = {
  0: { hqImages: true, animations: true, prefetch: true, videoBg: true, analytics: true, imagesAsText: false },
  1: { hqImages: false, animations: true, prefetch: true, videoBg: false, analytics: true, imagesAsText: false },
  2: { hqImages: false, animations: false, prefetch: false, videoBg: false, analytics: false, imagesAsText: false },
  3: { hqImages: false, animations: false, prefetch: false, videoBg: false, analytics: false, imagesAsText: true },
};

export const DEFAULT_RULES: DegradationRule[] = [
  { conditions: { carbon: "dirty", bandwidthMax: 1 }, ecoLevel: 3 },
  { conditions: { carbon: "dirty", bandwidthMax: 5 }, ecoLevel: 2 },
  { conditions: { carbon: "dirty" }, ecoLevel: 2 },
  { conditions: { carbon: "moderate", bandwidthMax: 1 }, ecoLevel: 2 },
  { conditions: { carbon: "moderate", bandwidthMax: 5 }, ecoLevel: 1 },
  { conditions: { carbon: "moderate" }, ecoLevel: 1 },
  { conditions: { carbon: "clean", bandwidthMax: 1 }, ecoLevel: 1 },
  { conditions: { carbon: "clean" }, ecoLevel: 0 },
];

export const DEGRADATION_PROFILES: Record<EcoLevel, DegradationProfile> = {
  0: {
    level: 0,
    image: { maxWidth: Infinity, quality: 100, format: "original", stripMetadata: false },
    cssPlaceholder: false,
    prefetchAllowed: true,
    analyticsAllowed: true,
  },
  1: {
    level: 1,
    image: { maxWidth: 1200, quality: 60, format: "jpeg", stripMetadata: true },
    cssPlaceholder: false,
    prefetchAllowed: true,
    analyticsAllowed: true,
  },
  2: {
    level: 2,
    image: { maxWidth: 600, quality: 30, format: "jpeg", stripMetadata: true },
    cssPlaceholder: false,
    prefetchAllowed: false,
    analyticsAllowed: false,
  },
  3: {
    level: 3,
    image: { maxWidth: 0, quality: 0, format: "svg-placeholder", stripMetadata: true },
    cssPlaceholder: true,
    prefetchAllowed: false,
    analyticsAllowed: false,
  },
};