"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { DiveSite } from "@/lib/types";
import { DIVE_SITES } from "@/lib/sites";

// Dynamically import SiteMap (Leaflet can't run server-side)
const SiteMap = dynamic(() => import("./SiteMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="w-full rounded-lg bg-slate-100 flex items-center justify-center" style={{ height: 320 }}>
        <div className="animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    </div>
  ),
});

interface SiteSelectorProps {
  activeSite: DiveSite;
  onSiteChange: (site: DiveSite) => void;
}

export default function SiteSelector({ activeSite, onSiteChange }: SiteSelectorProps) {
  const [view, setView] = useState<"list" | "map">("list");

  if (view === "map") {
    return (
      <div className="space-y-2">
        <div className="flex justify-end">
          <button
            onClick={() => setView("list")}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded transition-colors"
          >
            ☰ List view
          </button>
        </div>
        <SiteMap activeSite={activeSite} onSiteChange={onSiteChange} />
      </div>
    );
  }

  // Group sites by region
  const regions = new Map<string, DiveSite[]>();
  for (const site of DIVE_SITES) {
    const list = regions.get(site.region) || [];
    list.push(site);
    regions.set(site.region, list);
  }

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-base sm:text-lg font-semibold text-slate-800">
          Dive Site
        </h2>
        <button
          onClick={() => setView("map")}
          className="text-xs text-blue-600 hover:text-blue-700 font-medium px-2 py-1 rounded transition-colors"
        >
          🗺️ Map view
        </button>
      </div>
      <p className="text-xs text-slate-500 mb-3">
        Select a shore dive location on Oahu.
      </p>

      <div className="space-y-3">
        {Array.from(regions.entries()).map(([region, sites]) => (
          <div key={region}>
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-1.5">
              {region}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {sites.map((site) => {
                const isActive = site.id === activeSite.id;
                return (
                  <button
                    key={site.id}
                    onClick={() => onSiteChange(site)}
                    className={`text-left px-3 py-2.5 rounded-lg text-sm transition-colors active:scale-[0.98] ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <span className="font-medium block leading-tight">{site.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Exposure notes for the active site */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-medium text-slate-600">{activeSite.name}:</span>{" "}
          {activeSite.exposure_notes}
        </p>
      </div>
    </section>
  );
}
