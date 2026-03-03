"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { DiveSite } from "@/lib/types";
import { DIVE_SITES } from "@/lib/sites";

interface SiteMapProps {
  activeSite: DiveSite;
  onSiteChange: (site: DiveSite) => void;
}

// Region colors for markers
const REGION_COLORS: Record<string, string> = {
  "West Oahu": "#2563eb",   // blue-600
  "North Shore": "#059669",  // emerald-600
  "East Oahu": "#d97706",   // amber-600
  "South Oahu": "#dc2626",  // red-600
};

// Oahu center & bounds
const OAHU_CENTER: L.LatLngTuple = [21.47, -157.97];
const OAHU_BOUNDS: L.LatLngBoundsExpression = [
  [21.22, -158.32],
  [21.74, -157.62],
];

function createMarkerIcon(color: string, isActive: boolean): L.DivIcon {
  const size = isActive ? 28 : 20;
  const borderWidth = isActive ? 3 : 2;
  const innerSize = isActive ? 12 : 8;

  return L.divIcon({
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2 - 4],
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${isActive ? color : "white"};
        border: ${borderWidth}px solid ${color};
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        transition: transform 0.15s ease;
        ${isActive ? `animation: pulse-ring 1.5s ease-out infinite;` : ""}
      ">
        ${!isActive ? `<div style="width:${innerSize}px;height:${innerSize}px;border-radius:50%;background:${color};"></div>` : ""}
      </div>
    `,
  });
}

export default function SiteMap({ activeSite, onSiteChange }: SiteMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize map once
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: OAHU_CENTER,
      zoom: 11,
      minZoom: 10,
      maxZoom: 16,
      maxBounds: OAHU_BOUNDS,
      maxBoundsViscosity: 0.8,
      zoomControl: true,
      attributionControl: true,
    });

    // Use a clean, light map tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Add markers for all sites
    for (const site of DIVE_SITES) {
      const color = REGION_COLORS[site.region] || "#6366f1";
      const isActive = site.id === activeSite.id;
      const icon = createMarkerIcon(color, isActive);

      const marker = L.marker([site.lat, site.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:system-ui,sans-serif;min-width:160px;">
            <strong style="font-size:13px;">${site.name}</strong>
            <p style="font-size:11px;color:#64748b;margin:4px 0 0;line-height:1.4;">${site.exposure_notes}</p>
          </div>`,
          { closeButton: false, maxWidth: 220 }
        );

      marker.on("click", () => {
        onSiteChange(site);
      });

      markersRef.current.set(site.id, marker);
    }

    // Invalidate size after mount (fixes grey tiles on initial render)
    setTimeout(() => map.invalidateSize(), 100);

    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update marker icons when active site changes
  useEffect(() => {
    for (const site of DIVE_SITES) {
      const marker = markersRef.current.get(site.id);
      if (!marker) continue;

      const color = REGION_COLORS[site.region] || "#6366f1";
      const isActive = site.id === activeSite.id;
      marker.setIcon(createMarkerIcon(color, isActive));

      // Bring active marker to front
      if (isActive) {
        marker.setZIndexOffset(1000);
      } else {
        marker.setZIndexOffset(0);
      }
    }

    // Pan to active site
    if (mapRef.current) {
      mapRef.current.panTo([activeSite.lat, activeSite.lng], { animate: true, duration: 0.4 });
    }
  }, [activeSite.id]);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Oahu Dive Sites
      </h2>
      <p className="text-xs text-slate-500 mb-3">
        Tap a marker to select a site. Pinch or scroll to zoom.
      </p>

      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="w-full rounded-lg overflow-hidden border border-slate-200"
        style={{ height: 320 }}
      />

      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 justify-center">
        {Object.entries(REGION_COLORS).map(([region, color]) => (
          <div key={region} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-slate-500">{region}</span>
          </div>
        ))}
      </div>

      {/* Active site info */}
      <div className="mt-3 pt-3 border-t border-slate-100">
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-medium text-slate-600">{activeSite.name}:</span>{" "}
          {activeSite.exposure_notes}
        </p>
      </div>
    </div>
  );
}
