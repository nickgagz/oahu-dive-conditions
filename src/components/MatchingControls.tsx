"use client";

import { MatchingFilters, SwellDirectionBucket, WindCategory } from "@/lib/types";

interface MatchingControlsProps {
  filters: MatchingFilters;
  onFiltersChange: (filters: MatchingFilters) => void;
}

const ALL_SWELL_DIRECTIONS: SwellDirectionBucket[] = [
  "N", "NE", "E", "SE", "S", "SW", "W", "NW",
];

const ALL_WIND_CATEGORIES: WindCategory[] = ["offshore", "onshore", "cross"];

function toOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function parseOneDecimal(raw: string): number {
  return toOneDecimal(parseFloat(raw) || 0);
}

export default function MatchingControls({
  filters,
  onFiltersChange,
}: MatchingControlsProps) {
  const toggleDirection = (dir: SwellDirectionBucket) => {
    const current = filters.swell_directions;
    const next = current.includes(dir)
      ? current.filter((d) => d !== dir)
      : [...current, dir];
    if (next.length > 0) {
      onFiltersChange({ ...filters, swell_directions: next });
    }
  };

  const toggleWind = (cat: WindCategory) => {
    const current = filters.wind_categories;
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    if (next.length > 0) {
      onFiltersChange({ ...filters, wind_categories: next });
    }
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Adjust Matching
      </h2>
      <p className="text-xs text-slate-500 mb-3 sm:mb-4">
        Fine-tune which historical reports are matched.
      </p>

      <div className="space-y-4">
        {/* Swell Height Range */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Swell Height (ft)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={20}
              step={0.1}
              value={toOneDecimal(filters.swell_height_range[0])}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  swell_height_range: [
                    parseOneDecimal(e.target.value),
                    filters.swell_height_range[1],
                  ],
                })
              }
              className="w-20 sm:w-20 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-slate-400 text-sm">&ndash;</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={20}
              step={0.1}
              value={toOneDecimal(filters.swell_height_range[1])}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  swell_height_range: [
                    filters.swell_height_range[0],
                    parseOneDecimal(e.target.value),
                  ],
                })
              }
              className="w-20 sm:w-20 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Swell Period Range */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Swell Period (s)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={25}
              step={0.1}
              value={toOneDecimal(filters.swell_period_range[0])}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  swell_period_range: [
                    parseOneDecimal(e.target.value),
                    filters.swell_period_range[1],
                  ],
                })
              }
              className="w-20 sm:w-20 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-slate-400 text-sm">&ndash;</span>
            <input
              type="number"
              inputMode="decimal"
              min={0}
              max={25}
              step={0.1}
              value={toOneDecimal(filters.swell_period_range[1])}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  swell_period_range: [
                    filters.swell_period_range[0],
                    parseOneDecimal(e.target.value),
                  ],
                })
              }
              className="w-20 sm:w-20 rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Swell Direction */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Swell Direction
          </label>
          <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-1.5 sm:gap-1.5">
            {ALL_SWELL_DIRECTIONS.map((dir) => (
              <button
                key={dir}
                onClick={() => toggleDirection(dir)}
                className={`py-2 sm:py-1.5 px-3 rounded-lg text-xs font-medium transition-colors active:scale-95 ${
                  filters.swell_directions.includes(dir)
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 active:bg-slate-300"
                }`}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Wind Category */}
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1.5">
            Wind
          </label>
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-1.5 sm:gap-1.5">
            {ALL_WIND_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => toggleWind(cat)}
                className={`py-2 sm:py-1.5 px-3 rounded-lg text-xs font-medium capitalize transition-colors active:scale-95 ${
                  filters.wind_categories.includes(cat)
                    ? "bg-blue-100 text-blue-700 border border-blue-300"
                    : "bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200 active:bg-slate-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
