import { NextRequest, NextResponse } from "next/server";
import { fetchRealForecasts, findNearestForecast, SiteForecastParams } from "@/lib/forecast-real";
import { ForecastSnapshot } from "@/lib/types";
import { getSiteById, getDefaultSite } from "@/lib/sites";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const startDate = searchParams.get("start");
  const endDate = searchParams.get("end");
  const datetime = searchParams.get("datetime");
  const siteId = searchParams.get("siteId");

  // Resolve site — fall back to Electric Beach
  const site = siteId ? getSiteById(siteId) ?? getDefaultSite() : getDefaultSite();
  const siteParams: SiteForecastParams = {
    lat: site.lat,
    lng: site.lng,
    shoreFacingDeg: site.shore_facing_deg,
  };

  try {
    // If datetime is provided, return a single forecast for that time
    if (datetime) {
      // Extract the date directly from the datetime string (e.g. "2026-02-17T17:00:00-10:00")
      // instead of converting through UTC, which shifts late HST times to the next day
      const sd = datetime.slice(0, 10);
      const ed = sd; // Same day

      const forecasts = await fetchRealForecasts(sd, ed, siteParams);
      const nearest = findNearestForecast(forecasts, datetime);

      if (!nearest) {
        return NextResponse.json(
          { error: "No forecast data available for this time" },
          { status: 404 }
        );
      }

      return NextResponse.json({ forecast: nearest });
    }

    // If start/end provided, return all hourly forecasts in range
    if (startDate && endDate) {
      const forecasts = await fetchRealForecasts(startDate, endDate, siteParams);
      const arr: ForecastSnapshot[] = Array.from(forecasts.values());

      return NextResponse.json({ forecasts: arr });
    }

    // Default: return forecasts for today + next 3 days
    const now = new Date();
    // Approximate HST by subtracting 10 hours
    const hst = new Date(now.getTime() - 10 * 60 * 60 * 1000);
    const sd = hst.toISOString().slice(0, 10);
    const endD = new Date(hst);
    endD.setDate(endD.getDate() + 3);
    const ed = endD.toISOString().slice(0, 10);

    const forecasts = await fetchRealForecasts(sd, ed, siteParams);
    const arr: ForecastSnapshot[] = Array.from(forecasts.values());

    return NextResponse.json({ forecasts: arr });
  } catch (error) {
    console.error("Forecast API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch forecast data" },
      { status: 500 }
    );
  }
}
