import { create } from "zustand";

import { Habit } from "@/types/habit";
import { HabitService } from "@/services/habit.service";

interface HabitStore {
  habits: Habit[];

  load: () => void;

  create: (
    title: string,
    icon: string,
    color: string,
    target: number
  ) => void;

  toggle: (id: string) => void;

  remove: (id: string) => void;
}

export const useHabitStore = create<HabitStore>((set) => ({
  habits: [],

  load: () => {
    set({
      habits: HabitService.getAll(),
    });
  },

  create: (title, icon, color, target) => {
    HabitService.create(title, icon, color, target);

    set({
      habits: HabitService.getAll(),
    });
  },

  toggle: (id) => {
    HabitService.toggle(id);

    set({
      habits: HabitService.getAll(),
    });
  },

  remove: (id) => {
    HabitService.delete(id);

    set({
      habits: HabitService.getAll(),
    });
  },
}));