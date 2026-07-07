"use client";

import { useEffect, useState } from "react";

import { useCalendar } from "@/hooks/useCalendar";

import { CalendarDay } from "./CalendarDay";
import { CalendarSidebar } from "./CalendarSidebar";

export function CalendarGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const today = new Date();

  const [currentDate, setCurrentDate] =
    useState(today);

  const [selectedDate, setSelectedDate] =
    useState<string | null>(null);

  const currentYear =
    currentDate.getFullYear();

  const currentMonth =
    currentDate.getMonth();

  const { getEventsForDate } = useCalendar();

  if (!mounted) {
    return null;
  }

  const selectedEvents = selectedDate
    ? getEventsForDate(selectedDate)
    : [];

  function previousMonth() {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth - 1,
        1
      )
    );
  }

  function nextMonth() {
    setCurrentDate(
      new Date(
        currentYear,
        currentMonth + 1,
        1
      )
    );
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  const firstDay = new Date(
    currentYear,
    currentMonth,
    1
  );

  const lastDay = new Date(
    currentYear,
    currentMonth + 1,
    0
  );

  const firstWeekday = firstDay.getDay();

  const totalDays = lastDay.getDate();

  const days: (Date | null)[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(
      new Date(
        currentYear,
        currentMonth,
        day
      )
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3">
      <div className="xl:col-span-2">

        <div className="mb-6 flex items-center justify-between">

          <button
            onClick={previousMonth}
            className="rounded-xl border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800"
          >
            ◀
          </button>

          <div className="text-center">
            <h2 className="text-3xl font-bold">
              {currentDate.toLocaleString(
                "default",
                {
                  month: "long",
                  year: "numeric",
                }
              )}
            </h2>

            <button
              onClick={goToToday}
              className="mt-2 text-sm text-blue-400 hover:underline"
            >
              Today
            </button>
          </div>

          <button
            onClick={nextMonth}
            className="rounded-xl border border-zinc-700 px-4 py-2 transition hover:bg-zinc-800"
          >
            ▶
          </button>

        </div>

        <div className="mb-4 grid grid-cols-7 gap-2 text-center text-sm font-semibold text-zinc-500">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((date, index) => (
            <CalendarDay
              key={index}
              date={date}
              events={
                date
                  ? getEventsForDate(
                      date.toISOString().split("T")[0]
                    )
                  : []
              }
              onSelect={setSelectedDate}
            />
          ))}
        </div>

      </div>

      <CalendarSidebar
        selectedDate={selectedDate}
        events={selectedEvents}
      />

    </div>
  );
}