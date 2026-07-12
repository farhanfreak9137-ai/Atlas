"use client";

import { useEffect, useState } from "react";

import { Reminder } from "@/types/reminder";
import { ReminderService } from "@/services/reminder.service";

export function useReminders() {
  const [reminders, setReminders] = useState<
    Reminder[]
  >([]);

  function refresh() {
    setReminders(
      ReminderService.getUpcoming()
    );
  }

  useEffect(() => {
    refresh();
  }, []);

  function create(
    title: string,
    description: string,
    dueDate: string
  ) {
    ReminderService.create(
      title,
      description,
      dueDate
    );

    refresh();
  }

  function toggle(id: string) {
    ReminderService.toggle(id);
    refresh();
  }

  function remove(id: string) {
    ReminderService.delete(id);
    refresh();
  }

  return {
    reminders,
    create,
    toggle,
    remove,
    refresh,
  };
}