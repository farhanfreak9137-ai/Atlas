"use client";

import { CalendarService } from "@/services/calendar.service";

export function useCalendar() {
  const events = CalendarService.getEvents();

  return {
    events,

    getEventsForDate(date: string) {
      return CalendarService.getEventsForDate(date);
    },
  };
}