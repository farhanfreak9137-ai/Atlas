"use client";

import { CalendarEvent } from "@/types/calendar";
import { GlassCard } from "@/components/ui/GlassCard";
import { CalendarDays, CheckSquare, Flame, Target } from "lucide-react";

interface CalendarSidebarProps {
  selectedDate: string | null;
  events: CalendarEvent[];
}

export function CalendarSidebar({
  selectedDate,
  events,
}: CalendarSidebarProps) {
  return (
    <GlassCard className="p-6 h-full flex flex-col">
      <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--border)]">
        <CalendarDays size={20} className="text-[var(--primary)]" />
        <h2 className="text-lg font-bold font-heading text-[var(--text)]">
          {selectedDate
            ? new Date(selectedDate + "T00:00:00").toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })
            : "Select a Date"}
        </h2>
      </div>

      {!selectedDate ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="h-12 w-12 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] mb-3">
            <CalendarDays size={24} />
          </div>
          <p className="text-sm font-semibold text-[var(--text)]">No Date Selected</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Click any day on the calendar grid to view scheduled events, tasks, and habits.
          </p>
        </div>
      ) : (
        <div className="mt-4 flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
          {events.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-12">
              <p className="text-sm font-semibold text-[var(--text-secondary)]">No events scheduled</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">
                Your schedule is clear for this day.
              </p>
            </div>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] p-3.5 flex items-center justify-between gap-3 hover:bg-[var(--surface-hover)] transition"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {event.type === "task" && (
                    <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-500 flex items-center justify-center shrink-0">
                      <CheckSquare size={16} />
                    </div>
                  )}
                  {event.type === "habit" && (
                    <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                      <Flame size={16} />
                    </div>
                  )}
                  {event.type === "goal" && (
                    <div className="h-8 w-8 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500 flex items-center justify-center shrink-0">
                      <Target size={16} />
                    </div>
                  )}

                  <span className="text-sm font-medium text-[var(--text)] truncate">
                    {event.title}
                  </span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[var(--surface-3)] text-[var(--text-secondary)] shrink-0 capitalize">
                  {event.type}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </GlassCard>
  );
}