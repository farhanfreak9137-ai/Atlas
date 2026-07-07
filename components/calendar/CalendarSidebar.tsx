"use client";

import { CalendarEvent } from "@/types/calendar";

interface CalendarSidebarProps {
  selectedDate: string | null;
  events: CalendarEvent[];
}

export function CalendarSidebar({
  selectedDate,
  events,
}: CalendarSidebarProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <h2 className="text-xl font-semibold">
        {selectedDate
          ? `📅 ${selectedDate}`
          : "Select a Day"}
      </h2>

      {!selectedDate ? (
        <p className="mt-4 text-zinc-500">
          Click a date to view events.
        </p>
      ) : (
        <div className="mt-6 space-y-3">
          {events.length === 0 ? (
            <p className="text-zinc-500">
              No events scheduled.
            </p>
          ) : (
            events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl border border-zinc-800 p-3"
              >
                <div className="flex items-center gap-2">
                  {event.type === "task" && "📝"}
                  {event.type === "habit" && "🔥"}
                  {event.type === "goal" && "🎯"}

                  <span>{event.title}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}