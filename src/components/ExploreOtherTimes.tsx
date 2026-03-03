"use client";

import { useMemo } from "react";
import { TimeSlot, TIME_SLOT_HOURS } from "@/lib/types";

interface ExploreOtherTimesProps {
  currentDate: string;
  currentTimeSlot: TimeSlot | null;
  onSelectSlot: (date: string, time: string) => void;
}

const SLOTS: TimeSlot[] = ["early-morning", "mid-morning", "afternoon", "evening"];

// Shorter labels for mobile, full labels for desktop
const SLOT_LABELS_SHORT: Record<TimeSlot, string> = {
  "early-morning": "Early",
  "mid-morning": "Mid AM",
  afternoon: "Afternoon",
  evening: "Evening",
};

const SLOT_LABELS_FULL: Record<TimeSlot, string> = {
  "early-morning": "Early AM",
  "mid-morning": "Mid-Morning",
  afternoon: "Afternoon",
  evening: "Evening",
};

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00");
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

function timeFromHour(hour: number): string {
  return `${hour.toString().padStart(2, "0")}:00`;
}

function getCurrentSlot(time: string): TimeSlot | null {
  const hour = parseInt(time.split(":")[0], 10);
  if (hour >= 5 && hour < 8) return "early-morning";
  if (hour >= 8 && hour < 11) return "mid-morning";
  if (hour >= 11 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 20) return "evening";
  return null;
}

function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function ExploreOtherTimes({
  currentDate,
  currentTimeSlot,
  onSelectSlot,
}: ExploreOtherTimesProps) {
  // Always anchor the grid to today, not the selected date
  const today = useMemo(() => getToday(), []);
  const dates = useMemo(
    () => [0, 1, 2, 3].map((offset) => addDays(today, offset)),
    [today]
  );

  return (
    <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-5">
      <h2 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
        Explore Other Times
      </h2>
      <p className="text-xs text-slate-500 mb-3 sm:mb-4">
        See how historical patterns shift across different times.
      </p>

      <div className="space-y-2.5 sm:space-y-3">
        {dates.map((date, idx) => (
          <div key={date}>
            <p className="text-xs font-medium text-slate-600 mb-1 sm:mb-1.5">
              {idx === 0 ? "Today" : formatDate(date)}
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
              {SLOTS.map((slot) => {
                const isActive =
                  date === currentDate && currentTimeSlot === slot;
                return (
                  <button
                    key={slot}
                    onClick={() =>
                      onSelectSlot(date, timeFromHour(TIME_SLOT_HOURS[slot]))
                    }
                    className={`py-2.5 sm:py-2 px-1 rounded-lg text-xs font-medium transition-colors active:scale-95 ${
                      isActive
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200 active:bg-slate-300"
                    }`}
                  >
                    {/* Short labels on mobile, full on desktop */}
                    <span className="sm:hidden">{SLOT_LABELS_SHORT[slot]}</span>
                    <span className="hidden sm:inline">{SLOT_LABELS_FULL[slot]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="mt-3 sm:mt-4 text-xs text-slate-400 italic">
        Historical patterns are informative, not a guarantee of conditions.
      </p>
    </section>
  );
}

export { getCurrentSlot };
