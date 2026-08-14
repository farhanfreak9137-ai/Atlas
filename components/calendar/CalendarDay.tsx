"use client";

import { CalendarEvent } from "@/types/calendar";

interface CalendarDayProps {
  date: Date | null;
  events: CalendarEvent[];
  isSelected?: boolean;
  onSelect: (date: string) => void;
}

export function CalendarDay({
  date,
  events,
  isSelected,
  onSelect,
}: CalendarDayProps) {
  if (!date) {
    return (
      <div className="aspect-square rounded-2xl bg-transparent" />
    );
  }

  const today = new Date();
  const isToday = today.toDateString() === date.toDateString();

  const taskCount = events.filter((e) => e.type === "task").length;
  const habitCount = events.filter((e) => e.type === "habit").length;
  const goalCount = events.filter((e) => e.type === "goal").length;
  const totalEvents = events.length;

  return (
    <button
      type="button"
      onClick={() => onSelect(date.toISOString().split("T")[0])}
      className={`
        group relative aspect-square rounded-2xl p-2 text-left transition-all duration-200
        border flex flex-col justify-between overflow-hidden
        ${
          isSelected
            ? "border-[var(--primary)] bg-[var(--primary)]/15 shadow-[0_0_15px_rgba(16,185,129,0.2)] ring-1 ring-[var(--primary)]"
            : isToday
            ? "border-[var(--primary)]/50 bg-[var(--primary)]/8 shadow-sm"
            : "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.03))] hover:bg-[var(--surface-hover)] hover:border-[var(--primary)]/30"
        }
      `}
    >
      {/* Date Header */}
      <div className="flex items-center justify-between w-full">
        <span
          className={`
            flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold font-mono
            ${
              isToday
                ? "bg-[var(--primary)] text-white shadow-[0_0_8px_var(--primary-glow)]"
                : isSelected
                ? "text-[var(--primary)] font-bold"
                : "text-[var(--text)]"
            }
          `}
        >
          {date.getDate()}
        </span>

        {/* Total Badge if > 0 */}
        {totalEvents > 0 && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--primary)]/15 text-[var(--primary)] font-mono">
            {totalEvents}
          </span>
        )}
      </div>

      {/* Event Indicator Pills / Dots */}
      <div className="flex flex-wrap gap-1 mt-auto pt-1">
        {taskCount > 0 && (
          <div className="flex items-center gap-1 rounded-md bg-blue-500/15 border border-blue-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-blue-500 max-w-full truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
            <span className="hidden sm:inline truncate">{taskCount} Task</span>
          </div>
        )}

        {habitCount > 0 && (
          <div className="flex items-center gap-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-500 max-w-full truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="hidden sm:inline truncate">{habitCount} Habit</span>
          </div>
        )}

        {goalCount > 0 && (
          <div className="flex items-center gap-1 rounded-md bg-purple-500/15 border border-purple-500/30 px-1.5 py-0.5 text-[10px] font-semibold text-purple-500 max-w-full truncate">
            <span className="h-1.5 w-1.5 rounded-full bg-purple-500 shrink-0" />
            <span className="hidden sm:inline truncate">{goalCount} Goal</span>
          </div>
        )}
      </div>
    </button>
  );
}