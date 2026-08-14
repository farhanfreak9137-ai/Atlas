"use client";

import { useEffect, useMemo } from "react";

import { useTaskStore } from "@/stores/task.store";
import { useHabitStore } from "@/stores/habit.store";
import { useGoalStore } from "@/stores/goal.store";
import { GlassCard } from "@/components/ui/GlassCard";

export function ActivityFeed() {
  const {
    tasks,
    load: loadTasks,
  } = useTaskStore();

  const {
    habits,
    load: loadHabits,
  } = useHabitStore();

  const {
    goals,
    load: loadGoals,
  } = useGoalStore();

  useEffect(() => {
    loadTasks();
    loadHabits();
    loadGoals();
  }, [loadTasks, loadHabits, loadGoals]);

  const activities = useMemo(() => {
    return [
      ...tasks.map((task) => ({
        id: `task-${task.id}`,
        title: `📝 ${task.title}`,
        type: "task",
      })),

      ...habits.map((habit) => ({
        id: `habit-${habit.id}`,
        title: `🔥 ${habit.title}`,
        type: "habit",
      })),

      ...goals.map((goal) => ({
        id: `goal-${goal.id}`,
        title: `🎯 ${goal.title}`,
        type: "goal",
      })),
    ].slice(0, 8);
  }, [tasks, habits, goals]);

  return (
    <GlassCard>
      <h2 className="mb-5 text-xl font-bold font-heading text-[var(--text)]">
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-[var(--text-tertiary)] font-medium italic text-sm">
            Nothing yet.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] p-3 text-[var(--text)] font-medium text-sm hover:bg-[var(--surface-hover)] transition"
            >
              {activity.title}
            </div>
          ))
        )}
      </div>
    </GlassCard>
  );
}