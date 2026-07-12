"use client";

import { useEffect } from "react";

import { useGoalStore } from "@/stores/goal.store";

import { GoalForm } from "./GoalForm";
import { GoalItem } from "./GoalItem";

export function GoalList() {
  const {
    goals,
    load,
    create,
    updateProgress,
    remove,
  } = useGoalStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-8">
      <GoalForm onAdd={create} />

      {goals.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center">
          <h3 className="text-xl font-semibold text-white">
            No goals yet
          </h3>

          <p className="mt-2 text-zinc-500">
            Create your first goal above.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {goals.map((goal) => (
            <GoalItem
              key={goal.id}
              goal={goal}
              onUpdate={updateProgress}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}