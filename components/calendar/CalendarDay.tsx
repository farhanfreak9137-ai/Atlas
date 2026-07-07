"use client";

import { CalendarEvent } from "@/types/calendar";

interface CalendarDayProps {
  date: Date | null;
  events: CalendarEvent[];
  onSelect: (date: string) => void;
}

export function CalendarDay({
  date,
  events,
  onSelect,
}: CalendarDayProps) {
  if (!date) {
    return (
      <div className="aspect-square rounded-xl bg-transparent" />
    );
  }

  const today = new Date();

  const isToday =
    today.toDateString() ===
    date.toDateString();

  const taskCount = events.filter(
    (e) => e.type === "task"
  ).length;

  const habitCount = events.filter(
    (e) => e.type === "habit"
  ).length;

  const goalCount = events.filter(
    (e) => e.type === "goal"
  ).length;

  return (
    <button
      onClick={() =>
        onSelect(
          date.toISOString().split("T")[0]
        )
      }
      className={`aspect-square rounded-xl border transition ${
        isToday
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-800 hover:border-blue-500"
      }`}
    >
      <div className="flex h-full flex-col justify-between p-2">
        <div className="text-left font-medium">
          {date.getDate()}
        </div>

        <div className="space-y-1 text-xs">
          {taskCount > 0 && (
            <div className="rounded bg-blue-500 px-1 text-white">
              {taskCount} Task
            </div>
          )}

          {habitCount > 0 && (
            <div className="rounded bg-green-500 px-1 text-white">
              {habitCount} Habit
            </div>
          )}

          {goalCount > 0 && (
            <div className="rounded bg-purple-500 px-1 text-white">
              {goalCount} Goal
            </div>
          )}
        </div>
      </div>
    </button>
  );
}