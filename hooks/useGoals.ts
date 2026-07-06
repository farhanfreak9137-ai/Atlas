"use client";

import { useEffect, useState } from "react";

import { Goal, GoalCategory } from "@/types/goal";
import { GoalService } from "@/services/goal.service";

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  function refresh() {
    setGoals(GoalService.getAll());
  }

  useEffect(() => {
    refresh();
  }, []);

  function create(
    title: string,
    category: GoalCategory,
    target: number,
    deadline: string
  ) {
    GoalService.create(
      title,
      category,
      target,
      deadline
    );

    refresh();
  }

  function updateProgress(
    id: string,
    current: number
  ) {
    GoalService.updateProgress(id, current);

    refresh();
  }

  function remove(id: string) {
    GoalService.delete(id);

    refresh();
  }

  return {
    goals,
    create,
    updateProgress,
    remove,
    refresh,
  };
}