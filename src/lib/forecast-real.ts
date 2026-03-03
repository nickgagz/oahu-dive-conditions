import {
  ForecastSnapshot,
  SwellDirectionBucket,
  WindCategory,
  TideState,
} from "./types";

// ─── Shared NOAA tide station for all Oahu sites ────────────────────────────
const NOAA_TIDE_STATION = "1612340"; // Honolulu

// ─── Site params passed in by callers ────────────────────────────────────────
export interface SiteForecastParams {
  lat: number;
  lng: number;
  shoreFacingDeg: number; // compass degrees the shore faces
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function metersToFeet(m: number): number {
  return Math.round(m * 3.281 * 10) / 10;
}

function degreesToBucket(deg: number): SwellDirectionBucket {
  // Normalize to 0-360
  deg = ((deg % 360) + 360) % 360;
  if (deg >= 337.5 || deg < 22.5) return "N";
  if (deg >= 22.5 && deg < 67.5) return "NE";
  if (deg >= 67.5 && deg < 112.5) return "E";
  if (deg >= 112.5 && deg < 157.5) return "SE";
  if (deg >= 157.5 && deg < 202.5) return "S";
  if (deg >= 202.5 && deg < 247.5) return "SW";
  if (deg >= 247.5 && deg < 292.5) return "W";
  return "NW";
}

/**
 * Classify wind as offshore/onshore/cross relative to any shore-facing direction.
 *
 * - Onshore = wind coming FROM the direction the shore faces (± 45°)
 *   e.g. for a west-facing shore (270°), onshore wind comes from the west (225°–315°)
 * - Offshore = wind blowing opposite to the shore face (± 45°)
 *   e.g. for a west-facing shore, offshore wind comes from the east (45°–135°)
 * - Cross = everything else
 */
function classifyWindCategory(
  windDirDeg: number,
  shoreFacingDeg: number
): WindCategory {
  const wind = ((windDirDeg % 360) + 360) % 360;
  const shore = ((shoreFacingDeg % 360) + 360) % 360;

  // Angle between wind direction and shore-facing direction
  let diff = Math.abs(wind - shore);
  if (diff > 180) diff = 360 - diff;

  // Onshore: wind coming from roughly the same direction as shore faces
  if (diff <= 45) return "onshore";

  // Offshore: wind coming from roughly the opposite direction
  if (diff >= 135) return "offshore";

  return "cross";
}

function classifyTideState(
  tideLevelFt: number,
  prevTideFt: number | null,
  nextTideFt: number | null
): TideState {
  const rising = prevTideFt !== null && tideLevelFt > prevTideFt;
  const falling = prevTideFt !== null && tideLevelFt < prevTideFt;

  // Rough heuristic using Honolulu tidal range (~2 ft)
  if (tideLevelFt > 1.6) return "high";
  if (tideLevelFt < 0.3) return "low";
  if (rising) return "incoming";
  if (falling) return "outgoing";
  return "incoming";
}

// ─── API Types ──────────────────────────────────────────────────────────────

interface OpenMeteoMarineResponse {
  hourly: {
    time: string[];
    swell_wave_height: (number | null)[];
    swell_wave_direction: (number | null)[];
    swell_wave_period: (number | null)[];
  };
}

interface OpenMeteoWeatherResponse {
  hourly: {
    time: string[];
    wind_speed_10m: (number | null)[];
    wind_direction_10m: (number | null)[];
  };
}

interface NOAATidePrediction {
  t: string; // "2026-02-16 08:00"
  v: string; // tide level in feet
}

interface NOAATideResponse {
  predictions: NOAATidePrediction[];
}

// ─── Fetchers ───────────────────────────────────────────────────────────────

async function fetchMarineData(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<OpenMeteoMarineResponse> {
  const url = new URL("https://marine-api.open-meteo.com/v1/marine");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lng.toString());
  url.searchParams.set(
    "hourly",
    "swell_wave_height,swell_wave_direction,swell_wave_period"
  );
  url.searchParams.set("timezone", "Pacific/Honolulu");
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Marine API error: ${res.status}`);
  return res.json();
}

async function fetchWeatherData(
  lat: number,
  lng: number,
  startDate: string,
  endDate: string
): Promise<OpenMeteoWeatherResponse> {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", lat.toString());
  url.searchParams.set("longitude", lng.toString());
  url.searchParams.set("hourly", "wind_speed_10m,wind_direction_10m");
  url.searchParams.set("timezone", "Pacific/Honolulu");
  url.searchParams.set("wind_speed_unit", "mph");
  url.searchParams.set("start_date", startDate);
  url.searchParams.set("end_date", endDate);

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Weather API error: ${res.status}`);
  return res.json();
}

async function fetchTideData(
  startDate: string,
  endDate: string
): Promise<NOAATideResponse> {
  // NOAA uses YYYYMMDD format
  const begin = startDate.replace(/-/g, "");
  const end = endDate.replace(/-/g, "");

  const url = new URL(
    "https://api.tidesandcurrents.noaa.gov/api/prod/datagetter"
  );
  url.searchParams.set("begin_date", begin);
  url.searchParams.set("end_date", end);
  url.searchParams.set("station", NOAA_TIDE_STATION);
  url.searchParams.set("product", "predictions");
  url.searchParams.set("datum", "MLLW");
  url.searchParams.set("time_zone", "lst_ldt");
  url.searchParams.set("units", "english");
  url.searchParams.set("format", "json");
  url.searchParams.set("interval", "h");

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`NOAA Tides API error: ${res.status}`);
  return res.json();
}

