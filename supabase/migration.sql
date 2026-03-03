-- ═══════════════════════════════════════════════════════════════════════════
-- Oahu Dive Conditions — Database Schema
-- Run this in the Supabase SQL Editor to create all tables
-- ═══════════════════════════════════════════════════════════════════════════

-- ─── Enums ──────────────────────────────────────────────────────────────────

CREATE TYPE visibility_category AS ENUM (
  'excellent (80+ ft)',
  'good (40-80 ft)',
  'moderate (20-40 ft)',
  'poor (< 20 ft)'
);

CREATE TYPE surge_category AS ENUM ('none', 'light', 'moderate', 'heavy');

CREATE TYPE entry_exit_category AS ENUM ('easy', 'manageable', 'challenging');

CREATE TYPE current_category AS ENUM ('none', 'mild', 'moderate', 'strong');

CREATE TYPE surface_conditions AS ENUM ('flat', 'light chop', 'rough');

CREATE TYPE tide_state AS ENUM ('incoming', 'outgoing', 'high', 'low');

CREATE TYPE wind_category AS ENUM ('offshore', 'onshore', 'cross');

CREATE TYPE swell_direction_bucket AS ENUM ('N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW');


-- ─── Tables ─────────────────────────────────────────────────────────────────

-- Dive Sites
CREATE TABLE dive_sites (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  region TEXT NOT NULL,
  exposure_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Forecast Snapshots
CREATE TABLE forecast_snapshots (
  id TEXT PRIMARY KEY,
  datetime TIMESTAMPTZ NOT NULL,
  swell_height REAL NOT NULL,
  swell_direction swell_direction_bucket NOT NULL,
  swell_period REAL NOT NULL,
  wind_speed REAL NOT NULL,
  wind_direction REAL NOT NULL,
  wind_category wind_category NOT NULL,
  tide_state tide_state NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Dive Reports
CREATE TABLE dive_reports (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  site_id TEXT NOT NULL REFERENCES dive_sites(id),
  datetime TIMESTAMPTZ NOT NULL,
  visibility_category visibility_category NOT NULL,
  surge_category surge_category NOT NULL,
  entry_exit_category entry_exit_category NOT NULL,
  current_category current_category NOT NULL,
  surface_conditions surface_conditions NOT NULL,
  notes TEXT,
  photos TEXT[],
  forecast_snapshot_id TEXT REFERENCES forecast_snapshots(id),
  created_at TIMESTAMPTZ DEFAULT now()
);


-- ─── Indexes ────────────────────────────────────────────────────────────────

CREATE INDEX idx_dive_reports_site_id ON dive_reports(site_id);
CREATE INDEX idx_dive_reports_datetime ON dive_reports(datetime);
CREATE INDEX idx_forecast_snapshots_datetime ON forecast_snapshots(datetime);


-- ─── Row Level Security ─────────────────────────────────────────────────────

-- Enable RLS on all tables
ALTER TABLE dive_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE forecast_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE dive_reports ENABLE ROW LEVEL SECURITY;

-- Public read access to all tables (no auth needed for reading)
CREATE POLICY "Public read access" ON dive_sites FOR SELECT USING (true);
CREATE POLICY "Public read access" ON forecast_snapshots FOR SELECT USING (true);
CREATE POLICY "Public read access" ON dive_reports FOR SELECT USING (true);

-- Public insert access for dive reports (anonymous submissions for MVP)
CREATE POLICY "Public insert access" ON dive_reports FOR INSERT WITH CHECK (true);

-- Public insert for forecast snapshots (needed when submitting reports)
CREATE POLICY "Public insert access" ON forecast_snapshots FOR INSERT WITH CHECK (true);

