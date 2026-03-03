"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-md text-center">
        <div className="text-4xl mb-4">🌊</div>
        <h1 className="text-xl font-bold text-slate-800">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">
          We hit an unexpected problem loading this page. This could be a
          temporary issue with our data sources.
        </p>
        {error.digest && (
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Error: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center">
          <button
            onClick={reset}
            className="bg-blue-600 text-white font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
          <a
            href="/"
            className="bg-slate-100 text-slate-700 font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}

