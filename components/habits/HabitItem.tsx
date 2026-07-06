import { Trash2 } from "lucide-react";

import { Habit } from "@/types/habit";

interface HabitItemProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitItem({
  habit,
  onToggle,
  onDelete,
}: HabitItemProps) {
  const progress = Math.min(
  100,
  (habit.progress / habit.target) * 100
);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 transition hover:border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="text-3xl">
            {habit.icon}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">
              {habit.title}
            </h3>

            <p className="text-sm text-zinc-400">
              {habit.progress} / {habit.target}
            </p>

            <p className="mt-1 text-sm text-orange-400">
              🔥 {habit.streak} day streak
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-lg p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
      </div>

      <div className="mt-5 h-2 overflow-hidden rounded-full bg-zinc-800">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
  habit.color === "green"
    ? "bg-green-500"
    : habit.color === "red"
    ? "bg-red-500"
    : habit.color === "yellow"
    ? "bg-yellow-500"
    : habit.color === "purple"
    ? "bg-purple-500"
    : "bg-blue-500"
}`}
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <button
        onClick={() => onToggle(habit.id)}
        className={`mt-5 w-full rounded-xl py-3 font-medium transition ${
          habit.completedToday
            ? "bg-green-600 hover:bg-green-500"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {habit.completedToday
          ? "Completed Today ✅"
          : "Mark Complete"}
      </button>
    </div>
  );
}