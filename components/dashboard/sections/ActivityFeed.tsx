"use client";

import { useEffect, useMemo } from "react";

import { useTaskStore } from "@/stores/task.store";
import { useHabitStore } from "@/stores/habit.store";
import { useGoalStore } from "@/stores/goal.store";

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
    <div className="rounded-2xl border border-accent/60 bg-accent/10 p-6">
      <h2 className="mb-5 text-xl font-semibold text-accent">
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activities.length === 0 ? (
          <p className="text-accent">
            Nothing yet.
          </p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="rounded-xl bg-accent/20 p-3"
            >
              {activity.title}
            </div>
          ))
        )}
      </div>
    </div>
  );
}