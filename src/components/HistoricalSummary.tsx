"use client";

import { HistoricalSummaryData } from "@/lib/types";
import { MIN_REPORTS_THRESHOLD } from "@/lib/matching";
import DonutChart from "./DonutChart";

interface HistoricalSummaryProps {
  summary: HistoricalSummaryData | null;
  matchedReportCount: number;
}

function DistributionBar({
  distribution,
  colorMap,
}: {
  distribution: Record<string, number>;
  colorMap: Record<string, string>;
}) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  return (
    <div className="flex rounded-full overflow-hidden h-2 mt-1.5">
      {Object.entries(distribution).map(([key, count]) => (
        <div
          key={key}
          className={colorMap[key] || "bg-slate-300"}
          style={{ width: `${(count / total) * 100}%` }}
          title={`${key}: ${count} report${count !== 1 ? "s" : ""}`}
        />
      ))}
    </div>
  );
}

function Legend({
  distribution,
  colorMap,
}: {
  distribution: Record<string, number>;
  colorMap: Record<string, string>;
}) {
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);
  if (total === 0) return null;

  return (
    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1.5">
      {Object.entries(distribution).map(([key, count]) => {
        if (count <= 0) return null;
        const pct = Math.round((count / total) * 100);
        return (
          <span key={key} className="flex items-center gap-1 text-xs text-slate-500">
            <span className={`inline-block w-2 h-2 rounded-full ${colorMap[key] || "bg-slate-300"}`} />
            <span className="capitalize">{key}</span>
            <span className="text-slate-400">{pct}%</span>
          </span>
        );
      })}
    </div>
  );
}

const VIS_COLORS: Record<string, string> = {
  "excellent (80+ ft)": "bg-emerald-400",
  "good (40-80 ft)": "bg-blue-400",
  "moderate (20-40 ft)": "bg-amber-400",
  "poor (< 20 ft)": "bg-red-400",
};

const SURGE_COLORS: Record<string, string> = {
  none: "bg-emerald-400",
  light: "bg-blue-400",
  moderate: "bg-amber-400",
  heavy: "bg-red-400",
};

const ENTRY_COLORS: Record<string, string> = {
  easy: "bg-emerald-400",
  manageable: "bg-amber-400",
  challenging: "bg-red-400",
};

const CURRENT_COLORS: Record<string, string> = {
  none: "bg-emerald-400",
  mild: "bg-blue-400",
  moderate: "bg-amber-400",
  strong: "bg-red-400",
};

const SURFACE_COLORS: Record<string, string> = {
  flat: "bg-emerald-400",
  "light chop": "bg-amber-400",
  rough: "bg-red-400",
};

export default function HistoricalSummary({
  summary,
  matchedReportCount,
}: HistoricalSummaryProps) {
  if (matchedReportCount < MIN_REPORTS_THRESHOLD || !summary) {
    return (
      <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-3">
          Historical Patterns
        </h2>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4 text-center">
          <p className="text-sm text-amber-800">
            Not enough historical reports under similar conditions yet.
          </p>
          <p className="text-xs text-amber-600 mt-1">
            {matchedReportCount} report{matchedReportCount !== 1 ? "s" : ""}{" "}
            matched (minimum {MIN_REPORTS_THRESHOLD} required)
          </p>
        </div>
      </section>
    );
  }

  const fields = [
    {
      label: "Visibility",
      most_common: summary.visibility.most_common,
      distribution: summary.visibility.distribution,
      colors: VIS_COLORS,
    },
    {
      label: "Surge",
      most_common: summary.surge.most_common,
      distribution: summary.surge.distribution,
      colors: SURGE_COLORS,
    },
    {
      label: "Entry / Exit",
      most_common: summary.entry_exit.most_common,
      distribution: summary.entry_exit.distribution,
      colors: ENTRY_COLORS,
    },
    {
      label: "Current",
      most_common: summary.current.most_common,
      distribution: summary.current.distribution,
      colors: CURRENT_COLORS,
    },
    {
      label: "Surface",
      most_common: summary.surface.most_common,
      distribution: summary.surface.distribution,
      colors: SURFACE_COLORS,
    },
  ];

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Historical Patterns
      </h2>
      <p className="text-xs sm:text-sm text-slate-600 mb-3 sm:mb-4">
        Based on {summary.report_count} dives under similar conditions:
      </p>

      {/* Donut chart grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex flex-col items-center bg-slate-50 rounded-lg p-3"
          >
            <DonutChart
              distribution={field.distribution}
              colorMap={field.colors}
              size={56}
            />
            <p className="text-xs font-medium text-slate-700 mt-2">
              {field.label}
            </p>
            <p className="text-xs text-slate-500 capitalize mt-0.5">
              {field.most_common}
            </p>
          </div>
        ))}
      </div>

      {/* Detailed breakdown with bars + legend */}
      <details className="group">
        <summary className="text-xs font-medium text-blue-600 cursor-pointer hover:text-blue-700 select-none">
          Show detailed breakdown
        </summary>
        <div className="mt-3 space-y-3 sm:space-y-4">
          {fields.map((field) => (
            <div key={field.label}>
              <div className="flex justify-between items-baseline gap-2">
                <span className="text-sm font-medium text-slate-700 shrink-0">
                  {field.label}
                </span>
                <span className="text-xs sm:text-sm text-slate-600 capitalize text-right truncate">
                  {field.most_common}
                </span>
              </div>
              <DistributionBar
                distribution={field.distribution}
                colorMap={field.colors}
              />
              <Legend
                distribution={field.distribution}
                colorMap={field.colors}
              />
            </div>
          ))}
        </div>
      </details>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500">
          Matched by swell{" "}
          {summary.matching_forecast_params.swell_height_range[0]}&ndash;
          {summary.matching_forecast_params.swell_height_range[1]} ft,{" "}
          {summary.matching_forecast_params.swell_direction.join("/")},{" "}
          {summary.matching_forecast_params.swell_period_range[0]}&ndash;
          {summary.matching_forecast_params.swell_period_range[1]}s period,{" "}
          {summary.matching_forecast_params.wind_category.join("/")} wind
        </p>
      </div>

      <p className="mt-3 text-xs text-slate-400 italic">
        Historical patterns are informative, not a guarantee of conditions.
      </p>
    </section>
  );
}
