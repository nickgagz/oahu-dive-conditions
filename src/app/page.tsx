"use client";

import { useState, useMemo, useCallback, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import SiteSelector from "@/components/SiteSelector";
import DiveTimeSelector from "@/components/DiveTimeSelector";
import ForecastSnapshotDisplay from "@/components/ForecastSnapshot";
import HistoricalSummary from "@/components/HistoricalSummary";
import MatchingControls from "@/components/MatchingControls";
import ExploreOtherTimes, { getCurrentSlot } from "@/components/ExploreOtherTimes";
import ReportFeed from "@/components/ReportFeed";
import ContributionCTA from "@/components/ContributionCTA";
import {
  fetchReportsWithForecasts,
  matchReports,
  buildDefaultFilters,
  aggregateReports,
} from "@/lib/data";
import { getSiteById, getDefaultSite } from "@/lib/sites";
import { DiveSite, DiveReport, ForecastSnapshot, MatchingFilters } from "@/lib/types";

function getDefaultDate(): string {
  const now = new Date();
  now.setDate(now.getDate() + 1);
  return now.toISOString().slice(0, 10);
}

function getDefaultTime(): string {
  return "08:00";
}

// Wrapper that provides Suspense boundary for useSearchParams
export default function HomePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    }>
      <HomePageInner />
    </Suspense>
  );
}

function HomePageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Resolve initial site from URL query param
  const initialSite = useMemo(() => {
    const siteParam = searchParams.get("site");
    if (siteParam) {
      return getSiteById(siteParam) ?? getDefaultSite();
    }
    return getDefaultSite();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Active dive site
  const [activeSite, setActiveSite] = useState<DiveSite>(initialSite);

  const [selectedDate, setSelectedDate] = useState(getDefaultDate);
  const [selectedTime, setSelectedTime] = useState(getDefaultTime);
  const [customFilters, setCustomFilters] = useState<MatchingFilters | null>(null);

  // Data from Supabase
  const [allReports, setAllReports] = useState<DiveReport[]>([]);
  const [allForecasts, setAllForecasts] = useState<Map<string, ForecastSnapshot>>(new Map());
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState<string | null>(null);

  // Real forecast for selected datetime
  const [forecast, setForecast] = useState<ForecastSnapshot | null>(null);
  const [forecastLoading, setForecastLoading] = useState(false);
  const [forecastError, setForecastError] = useState<string | null>(null);
  const fetchController = useRef<AbortController | null>(null);

  // Fetch reports when site changes
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setDataError(null);
      try {
        const { reports, forecasts, error } = await fetchReportsWithForecasts(activeSite.id);
        if (error) {
          setDataError(error);
        }
        setAllReports(reports);
        setAllForecasts(forecasts);
      } catch (err) {
        console.error("Failed to load data:", err);
        setDataError("Failed to load dive report data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [activeSite.id]);

  // Fetch real forecast when date/time or site changes
  useEffect(() => {
    if (fetchController.current) {
      fetchController.current.abort();
    }

    const controller = new AbortController();
    fetchController.current = controller;

    async function loadForecast() {
      setForecastLoading(true);
      setForecastError(null);
      try {
        const datetime = `${selectedDate}T${selectedTime}:00-10:00`;
        const res = await fetch(
          `/api/forecast?datetime=${encodeURIComponent(datetime)}&siteId=${encodeURIComponent(activeSite.id)}`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Forecast fetch failed");

        const data = await res.json();
        if (data.forecast) {
          setForecast(data.forecast);
        } else {
          throw new Error("No forecast in response");
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return;
        console.warn("Forecast unavailable:", err);
        setForecast(null);
        setForecastError(
          "Forecast data is temporarily unavailable. Historical matching requires a forecast — please try again shortly."
        );
      } finally {
        if (!controller.signal.aborted) {
          setForecastLoading(false);
        }
      }
    }

    loadForecast();

    return () => controller.abort();
  }, [selectedDate, selectedTime, activeSite.id]);

  // Build default filters from forecast
  const defaultFilters = useMemo(
    () => (forecast ? buildDefaultFilters(forecast) : null),
    [forecast]
  );

  const activeFilters = customFilters || defaultFilters;

  const matchingReports = useMemo(
    () => (activeFilters ? matchReports(allReports, allForecasts, activeFilters) : []),
    [allReports, allForecasts, activeFilters]
  );

  const summary = useMemo(
    () => (activeFilters ? aggregateReports(matchingReports, activeFilters) : null),
    [matchingReports, activeFilters]
  );

  const currentTimeSlot = useMemo(
    () => getCurrentSlot(selectedTime),
    [selectedTime]
  );

  const handleSiteChange = useCallback((site: DiveSite) => {
    setActiveSite(site);
    setCustomFilters(null);
    // Update URL without full navigation
    const params = new URLSearchParams(window.location.search);
    if (site.id === getDefaultSite().id) {
      params.delete("site");
    } else {
      params.set("site", site.id);
    }
    const qs = params.toString();
    router.replace(qs ? `/?${qs}` : "/", { scroll: false });
  }, [router]);

  const handleDateChange = useCallback((date: string) => {
    setSelectedDate(date);
    setCustomFilters(null);
  }, []);

  const handleTimeChange = useCallback((time: string) => {
    setSelectedTime(time);
    setCustomFilters(null);
  }, []);

  const handleExploreSlot = useCallback((date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setCustomFilters(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 w-full overflow-x-hidden">
      <Header site={activeSite} />

      <main className="px-3 sm:px-4 lg:px-8 xl:px-12 py-4 sm:py-6">
        {/* Status indicators */}
        {!loading && (
          <div className="flex gap-2 justify-center mb-4 sm:mb-5">
            <span className={`text-xs py-1 px-2.5 rounded-full ${
              allReports.length > 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-amber-50 text-amber-700"
            }`}>
              {allReports.length > 0
                ? `${allReports.length} reports`
                : "No reports yet"}
            </span>
            {!forecastLoading && (
              <span className={`text-xs py-1 px-2.5 rounded-full ${
                forecast
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700"
              }`}>
                {forecast ? "Live forecast" : "Forecast unavailable"}
              </span>
            )}
          </div>
        )}

        {/* Data error banner */}
        {dataError && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center mb-4 sm:mb-5">
            <p className="text-sm text-amber-800">{dataError}</p>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto" />
            <p className="text-sm text-slate-500 mt-3">Loading dive data…</p>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-6 space-y-4 sm:space-y-5 lg:space-y-0">
            {/* ─── Left sidebar (controls) ─── */}
            <div className="min-w-0 space-y-4 sm:space-y-5 lg:self-start lg:sticky lg:top-6">
              <SiteSelector activeSite={activeSite} onSiteChange={handleSiteChange} />

              <DiveTimeSelector
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                onDateChange={handleDateChange}
                onTimeChange={handleTimeChange}
              />

              {activeFilters && (
                <MatchingControls
                  filters={activeFilters}
                  onFiltersChange={setCustomFilters}
                />
              )}

              <ExploreOtherTimes
                currentDate={selectedDate}
                currentTimeSlot={currentTimeSlot}
                onSelectSlot={handleExploreSlot}
              />
            </div>

            {/* ─── Right content (results) ─── */}
            <div className="min-w-0 space-y-4 sm:space-y-5">
              {forecastLoading ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5 text-center">
                  <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full mx-auto" />
                  <p className="text-xs text-slate-500 mt-2">Fetching forecast…</p>
                </div>
              ) : forecast ? (
                <ForecastSnapshotDisplay forecast={forecast} />
              ) : forecastError ? (
                <div className="bg-white rounded-xl shadow-sm border border-red-200 p-4 sm:p-5 text-center">
                  <p className="text-sm text-red-700">{forecastError}</p>
                </div>
              ) : null}

              {activeFilters && (
                <HistoricalSummary
                  summary={summary}
                  matchedReportCount={matchingReports.length}
                />
              )}

              {activeFilters && (
                <ReportFeed reports={matchingReports} forecasts={allForecasts} />
              )}

              <ContributionCTA />
            </div>
          </div>
        )}
      </main>

      <footer className="px-3 sm:px-4 lg:px-8 xl:px-12 py-6 sm:py-8 text-center">
        <p className="text-xs text-slate-400">
          Historical patterns are informative, not a guarantee of conditions.
          This tool does not provide safety advice or dive recommendations.
        </p>
      </footer>
    </div>
  );
}
