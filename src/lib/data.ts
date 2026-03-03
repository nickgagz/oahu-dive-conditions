import {
  DiveReport,
  ForecastSnapshot,
  MatchingFilters,
} from "./types";
import { createClient } from "./supabase/client";
import {
  buildDefaultFilters,
  aggregateReports,
} from "./matching";

// ─── Check if Supabase is configured ───────────────────────────────────────

export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project")
  );
}

// ─── Fetch all reports + their forecasts from Supabase ──────────────────────

export async function fetchReportsWithForecasts(siteId: string = "electric-beach"): Promise<{
  reports: DiveReport[];
  forecasts: Map<string, ForecastSnapshot>;
  error?: string;
}> {
  if (!isSupabaseConfigured()) {
    return {
      reports: [],
      forecasts: new Map(),
      error: "Database not configured. Please set up Supabase credentials.",
    };
  }

  const supabase = createClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: reportRows, error: reportsErr } = await supabase
    .from("dive_reports")
    .select("*")
    .eq("site_id", siteId)
    .order("datetime", { ascending: false });

  const { data: forecastRows, error: forecastsErr } = await supabase
    .from("forecast_snapshots")
    .select("*");

  if (reportsErr || forecastsErr || !reportRows || !forecastRows) {
    console.error("Supabase fetch error:", reportsErr, forecastsErr);
    return {
      reports: [],
      forecasts: new Map(),
      error: "Failed to load data from the database. Please try again later.",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const reports: DiveReport[] = (reportRows as any[]).map((r: any) => ({
    id: r.id,
    site_id: r.site_id,
    datetime: r.datetime,
    visibility_category: r.visibility_category,
    surge_category: r.surge_category,
    entry_exit_category: r.entry_exit_category,
    current_category: r.current_category,
    surface_conditions: r.surface_conditions,
    notes: r.notes || undefined,
    photos: r.photos || undefined,
    forecast_snapshot_id: r.forecast_snapshot_id || "",
  }));

  const forecasts = new Map<string, ForecastSnapshot>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const f of forecastRows as any[]) {
    forecasts.set(f.id, {
      id: f.id,
      datetime: f.datetime,
      swell_height: f.swell_height,
      swell_direction: f.swell_direction,
      swell_period: f.swell_period,
      wind_speed: f.wind_speed,
      wind_direction: f.wind_direction,
      wind_category: f.wind_category,
      tide_state: f.tide_state,
    });
  }

  return { reports, forecasts };
}

// ─── Match reports against filters (works with any data source) ─────────────

export function matchReports(
  reports: DiveReport[],
  forecasts: Map<string, ForecastSnapshot>,
  filters: MatchingFilters
): DiveReport[] {
  return reports.filter((report) => {
    const fc = forecasts.get(report.forecast_snapshot_id);
    if (!fc) return false;

    if (
      fc.swell_height < filters.swell_height_range[0] ||
      fc.swell_height > filters.swell_height_range[1]
    ) return false;

    if (!filters.swell_directions.includes(fc.swell_direction)) return false;

    if (
      fc.swell_period < filters.swell_period_range[0] ||
      fc.swell_period > filters.swell_period_range[1]
    ) return false;

    if (!filters.wind_categories.includes(fc.wind_category)) return false;

    return true;
  });
}

// ─── Submit a new dive report ───────────────────────────────────────────────

export async function submitReport(report: {
  site_id: string;
  datetime: string;
  visibility_category: string;
  surge_category: string;
  entry_exit_category: string;
  current_category: string;
  surface_conditions: string;
  notes?: string;
  forecast_snapshot_id?: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not configured." };
  }

  const supabase = createClient();

  const { error } = await supabase.from("dive_reports").insert({
    site_id: report.site_id,
    datetime: report.datetime,
    visibility_category: report.visibility_category,
    surge_category: report.surge_category,
    entry_exit_category: report.entry_exit_category,
    current_category: report.current_category,
    surface_conditions: report.surface_conditions,
    notes: report.notes || null,
    forecast_snapshot_id: report.forecast_snapshot_id || null,
  });

  if (error) {
    console.error("Insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ─── Save a forecast snapshot (when submitting a report) ────────────────────

export async function saveForecastSnapshot(
  forecast: ForecastSnapshot
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not configured." };
  }

  const supabase = createClient();

  const { error } = await supabase.from("forecast_snapshots").insert({
    id: forecast.id,
    datetime: forecast.datetime,
    swell_height: forecast.swell_height,
    swell_direction: forecast.swell_direction,
    swell_period: forecast.swell_period,
    wind_speed: forecast.wind_speed,
    wind_direction: forecast.wind_direction,
    wind_category: forecast.wind_category,
    tide_state: forecast.tide_state,
  });

  if (error) {
    console.error("Forecast insert error:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// Re-exports for convenience
export { buildDefaultFilters, aggregateReports };
