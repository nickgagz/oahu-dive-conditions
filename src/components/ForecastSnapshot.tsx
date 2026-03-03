"use client";

import { ForecastSnapshot as ForecastSnapshotType } from "@/lib/types";

interface ForecastSnapshotProps {
  forecast: ForecastSnapshotType;
}

function windDirectionLabel(deg: number): string {
  const dirs = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const idx = Math.round(deg / 22.5) % 16;
  return dirs[idx];
}

export default function ForecastSnapshotDisplay({
  forecast,
}: ForecastSnapshotProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          Forecast Snapshot
        </h2>
        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium shrink-0">
          Live Data
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-3 sm:mb-4">
        Live data from Open-Meteo &amp; NOAA. Used to match historical reports.
      </p>

      {/* 3-col on ≥640px, 2-col on mobile with wind spanning full width */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs text-slate-500 font-medium">Swell</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">
            {forecast.swell_height} ft {forecast.swell_direction}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs text-slate-500 font-medium">Period</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">
            {forecast.swell_period}s
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs text-slate-500 font-medium">Wind</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">
            {forecast.wind_speed} mph {windDirectionLabel(forecast.wind_direction)}
          </p>
          <p className="text-xs text-slate-500 capitalize">
            {forecast.wind_category}
          </p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2.5 sm:p-3">
          <p className="text-xs text-slate-500 font-medium">Tide</p>
          <p className="text-sm font-semibold text-slate-800 mt-0.5 capitalize">
            {forecast.tide_state}
          </p>
        </div>
      </div>
    </section>
  );
}
