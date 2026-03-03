"use client";

interface DiveTimeSelectorProps {
  selectedDate: string; // YYYY-MM-DD
  selectedTime: string; // HH:MM
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

export default function DiveTimeSelector({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
}: DiveTimeSelectorProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Select Dive Time
      </h2>
      <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
        We&rsquo;ll use the forecast for this time to find similar past dives.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <label
            htmlFor="dive-date"
            className="block text-xs font-medium text-slate-600 mb-1"
          >
            Date
          </label>
          <input
            id="dive-date"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="dive-time"
            className="block text-xs font-medium text-slate-600 mb-1"
          >
            Time
          </label>
          <input
            id="dive-time"
            type="time"
            value={selectedTime}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </section>
  );
}

