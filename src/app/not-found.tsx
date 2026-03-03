import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-md text-center">
        <div className="text-4xl mb-4">🐠</div>
        <h1 className="text-xl font-bold text-slate-800">Page Not Found</h1>
        <p className="text-sm text-slate-600 mt-2">
          This page doesn&rsquo;t exist. Maybe it swam away.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white font-medium text-sm px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Conditions
        </Link>
      </div>
    </div>
  );
}

