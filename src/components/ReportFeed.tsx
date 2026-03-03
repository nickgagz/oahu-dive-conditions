"use client";

import { DiveReport, ForecastSnapshot } from "@/lib/types";

interface ReportFeedProps {
  reports: DiveReport[];
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

export default function ReportFeed({ reports, forecasts }: ReportFeedProps) {
  const sorted = [...reports].sort(
    (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
  );

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Historical Dive Reports
      </h2>
      <p className="text-xs text-slate-500 mb-3 sm:mb-4">
        Individual reports matching current filters, most recent first.
      </p>

      {sorted.length === 0 ? (
        <p className="text-sm text-slate-500 text-center py-4">
          No reports match the current filters.
        </p>
      ) : (
        <div className="space-y-3">
          {sorted.map((report) => (
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
