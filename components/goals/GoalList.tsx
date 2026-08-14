"use client";

import { useEffect } from "react";

import { useGoalStore } from "@/stores/goal.store";
import { EmptyState } from "@/components/common/EmptyState";

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
        <EmptyState
          title="No goals set yet"
          description="Create your first goal above to start tracking your long-term milestones."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
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