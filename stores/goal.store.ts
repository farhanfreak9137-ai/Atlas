import { create } from "zustand";

import { Goal } from "@/types/goal";
import { GoalCategory } from "@/types/goal";
import { GoalService } from "@/services/goal.service";

interface GoalStore {
  goals: Goal[];

  load: () => void;

  create: (
    title: string,
    category: GoalCategory,
    target: number,
    deadline: string
  ) => void;

  updateProgress: (
    id: string,
    current: number
  ) => void;

  remove: (id: string) => void;
}

export const useGoalStore = create<GoalStore>((set) => ({
  goals: [],

  load: () => {
    set({
      goals: GoalService.getAll(),
    });
  },

  create: (
    title,
    category,
    target,
    deadline
  ) => {
    GoalService.create(
      title,
      category,
      target,
      deadline
    );

    set({
      goals: GoalService.getAll(),
    });
  },

  updateProgress: (
    id,
    current
  ) => {
    GoalService.updateProgress(
      id,
      current
    );

    set({
      goals: GoalService.getAll(),
    });
  },

  remove: (id) => {
    GoalService.delete(id);

    set({
      goals: GoalService.getAll(),
    });
  },
}));