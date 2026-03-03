// ─── Supabase Database Types ────────────────────────────────────────────────
// These match the schema defined in supabase/migration.sql

export type Database = {
  public: {
    Tables: {
      dive_sites: {
        Row: {
          id: string;
          name: string;
          region: string;
          exposure_notes: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          region: string;
          exposure_notes?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          region?: string;
          exposure_notes?: string | null;
        };
      };
      forecast_snapshots: {
        Row: {
          id: string;
          datetime: string;
          swell_height: number;
          swell_direction: string;
          swell_period: number;
          wind_speed: number;
          wind_direction: number;
          wind_category: string;
          tide_state: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          datetime: string;
          swell_height: number;
          swell_direction: string;
          swell_period: number;
          wind_speed: number;
          wind_direction: number;
          wind_category: string;
          tide_state: string;
        };
        Update: {
          datetime?: string;
          swell_height?: number;
          swell_direction?: string;
          swell_period?: number;
          wind_speed?: number;
          wind_direction?: number;
          wind_category?: string;
          tide_state?: string;
        };
      };
      dive_reports: {
        Row: {
          id: string;
          site_id: string;
          datetime: string;
          visibility_category: string;
          surge_category: string;
          entry_exit_category: string;
          current_category: string;
          surface_conditions: string;
          notes: string | null;
          photos: string[] | null;
          forecast_snapshot_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          site_id: string;
          datetime: string;
          visibility_category: string;
          surge_category: string;
          entry_exit_category: string;
          current_category: string;
          surface_conditions: string;
          notes?: string | null;
          photos?: string[] | null;
          forecast_snapshot_id?: string | null;
        };
        Update: {
          site_id?: string;
          datetime?: string;
          visibility_category?: string;
          surge_category?: string;
          entry_exit_category?: string;
          current_category?: string;
          surface_conditions?: string;
          notes?: string | null;
          photos?: string[] | null;
          forecast_snapshot_id?: string | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      visibility_category: "excellent (80+ ft)" | "good (40-80 ft)" | "moderate (20-40 ft)" | "poor (< 20 ft)";
      surge_category: "none" | "light" | "moderate" | "heavy";
      entry_exit_category: "easy" | "manageable" | "challenging";
      current_category: "none" | "mild" | "moderate" | "strong";
      surface_conditions: "flat" | "light chop" | "rough";
      tide_state: "incoming" | "outgoing" | "high" | "low";
      wind_category: "offshore" | "onshore" | "cross";
      swell_direction_bucket: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";
    };
  };
};

