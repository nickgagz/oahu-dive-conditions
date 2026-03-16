"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  DiveSite,
  VisibilityCategory,
  SurgeCategory,
  EntryExitCategory,
  CurrentCategory,
  SurfaceConditions,
} from "@/lib/types";
import { ForecastSnapshot } from "@/lib/types";
import { submitReport, saveForecastSnapshot } from "@/lib/data";
import SharePost from "@/components/SharePost";
import { ShareData } from "@/lib/share";
import { DIVE_SITES, getDefaultSite, getSiteById } from "@/lib/sites";

const VIS_OPTIONS: VisibilityCategory[] = [
  "excellent (80+ ft)",
  "good (40-80 ft)",
  "moderate (20-40 ft)",
  "poor (< 20 ft)",
];

const SURGE_OPTIONS: SurgeCategory[] = ["none", "light", "moderate", "heavy"];
const ENTRY_OPTIONS: EntryExitCategory[] = ["easy", "manageable", "challenging"];
const CURRENT_OPTIONS: CurrentCategory[] = ["none", "mild", "moderate", "strong"];
const SURFACE_OPTIONS: SurfaceConditions[] = ["flat", "light chop", "rough"];

function getDefaultDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function getDefaultTime(): string {
  const now = new Date();
  return `${now.getHours().toString().padStart(2, "0")}:00`;
}

function windDirectionLabel(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return dirs[Math.round(deg / 22.5) % 16];
}

