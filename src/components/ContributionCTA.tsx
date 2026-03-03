"use client";

import Link from "next/link";

export default function ContributionCTA() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-sm p-4 sm:p-5 text-white">
      <p className="text-sm font-medium">
        Dove Electric Beach around this time?
      </p>
      <p className="text-xs text-blue-200 mt-1">
        Help the community by sharing what conditions were like.
      </p>
      <div className="mt-3">
        <Link
          href="/report"
          className="inline-block bg-white text-blue-700 font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-blue-50 active:bg-blue-100 transition-colors"
        >
          Add Your Report
        </Link>
      </div>
    </section>
  );
}

