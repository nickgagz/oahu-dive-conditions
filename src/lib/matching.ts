import {
  DiveReport,
  HistoricalSummaryData,
  MatchingFilters,
  VisibilityCategory,
  SurgeCategory,
  EntryExitCategory,
  CurrentCategory,
  SurfaceConditions,
  ForecastSnapshot,
  SwellDirectionBucket,
  WindCategory,
} from "./types";
// ─── Default tolerances ─────────────────────────────────────────────────────

const DEFAULT_SWELL_HEIGHT_TOLERANCE = 1.0; // ± ft
const DEFAULT_PERIOD_TOLERANCE = 3; // ± seconds
const MIN_REPORTS_THRESHOLD = 5;

// ─── Adjacent swell direction buckets ───────────────────────────────────────

const DIRECTION_NEIGHBORS: Record<SwellDirectionBucket, SwellDirectionBucket[]> = {
  N: ["NW", "NE"],
  NE: ["N", "E"],
  E: ["NE", "SE"],
  SE: ["E", "S"],
  S: ["SE", "SW"],
  SW: ["S", "W"],
  W: ["SW", "NW"],
  NW: ["W", "N"],
};

function getMatchingDirections(dir: SwellDirectionBucket): SwellDirectionBucket[] {
  return [dir, ...DIRECTION_NEIGHBORS[dir]];
}

// ─── Build default filters from a forecast ──────────────────────────────────

export function buildDefaultFilters(forecast: ForecastSnapshot): MatchingFilters {
  return {
    swell_height_range: [
      Math.max(0, forecast.swell_height - DEFAULT_SWELL_HEIGHT_TOLERANCE),
      forecast.swell_height + DEFAULT_SWELL_HEIGHT_TOLERANCE,
    ],
    swell_directions: getMatchingDirections(forecast.swell_direction),
    swell_period_range: [
      Math.max(0, forecast.swell_period - DEFAULT_PERIOD_TOLERANCE),
      forecast.swell_period + DEFAULT_PERIOD_TOLERANCE,
    ],
    wind_categories: [forecast.wind_category],
  };
}

// ─── Aggregate into summary ─────────────────────────────────────────────────

function mostCommon<T extends string>(items: T[]): T {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as T;
}

function distribution<T extends string>(items: T[]): Record<T, number> {
  const counts = {} as Record<T, number>;
  items.forEach((item) => {
    counts[item] = (counts[item] || 0) + 1;
  });
  return counts;
}

export function aggregateReports(
  reports: DiveReport[],
  filters: MatchingFilters
): HistoricalSummaryData | null {
  if (reports.length < MIN_REPORTS_THRESHOLD) {
    return null;
  }

  const vis = reports.map((r) => r.visibility_category);
  const surge = reports.map((r) => r.surge_category);
  const entry = reports.map((r) => r.entry_exit_category);
  const current = reports.map((r) => r.current_category);
  const surface = reports.map((r) => r.surface_conditions);

  return {
    report_count: reports.length,
    visibility: {
      most_common: mostCommon(vis),
      distribution: distribution(vis) as Record<VisibilityCategory, number>,
    },
    surge: {
      most_common: mostCommon(surge),
      distribution: distribution(surge) as Record<SurgeCategory, number>,
    },
    entry_exit: {
      most_common: mostCommon(entry),
      distribution: distribution(entry) as Record<EntryExitCategory, number>,
    },
    current: {
      most_common: mostCommon(current),
      distribution: distribution(current) as Record<CurrentCategory, number>,
    },
    surface: {
      most_common: mostCommon(surface),
      distribution: distribution(surface) as Record<SurfaceConditions, number>,
    },
    matching_forecast_params: {
      swell_height_range: filters.swell_height_range,
      swell_direction: filters.swell_directions,
      swell_period_range: filters.swell_period_range,
      wind_category: filters.wind_categories,
    },
  };
}

export { MIN_REPORTS_THRESHOLD };