function formatReadableDate(dateStr: string, timeStr: string): string {
  const d = new Date(`${dateStr}T${timeStr}:00`);
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  }) + " at " + d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function ReportPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Site selection
  const [selectedSite, setSelectedSite] = useState<DiveSite>(() => {
    if (typeof window === "undefined") {
      return getDefaultSite();
    }

    const params = new URLSearchParams(window.location.search);
    const requestedSiteId = params.get("siteId") ?? params.get("site");
    return requestedSiteId ? getSiteById(requestedSiteId) ?? getDefaultSite() : getDefaultSite();
  });

  // Step 1: Date/Time (pre-filled)
  const [date, setDate] = useState(getDefaultDate);
  const [time, setTime] = useState(getDefaultTime);

  // Step 2: Auto-fetched forecast preview
  const [forecast, setForecast] = useState<ForecastSnapshot | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);
  const fetchController = useRef<AbortController | null>(null);

  // Step 3: Conditions
  const [visibility, setVisibility] = useState<VisibilityCategory | "">("");
  const [surge, setSurge] = useState<SurgeCategory | "">("");
  const [entryExit, setEntryExit] = useState<EntryExitCategory | "">("");
  const [current, setCurrent] = useState<CurrentCategory | "">("");
  const [surface, setSurface] = useState<SurfaceConditions | "">("");
  const [notes, setNotes] = useState("");

  // Step 4: Review before submit
  const [reviewing, setReviewing] = useState(false);

  // Date constraints: today and up to 3 months in the past
  const today = new Date();
  const maxDate = today.toISOString().slice(0, 10);
  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
  const minDate = threeMonthsAgo.toISOString().slice(0, 10);

  const conditionsFilled =
    !!visibility && !!surge && !!entryExit && !!current && !!surface;

  const canReview = !!date && !!time && !!forecast && conditionsFilled && !submitting;
  const canSubmit = canReview && reviewing;

  // Auto-fetch forecast when date/time/site changes
  useEffect(() => {
    if (!date || !time) return;

    if (fetchController.current) {
      fetchController.current.abort();
    }
    const controller = new AbortController();
    fetchController.current = controller;

    setForecastLoading(true);
    setForecastError(null);
    setForecast(null);
    setReviewing(false); // Reset review on date/time change

    async function load() {
      try {
        const datetime = `${date}T${time}:00-10:00`;
        const res = await fetch(
          `/api/forecast?datetime=${encodeURIComponent(datetime)}&siteId=${encodeURIComponent(selectedSite.id)}`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Forecast API error");
        const data = await res.json();
        if (!data.forecast) throw new Error("No forecast returned");
        setForecast(data.forecast);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        setForecast(null);
        setForecastError(
          "Unable to fetch forecast for this date/time. Environmental data is needed to link your report."
        );
      } finally {
        if (!controller.signal.aborted) {
          setForecastLoading(false);
        }
      }
    }

    load();
    return () => controller.abort();
  }, [date, time, selectedSite.id]);

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (canReview) setReviewing(true);
  };

  const handleSubmit = async () => {
    if (!canSubmit || !forecast) return;

    setSubmitting(true);
    setError(null);

    try {
      const datetime = `${date}T${time}:00-10:00`;

      const fcResult = await saveForecastSnapshot(forecast);
      if (!fcResult.success) {
        setError(fcResult.error || "Failed to save forecast data.");
        setSubmitting(false);
        return;
      }

      const result = await submitReport({
        site_id: selectedSite.id,
        datetime,
        visibility_category: visibility as string,
        surge_category: surge as string,
        entry_exit_category: entryExit as string,
        current_category: current as string,
        surface_conditions: surface as string,
        notes: notes || undefined,
        forecast_snapshot_id: forecast.id,
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Build share data (memoized so it doesn't regenerate the post on re-renders)
  const shareData: ShareData | null = useMemo(() => {
    if (!submitted || !visibility || !surge || !entryExit || !current || !surface) return null;
    return {
      siteName: selectedSite.name,
      date,
      time,
      visibility: visibility as VisibilityCategory,
      surge: surge as SurgeCategory,
      entryExit: entryExit as EntryExitCategory,
      current: current as CurrentCategory,
      surface: surface as SurfaceConditions,
      notes: notes || undefined,
      forecast: forecast
        ? {
            swellHeight: forecast.swell_height,
            swellDirection: forecast.swell_direction,
            swellPeriod: forecast.swell_period,
            windSpeed: forecast.wind_speed,
            windCategory: forecast.wind_category,
            tideState: forecast.tide_state,
          }
        : undefined,
    };
  }, [submitted, selectedSite, date, time, visibility, surge, entryExit, current, surface, notes, forecast]);

  // ─── Success screen ────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-100">
        <header className="bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-3">
            <div className="text-2xl">🤙</div>
            <h1 className="text-base sm:text-lg font-bold">Mahalo!</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
          {/* Confirmation */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 text-center">
            <p className="text-sm text-slate-600">
              Your report has been recorded. It will help other divers understand
              historical patterns at {selectedSite.name}.
            </p>
          </div>

          {/* Share to social */}
          {shareData && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
              <SharePost data={shareData} />
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            <Link
              href="/"
              className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Back to Conditions
            </Link>
            <Link
              href="/report"
              onClick={() => window.location.reload()}
              className="flex-1 text-center py-2.5 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 transition-colors"
            >
              Add Another Report
            </Link>
          </div>
        </main>
      </div>
    );
  }

  // ─── Review screen ─────────────────────────────────────────────────
  if (reviewing && forecast) {
    return (
      <div className="min-h-screen bg-slate-100">
        <header className="bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-3">
            <button
              onClick={() => setReviewing(false)}
              className="text-slate-400 hover:text-white text-sm transition-colors py-1 -my-1"
            >
              &larr; Edit
            </button>
            <h1 className="text-base sm:text-lg font-bold">Review Report</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* When & Where */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Where &amp; When
            </h2>
            <p className="text-base font-medium text-slate-800">
              {selectedSite.name}
            </p>
            <p className="text-sm text-slate-600 mt-0.5">
              {formatReadableDate(date, time)}
            </p>
          </div>

          {/* Forecast conditions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Environmental Conditions (auto-fetched)
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <ReviewItem label="Swell" value={`${forecast.swell_height} ft ${forecast.swell_direction}`} />
              <ReviewItem label="Period" value={`${forecast.swell_period}s`} />
              <ReviewItem label="Wind" value={`${forecast.wind_speed} mph ${windDirectionLabel(forecast.wind_direction)} (${forecast.wind_category})`} />
              <ReviewItem label="Tide" value={forecast.tide_state} />
            </div>
          </div>

          {/* Your observations */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              Your Observations
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <ReviewItem label="Visibility" value={visibility} />
              <ReviewItem label="Surge" value={surge} />
              <ReviewItem label="Entry / Exit" value={entryExit} />
              <ReviewItem label="Current" value={current} />
              <ReviewItem label="Surface" value={surface} />
            </div>
            {notes && (
              <div className="mt-3 pt-3 border-t border-slate-100">
                <p className="text-xs font-medium text-slate-500">Notes</p>
                <p className="text-sm text-slate-700 mt-0.5 italic">&ldquo;{notes}&rdquo;</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full py-3 rounded-lg text-sm font-semibold bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Confirm & Submit"}
            </button>
            <button
              onClick={() => setReviewing(false)}
              disabled={submitting}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Go Back & Edit
            </button>
          </div>

          <p className="text-xs text-slate-400 text-center italic">
            Your report will be linked to the environmental conditions shown above.
          </p>
        </main>
      </div>
    );
  }

  // ─── Main form ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex items-center gap-3">
          <Link
            href="/"
            className="text-slate-400 hover:text-white text-sm transition-colors py-1 -my-1"
          >
            &larr; Back
          </Link>
          <h1 className="text-base sm:text-lg font-bold">Add Dive Report</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
        <form onSubmit={handleReview} className="space-y-4 sm:space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Step 1: Dive Site */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">1</span>
              <h2 className="text-base font-semibold text-slate-800">
                Where did you dive?
              </h2>
            </div>
            <select
              value={selectedSite.id}
              onChange={(e) => {
                const site = DIVE_SITES.find((s) => s.id === e.target.value);
                if (site) setSelectedSite(site);
              }}
              className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              {DIVE_SITES.map((site) => (
                <option key={site.id} value={site.id}>
                  {site.name} — {site.region}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Date & Time */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">2</span>
              <h2 className="text-base font-semibold text-slate-800">
                When did you dive?
              </h2>
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={minDate}
                  max={maxDate}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-medium text-slate-600 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Forecast Preview (auto-fetched) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">3</span>
              <h2 className="text-base font-semibold text-slate-800">
                Environmental Conditions
              </h2>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Auto-fetched for the date &amp; time above. Verify this looks reasonable.
            </p>

            {forecastLoading ? (
              <div className="text-center py-4">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
                <p className="text-xs text-slate-500 mt-2">Fetching conditions…</p>
              </div>
            ) : forecastError ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center">
                <p className="text-xs text-red-700">{forecastError}</p>
              </div>
            ) : forecast ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <ForecastCell label="Swell" value={`${forecast.swell_height} ft ${forecast.swell_direction}`} />
                <ForecastCell label="Period" value={`${forecast.swell_period}s`} />
                <ForecastCell label="Wind" value={`${forecast.wind_speed} mph ${windDirectionLabel(forecast.wind_direction)}`} sub={forecast.wind_category} />
                <ForecastCell label="Tide" value={forecast.tide_state} />
              </div>
            ) : null}
          </div>

          {/* Step 4: Conditions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold shrink-0">4</span>
              <h2 className="text-base font-semibold text-slate-800">
                What did you observe?
              </h2>
            </div>

            <SelectField
              label="Visibility"
              value={visibility}
              options={VIS_OPTIONS}
              onChange={(v) => setVisibility(v as VisibilityCategory)}
            />
            <SelectField
              label="Surge"
              value={surge}
              options={SURGE_OPTIONS}
              onChange={(v) => setSurge(v as SurgeCategory)}
            />
            <SelectField
              label="Entry / Exit"
              value={entryExit}
              options={ENTRY_OPTIONS}
              onChange={(v) => setEntryExit(v as EntryExitCategory)}
            />
            <SelectField
              label="Current"
              value={current}
              options={CURRENT_OPTIONS}
              onChange={(v) => setCurrent(v as CurrentCategory)}
            />
            <SelectField
              label="Surface Conditions"
              value={surface}
              options={SURFACE_OPTIONS}
              onChange={(v) => setSurface(v as SurfaceConditions)}
            />
          </div>

          {/* Step 5: Notes */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-bold shrink-0">5</span>
              <label className="block text-base font-semibold text-slate-800">
                Notes <span className="text-xs font-normal text-slate-400">(optional)</span>
              </label>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any additional observations..."
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={!canReview}
            className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors ${
              canReview
                ? "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
          >
            Review Report
          </button>

          {!forecast && !forecastLoading && date && time && (
            <p className="text-xs text-amber-600 text-center">
              Forecast data is required before you can review your report.
            </p>
          )}
        </form>
      </main>
    </div>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function ForecastCell({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2.5">
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5 capitalize">{value}</p>
      {sub && <p className="text-xs text-slate-500 capitalize">{sub}</p>}
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 rounded-lg p-2.5">
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-sm font-semibold text-slate-800 mt-0.5 capitalize">{value}</p>
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-slate-600 mb-1.5">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-3 py-2.5 sm:py-2 rounded-lg text-xs font-medium capitalize transition-colors active:scale-95 ${
              value === opt
                ? "bg-blue-100 text-blue-700 border border-blue-300"
                : "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 active:bg-slate-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
