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
  return (
    <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />

        <span
          className={
            task.completed
              ? "line-through text-zinc-500"
              : "text-white"
          }
        >
          {task.title}
        </span>
        <p
  className={`text-xs font-medium ${
    task.priority === "high"
      ? "text-red-500"
      : task.priority === "medium"
      ? "text-yellow-500"
      : "text-green-500"
  }`}
>
  {task.priority.toUpperCase()}
</p>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-lg bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
}