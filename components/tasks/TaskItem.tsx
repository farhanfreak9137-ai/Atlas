import { CalendarDays, Trash2, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
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
    high: "bg-rose-500/15 text-rose-400 border border-rose-500/20",
    medium: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    low: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
  };

  return (
    <GlassCard className="p-4 sm:p-5 flex items-center justify-between gap-4 border-[var(--border)] hover:border-emerald-500/30">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        {/* Custom styled checkbox */}
        <button
          onClick={() => onToggle(task.id)}
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
            task.completed
              ? "bg-emerald-500 border-emerald-500 text-white shadow-md shadow-emerald-500/30"
              : "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.05))] hover:border-emerald-500/50"
          }`}
          aria-label={task.completed ? "Mark incomplete" : "Mark complete"}
        >
          {task.completed && <Check size={14} className="stroke-[3]" />}
        </button>

        <div className="space-y-1 min-w-0 flex-1">
          <h3
            className={`text-base font-medium transition-all ${
              task.completed
                ? "text-[var(--text-tertiary)] line-through"
                : "text-[var(--text)] font-heading"
            }`}
          >
            {task.title}
          </h3>

          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-md px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                priorityColors[task.priority]
              }`}
            >
              {task.priority} priority
            </span>

            {task.dueDate && (
              <span className="flex items-center gap-1 rounded-md bg-[var(--surface-2,rgba(255,255,255,0.05))] border border-[var(--border)] px-2.5 py-0.5 text-[11px] text-[var(--text-secondary)] font-medium">
                <CalendarDays size={13} className="text-[var(--text-tertiary)]" />
                {task.dueDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => onDelete(task.id)}
        className="rounded-xl p-2 text-[var(--text-tertiary)] transition hover:bg-rose-500/10 hover:text-rose-400 shrink-0"
        aria-label="Delete task"
      >
        <Trash2 size={16} />
      </button>
    </GlassCard>
  );
}