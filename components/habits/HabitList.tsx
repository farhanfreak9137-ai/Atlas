"use client";

import { useHabits } from "@/hooks/useHabits";

import { HabitForm } from "./HabitForm";
import { HabitItem } from "./HabitItem";

export function HabitList() {
  const {
    habits,
    create,
    toggle,
    remove,
  } = useHabits();

  return (
    <div className="space-y-8">
      <HabitForm onAdd={create} />

      {habits.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center">
          <h3 className="text-xl font-semibold text-white">
            No habits yet
          </h3>

          <p className="mt-2 text-zinc-500">
            Create your first habit above.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
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