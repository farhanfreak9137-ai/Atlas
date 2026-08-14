"use client";

import { useEffect } from "react";

import { useHabitStore } from "@/stores/habit.store";
import { EmptyState } from "@/components/common/EmptyState";

import { HabitForm } from "./HabitForm";
import { HabitItem } from "./HabitItem";

export function HabitList() {
  const {
    habits,
    load,
    create,
    toggle,
    remove,
  } = useHabitStore();

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-8">
      <HabitForm onAdd={create} />

      {habits.length === 0 ? (
        <EmptyState
          title="No habits yet"
          description="Create your first habit above to track your daily progress."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={toggle}
              onDelete={remove}
            />
          ))}
        </div>
      )}
    </div>
  );
}