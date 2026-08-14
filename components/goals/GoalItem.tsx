"use client";

import { Goal } from "@/types/goal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Plus, RotateCcw, Trash2, Calendar } from "lucide-react";

interface GoalItemProps {
  goal: Goal;
  onUpdate: (id: string, current: number) => void;
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
    <GlassCard className="p-6 flex flex-col justify-between space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-cyan-500/10 border border-cyan-500/20 px-3 py-0.5 text-xs font-medium text-cyan-500 capitalize">
              {goal.category}
            </span>

            {goal.deadline && (
              <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)] font-normal">
                <Calendar size={12} className="text-[var(--text-tertiary)]" />
                Due {goal.deadline}
              </span>
            )}
          </div>

          <h3 className="text-lg font-semibold font-heading text-[var(--text)]">
            {goal.title}
          </h3>
        </div>

        <button
          onClick={() => onDelete(goal.id)}
          className="rounded-xl p-2 text-[var(--text-tertiary)] hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0"
          aria-label="Delete goal"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Progress Information */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium">
          <span className="text-[var(--text-secondary)]">Target Completion</span>
          <span className="text-emerald-500 font-semibold font-mono">
            {goal.current} / {goal.target} ({Math.round(progress)}%)
          </span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-[var(--surface-3,rgba(255,255,255,0.1))]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={() => onUpdate(goal.id, Math.min(goal.current + 1, goal.target))}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 active:scale-[0.99]"
        >
          <Plus size={15} /> + Progress
        </button>

        <button
          onClick={() => onUpdate(goal.id, 0)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-[var(--surface-2,rgba(255,255,255,0.08))] border border-[var(--border)] hover:bg-[var(--surface-hover)] px-4 py-2.5 text-xs font-medium text-[var(--text)] transition"
        >
          <RotateCcw size={14} /> Reset
        </button>
      </div>
    </GlassCard>
  );
}