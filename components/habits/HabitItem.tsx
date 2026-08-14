import { Trash2, Flame, Check } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
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
    <GlassCard className="p-5 flex flex-col justify-between space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--surface-2,rgba(255,255,255,0.05))] border border-[var(--border)] text-2xl shadow-inner">
            {habit.icon}
          </div>

          <div>
            <h3 className="text-base font-semibold font-heading text-[var(--text)]">
              {habit.title}
            </h3>

            <div className="mt-1 flex items-center gap-3">
              <span className="text-xs font-medium text-[var(--text-secondary)]">
                {habit.progress} / {habit.target} daily
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-medium text-amber-500">
                <Flame size={12} className="text-amber-500 fill-amber-500/30" />
                {habit.streak} day streak
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(habit.id)}
          className="rounded-xl p-2 text-[var(--text-tertiary)] transition hover:bg-rose-500/10 hover:text-rose-400"
          aria-label="Delete habit"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="h-2 overflow-hidden rounded-full bg-[var(--surface-3,rgba(255,255,255,0.1))]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.4)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Action button */}
      <button
        onClick={() => onToggle(habit.id)}
        className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all duration-200 ${
          habit.completedToday
            ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-500"
            : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm"
        }`}
      >
        {habit.completedToday ? (
          <>
            <Check size={15} /> Completed Today
          </>
        ) : (
          "Mark Complete"
        )}
      </button>
    </GlassCard>
  );
}