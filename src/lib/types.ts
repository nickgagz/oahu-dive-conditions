// ─── Data Models ────────────────────────────────────────────────────────────

export interface DiveSite {
  id: string;
  name: string;
  region: string;
  exposure_notes: string;
  lat: number;
  lng: number;
  shore_facing_deg: number; // compass degrees the shore faces (used for wind classification)
}

export type VisibilityCategory =
  | "excellent (80+ ft)"
  | "good (40-80 ft)"
  | "moderate (20-40 ft)"
  | "poor (< 20 ft)";

export type SurgeCategory = "none" | "light" | "moderate" | "heavy";

export type EntryExitCategory = "easy" | "manageable" | "challenging";

export type CurrentCategory = "none" | "mild" | "moderate" | "strong";

export type SurfaceConditions = "flat" | "light chop" | "rough";

export type TideState = "incoming" | "outgoing" | "high" | "low";

export type WindCategory = "offshore" | "onshore" | "cross";

export type SwellDirectionBucket = "N" | "NW" | "W" | "SW" | "S" | "SE" | "E" | "NE";

export interface ForecastSnapshot {
  id: string;
  datetime: string; // ISO 8601
  swell_height: number; // ft
  swell_direction: SwellDirectionBucket;
  swell_period: number; // seconds
  wind_speed: number; // mph
  wind_direction: number; // degrees
  wind_category: WindCategory;
  tide_state: TideState;
}

export interface DiveReport {
  id: string;
  site_id: string;
  datetime: string; // ISO 8601
  visibility_category: VisibilityCategory;
  surge_category: SurgeCategory;
  entry_exit_category: EntryExitCategory;
  current_category: CurrentCategory;
  surface_conditions: SurfaceConditions;
  notes?: string;
  photos?: string[];
  forecast_snapshot_id: string;
}

// ─── Aggregated Summary Types ───────────────────────────────────────────────

export interface HistoricalSummaryData {
  report_count: number;
  visibility: {
    most_common: VisibilityCategory;
    distribution: Record<VisibilityCategory, number>;
  };
  surge: {
    most_common: SurgeCategory;
    distribution: Record<SurgeCategory, number>;
  };
  entry_exit: {
    most_common: EntryExitCategory;
    distribution: Record<EntryExitCategory, number>;
  };
  current: {
    most_common: CurrentCategory;
    distribution: Record<CurrentCategory, number>;
  };
  surface: {
    most_common: SurfaceConditions;
    distribution: Record<SurfaceConditions, number>;
  };
  matching_forecast_params: {
    swell_height_range: [number, number];
    swell_direction: SwellDirectionBucket[];
    swell_period_range: [number, number];
    wind_category: WindCategory[];
  };
}

// ─── Matching Filter Types ──────────────────────────────────────────────────

export interface MatchingFilters {
  swell_height_range: [number, number];
  swell_directions: SwellDirectionBucket[];
  swell_period_range: [number, number];
  wind_categories: WindCategory[];
}

// ─── Time Slot ──────────────────────────────────────────────────────────────

export type TimeSlot = "early-morning" | "mid-morning" | "afternoon" | "evening";

export const TIME_SLOT_LABELS: Record<TimeSlot, string> = {
  "early-morning": "Early Morning",
  "mid-morning": "Mid-Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

export const TIME_SLOT_HOURS: Record<TimeSlot, number> = {
  "early-morning": 6,
  "mid-morning": 9,
  afternoon: 13,
  evening: 17,
};

