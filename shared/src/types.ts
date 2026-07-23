export type GridStatus = "clean" | "moderate" | "dirty";

export type NetworkProfile = {
    bandwidth: number; //mbps
    rtt: number; //round trip time in ms
    effectiveTyepe?: string;
};

export type EcoLevel = 0 | 1 | 2 | 3;

export type FeatureFlags = {
    hqImages: boolean;
    animations: boolean;
    prefetch: boolean;
    videoBg: boolean;
    analytics: boolean;
    imagesAsText: boolean;
}

export type EcoContext = {
    sessionId: string;
    ip: string;
    region: string;
    carbonIntensity: number;
    gridStatus: GridStatus;
    network: NetworkProfile;
    ecoLevel: EcoLevel;
    features: FeatureFlags;
    createdAt: string;
}

export type DegradationRule = {
    conditions: {
        carbon?: GridStatus;
        bandwidthMax?: number;
        rttMin?: number;
    };
    ecoLevel: EcoLevel;
}

export type ImageDegradationConfig = {
    maxWidth: number;
    quality: number;
    format: "original" | "jpeg" | "webp" | "svg-placeholder";
    stripMetadata: boolean;
}

export type DegradationProfile = {
    level: EcoLevel;
    image: ImageDegradationConfig;
    cssPlaceholder: boolean;
    prefetchAllowed: boolean;
    analyticsAllowed: boolean;
};