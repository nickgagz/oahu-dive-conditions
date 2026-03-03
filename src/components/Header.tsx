"use client";

import { DiveSite } from "@/lib/types";

interface HeaderProps {
  site: DiveSite;
}

export default function Header({ site }: HeaderProps) {
  return (
    <header className="bg-slate-900 text-white">
      <div className="px-4 lg:px-8 xl:px-12 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          {site.name}
        </h1>
        <p className="mt-0.5 text-slate-400 text-sm">
          Shore dive &bull; {site.region}
        </p>
        <p className="mt-2 text-xs text-slate-400 leading-relaxed">
          {site.exposure_notes}
        </p>
        <p className="mt-2 sm:mt-3 text-xs text-slate-500 leading-relaxed border-t border-slate-700 pt-2 sm:pt-3">
          Based on diver reports and recorded environmental conditions. This
          tool presents historical patterns only and does not provide safety
          advice or dive recommendations.
        </p>
      </div>
    </header>
  );
}
