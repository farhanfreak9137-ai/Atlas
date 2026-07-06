"use client";

import { Goal } from "@/types/goal";

interface GoalItemProps {
  goal: Goal;
  onUpdate: (
    id: string,
    current: number
  ) => void;
  onDelete: (id: string) => void;
}

export function GoalItem({
  goal,
  onUpdate,
  onDelete,
}: GoalItemProps) {
  const progress = Math.min(
    100,
    (goal.current / goal.target) * 100
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {goal.title}
          </h3>

          <p className="text-sm text-zinc-500">
            {goal.category}
          </p>

          <p className="mt-1 text-sm">
            {goal.current} / {goal.target}
          </p>

          <p className="text-xs text-zinc-500">
            Deadline: {goal.deadline || "None"}
          </p>
        </div>

        <button
          onClick={() => onDelete(goal.id)}
          className="rounded-lg bg-red-600 px-3 py-2 text-sm hover:bg-red-500"
        >
          Delete
        </button>
      </div>

      <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full bg-blue-500 transition-all duration-300"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <div className="mt-5 flex gap-2">
        <button
          onClick={() =>
            onUpdate(
              goal.id,
              Math.min(
                goal.current + 1,
                goal.target
              )
            )
          }
          className="rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-500"
        >
          + Progress
        </button>

        <button
          onClick={() =>
            onUpdate(goal.id, 0)
          }
          className="rounded-lg bg-zinc-700 px-4 py-2 hover:bg-zinc-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
}