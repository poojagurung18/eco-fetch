export interface GeoResult {
  lat: number;
  lng: number;
  region: string;
}

export async function getCoordinates(ip: string): Promise<GeoResult> {
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") {
    return { lat: 28.2, lng: 83.9, region: "Pokhara, Nepal" };
  }

  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!response.ok) throw new Error(`ipapi error: ${response.statusText}`);
    const data = (await response.json()) as {
        latitude: number;
        longitude: number;
        city: string;
        country_name: string;
    };
    return {
        lat: data.latitude,
        lng: data.longitude,
        region: `${data.city}, ${data.country_name}`,
    };
  } catch {
    return { lat: 28.2, lng: 83.9, region: "Unknown" };
  }
}