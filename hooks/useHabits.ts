"use client";

import { useEffect, useState } from "react";

import { Habit } from "@/types/habit";
import { HabitService } from "@/services/habit.service";

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  function refresh() {
    setHabits(HabitService.getAll());
  }

  useEffect(() => {
    refresh();
  }, []);

  function create(
    title: string,
    icon: string,
    color: string,
    target: number
  ) {
    HabitService.create(title, icon, color, target);
    refresh();
  }

  function toggle(id: string) {
    HabitService.toggle(id);
    refresh();
  }

  function remove(id: string) {
    HabitService.delete(id);
    refresh();
  }

  return {
    habits,
    create,
    toggle,
    remove,
    refresh,
  };
}