"use client";

import { useMemo } from "react";

import { useTasks } from "./useTasks";
import { useHabits } from "./useHabits";
import { useGoals } from "./useGoals";

export function useDashboard() {
  const { tasks } = useTasks();
  const { habits } = useHabits();
  const { goals } = useGoals();

  return useMemo(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(
      (task) => task.completed
    ).length;

    const activeTasks = totalTasks - completedTasks;

    const completedHabits = habits.filter(
      (habit) => habit.completedToday
    ).length;

    const activeGoals = goals.filter(
      (goal) => !goal.completed
    ).length;

    const taskRate =
      totalTasks === 0
        ? 100
        : (completedTasks / totalTasks) * 100;

    const habitRate =
      habits.length === 0
        ? 100
        : (completedHabits / habits.length) * 100;

    const goalRate =
      goals.length === 0
        ? 100
        : ((goals.length - activeGoals) / goals.length) * 100;

    const productivity = Math.round(
      (taskRate + habitRate + goalRate) / 3
    );

    return {
      tasks: {
        total: totalTasks,
        completed: completedTasks,
        active: activeTasks,
      },

      habits: {
        total: habits.length,
        completed: completedHabits,
      },

      goals: {
        total: goals.length,
        active: activeGoals,
      },

      productivity,
    };
  }, [tasks, habits, goals]);
}