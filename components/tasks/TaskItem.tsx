import { CalendarDays, Trash2 } from "lucide-react";

import { Task } from "@/types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({
  task,
  onToggle,
  onDelete,
}: TaskItemProps) {
  const priorityColors = {
    high: "bg-red-500/15 text-red-400 border border-red-500/20",
    medium: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
    low: "bg-green-500/15 text-green-400 border border-green-500/20",
  };

  return (
    <div className="flex items-center justify-between rounded-2xl border border-zinc-800 bg-zinc-950 p-5 transition-all duration-200 hover:border-blue-500 hover:bg-zinc-900">
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="mt-1 h-5 w-5 cursor-pointer accent-blue-600"
        />

        <div className="space-y-2">
          <h3
            className={`text-lg font-semibold ${
              task.completed
                ? "text-zinc-500 line-through"
                : "text-white"
            }`}
          >
            {task.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority}
            </span>

            {task.dueDate && (
              <span className="flex items-center gap-1 rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-400">
                <CalendarDays size={14} />
                {task.dueDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-xl p-2 text-zinc-500 transition hover:bg-red-500/10 hover:text-red-500"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}