// ─── Main: Fetch real forecasts for a date range ────────────────────────────

export async function fetchRealForecasts(
  startDate: string,
  endDate: string,
  site: SiteForecastParams
): Promise<Map<string, ForecastSnapshot>> {
  // Fetch all three APIs independently — if one fails, the others still contribute
  const [marineResult, weatherResult, tidesResult] = await Promise.allSettled([
    fetchMarineData(site.lat, site.lng, startDate, endDate),
    fetchWeatherData(site.lat, site.lng, startDate, endDate),
    fetchTideData(startDate, endDate),
  ]);

  const marine = marineResult.status === "fulfilled" ? marineResult.value : null;
  const weather = weatherResult.status === "fulfilled" ? weatherResult.value : null;
  const tides = tidesResult.status === "fulfilled" ? tidesResult.value : null;

  if (marineResult.status === "rejected") {
    console.warn("Marine API failed:", marineResult.reason);
  }
  if (weatherResult.status === "rejected") {
    console.warn("Weather API failed:", weatherResult.reason);
  }
  if (tidesResult.status === "rejected") {
    console.warn("Tides API failed:", tidesResult.reason);
  }

  // Marine data is essential — without swell data we can't build a useful forecast
  if (!marine) {
    throw new Error("Marine swell data unavailable — cannot build forecast");
  }

  // Build tide lookup: "YYYY-MM-DD HH:00" → level in ft
  const tideLookup = new Map<string, number>();
  if (tides) {
    for (const p of tides.predictions) {
      tideLookup.set(p.t, parseFloat(p.v));
    }
  }

  // Build forecast snapshots per hour
  const forecasts = new Map<string, ForecastSnapshot>();

  for (let i = 0; i < marine.hourly.time.length; i++) {
    const timeStr = marine.hourly.time[i]; // "2026-02-16T08:00"
    const isoKey = timeStr; // Use as the key

    // Marine data
    const swellHeightM = marine.hourly.swell_wave_height[i];
    const swellDirDeg = marine.hourly.swell_wave_direction[i];
    const swellPeriodS = marine.hourly.swell_wave_period[i];

    // Find matching weather data (may be null if weather API failed)
    const weatherIdx = weather ? weather.hourly.time.indexOf(timeStr) : -1;
    const windSpeedMph =
      weather && weatherIdx >= 0 ? weather.hourly.wind_speed_10m[weatherIdx] : null;
    const windDirDeg =
      weather && weatherIdx >= 0 ? weather.hourly.wind_direction_10m[weatherIdx] : null;

    // Find matching tide data (NOAA format: "2026-02-16 08:00")
    const tideKey = timeStr.replace("T", " ");
    const tideLevel = tideLookup.get(tideKey);
    const prevTideKey =
      i > 0 ? marine.hourly.time[i - 1].replace("T", " ") : null;
    const prevTide = prevTideKey ? tideLookup.get(prevTideKey) ?? null : null;
    const nextTideKey =
      i < marine.hourly.time.length - 1
        ? marine.hourly.time[i + 1].replace("T", " ")
        : null;
    const nextTide = nextTideKey ? tideLookup.get(nextTideKey) ?? null : null;

    // Skip if we don't have essential data
    if (
      swellHeightM === null ||
      swellDirDeg === null ||
      swellPeriodS === null
    ) {
      continue;
    }

    const swellHeightFt = metersToFeet(swellHeightM);
    const windSpeed = windSpeedMph !== null ? Math.round(windSpeedMph) : 0;
    const windDir = windDirDeg !== null ? windDirDeg : 0;

    const snapshot: ForecastSnapshot = {
      id: `real-${isoKey}`,
      datetime: `${timeStr}:00-10:00`, // Add seconds + HST offset
      swell_height: swellHeightFt,
      swell_direction: degreesToBucket(swellDirDeg),
      swell_period: Math.round(swellPeriodS * 10) / 10,
      wind_speed: windSpeed,
      wind_direction: windDir,
      wind_category: classifyWindCategory(windDir, site.shoreFacingDeg),
      tide_state:
        tideLevel !== undefined
          ? classifyTideState(tideLevel, prevTide, nextTide)
          : "incoming",
    };

    forecasts.set(timeStr, snapshot);
  }

  return forecasts;
}

/**
 * Get a single forecast for a specific datetime.
 * Finds the nearest hourly snapshot.
 *
 * Parses the date/hour directly from the datetime string (e.g. "2026-02-17T17:00:00-10:00")
 * to avoid UTC conversion shifting late HST hours to the wrong date.
 */
export function findNearestForecast(
  forecasts: Map<string, ForecastSnapshot>,
  datetime: string
): ForecastSnapshot | null {
  // Extract date and hour directly from the string to stay in HST
  // Expected format: "YYYY-MM-DDTHH:MM..."
  const datePart = datetime.slice(0, 10); // "2026-02-17"
  const hourPart = datetime.slice(11, 13); // "17"
  const key = `${datePart}T${hourPart}:00`;

  return forecasts.get(key) || null;
}
