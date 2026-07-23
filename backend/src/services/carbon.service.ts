const ELECTRICITY_MAPS_API =
  "https://api.electricitymap.org/v3/carbon-intensity/latest";

export interface CarbonResult {
  carbonIntensity: number;
  zone: string;
  updatedAt: string;
}

export async function getCarbonIntensity(
  lat: number,
  lng: number
): Promise<CarbonResult> {
  const apiKey = process.env.ELECTRICITY_MAPS_API_KEY;

  if (!apiKey) {
    return {
      carbonIntensity: Math.floor(Math.random() * 500) + 100,
      zone: "IN-NE",
      updatedAt: new Date().toISOString(),
    };
  }

  const url = `${ELECTRICITY_MAPS_API}?lat=${lat}&lon=${lng}`;
  const response = await fetch(url, {
    headers: { "auth-token": apiKey },
  });

  if (!response.ok) {
    throw new Error(`Electricity Maps API error: ${response.statusText}`);
  }

  const data = (await response.json()) as {
    carbonIntensity: number;
    zone: string;
    updatedAt: string;
  };

  return {
    carbonIntensity: data.carbonIntensity,
    zone: data.zone,
    updatedAt: data.updatedAt,
  };
};
