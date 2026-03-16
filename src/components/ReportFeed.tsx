"use client";

import { useMemo } from "react";
import { DiveReport, ForecastSnapshot } from "@/lib/types";

export type ReportFeedTab = "matching" | "latest";

interface ReportFeedProps {
  matchingReports: DiveReport[];
  latestReports: DiveReport[];
  activeTab: ReportFeedTab;
  onTabChange: (tab: ReportFeedTab) => void;
  forecasts?: Map<string, ForecastSnapshot>;
}

function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " at " +
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
}

function ReportCard({
  report,
  forecast,
}: {
  report: DiveReport;
  forecast?: ForecastSnapshot;
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-3 sm:p-4 bg-slate-50">
      <p className="text-xs text-slate-500 font-medium">
        {formatDateTime(report.datetime)}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 sm:gap-x-4 gap-y-1.5 sm:gap-y-2 mt-2 sm:mt-3">
        <div>
          <p className="text-xs text-slate-500">Visibility</p>
          <p className="text-xs sm:text-sm text-slate-800 font-medium capitalize">
            {report.visibility_category}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Surge</p>
          <p className="text-xs sm:text-sm text-slate-800 font-medium capitalize">
            {report.surge_category}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Entry / Exit</p>
          <p className="text-xs sm:text-sm text-slate-800 font-medium capitalize">
            {report.entry_exit_category}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Current</p>
          <p className="text-xs sm:text-sm text-slate-800 font-medium capitalize">
            {report.current_category}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Surface</p>
          <p className="text-xs sm:text-sm text-slate-800 font-medium capitalize">
            {report.surface_conditions}
          </p>
        </div>
      </div>

      {report.notes && (
        <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 italic border-t border-slate-200 pt-2">
          &ldquo;{report.notes}&rdquo;
        </p>
      )}

      {forecast && (
        <p className="mt-1.5 sm:mt-2 text-xs text-slate-400 leading-relaxed">
          Recorded conditions: {forecast.swell_height} ft{" "}
          {forecast.swell_direction}, {forecast.swell_period}s period,{" "}
          {forecast.wind_speed} mph {forecast.wind_category} wind, tide{" "}
          {forecast.tide_state}
        </p>
      )}
    </div>
  );
}

export default function ReportFeed({
  matchingReports,
  latestReports,
  activeTab,
  onTabChange,
  forecasts,
}: ReportFeedProps) {
  const sortedMatching = useMemo(
    () =>
      [...matchingReports].sort(
        (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      ),
    [matchingReports]
  );

  const sortedLatest = useMemo(
    () =>
      [...latestReports].sort(
        (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
      ),
    [latestReports]
  );

  const activeReports = activeTab === "matching" ? sortedMatching : sortedLatest;
  const matchingCount = sortedMatching.length;
  const latestCount = sortedLatest.length;

  const subtitle =
    activeTab === "matching"
      ? "Historical reports that match your current forecast filters."
      : "Most recent reports for this site, regardless of filter match.";

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Dive Reports
      </h2>

      <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1 mt-2">
        <button
          type="button"
          onClick={() => onTabChange("matching")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "matching"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          Matching ({matchingCount})
        </button>
        <button
          type="button"
          onClick={() => onTabChange("latest")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
            activeTab === "latest"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-800"
          }`}
        >
          Latest ({latestCount})
        </button>
      </div>

      <p className="text-xs text-slate-500 mt-3 mb-3 sm:mb-4">{subtitle}</p>

      {activeReports.length === 0 ? (
        <div className="text-center py-4 space-y-2">
          <p className="text-sm text-slate-500">
            {activeTab === "matching"
              ? "No reports match the current filters."
              : "No reports available for this site yet."}
          </p>
          {activeTab === "matching" && latestCount > 0 && (
            <button
              type="button"
              onClick={() => onTabChange("latest")}
              className="text-sm font-medium text-blue-700 hover:text-blue-800"
            >
              View latest reports instead
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {activeReports.map((report) => (
            <ReportCard
              key={report.id}
              report={report}
              forecast={forecasts?.get(report.forecast_snapshot_id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}
