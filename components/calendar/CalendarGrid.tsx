"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Sparkles } from "lucide-react";
import { useCalendar } from "@/hooks/useCalendar";
import { GlassCard } from "@/components/ui/GlassCard";
import { CalendarDay } from "./CalendarDay";
import { CalendarSidebar } from "./CalendarSidebar";

export function CalendarGrid() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const { getEventsForDate } = useCalendar();

  if (!mounted) {
    return null;
  }

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  function previousMonth() {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  }

  function nextMonth() {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  }

  function goToToday() {
    const now = new Date();
    setCurrentDate(now);
    setSelectedDate(now.toISOString().split("T")[0]);
  }

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const firstWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const days: (Date | null)[] = [];

  for (let i = 0; i < firstWeekday; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(currentYear, currentMonth, day));
  }

  return (
    <div className="grid gap-6 xl:grid-cols-3 page-enter">
      <div className="xl:col-span-2">
        <GlassCard className="p-6 sm:p-8 space-y-6">

          {/* Calendar Header Nav */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 text-[var(--primary)] shadow-sm">
                <CalendarIcon size={20} />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold font-heading tracking-tight text-[var(--text)]">
                  {currentDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </h2>
                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  Schedule, tasks, habits & goals
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goToToday}
                className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] hover:bg-[var(--surface-hover)] px-3.5 py-2 text-xs font-semibold text-[var(--text)] transition"
              >
                <Sparkles size={13} className="text-[var(--primary)]" />
                Today
              </button>

              <div className="flex items-center gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] p-1">
                <button
                  onClick={previousMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={nextMonth}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)] transition"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-[var(--text-tertiary)] py-1 border-y border-[var(--border)]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-1">{day}</div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2 sm:gap-2.5">
            {days.map((date, index) => (
              <CalendarDay
                key={index}
                date={date}
                isSelected={date !== null && selectedDate === date.toISOString().split("T")[0]}
                events={
                  date
                    ? getEventsForDate(date.toISOString().split("T")[0])
                    : []
                }
                onSelect={setSelectedDate}
              />
            ))}
          </div>

        </GlassCard>
      </div>

      {/* Sidebar for Selected Date */}
      <CalendarSidebar
        selectedDate={selectedDate}
        events={selectedEvents}
      />
    </div>
  );
}