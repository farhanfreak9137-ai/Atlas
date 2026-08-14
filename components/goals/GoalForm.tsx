"use client";

import { FormEvent, useState } from "react";
import { GoalCategory } from "@/types/goal";
import { GlassCard } from "@/components/ui/GlassCard";
import { Plus, Target } from "lucide-react";

interface GoalFormProps {
  onAdd: (
    title: string,
    category: GoalCategory,
    target: number,
    deadline: string
  ) => void;
}

export function GoalForm({ onAdd }: GoalFormProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<GoalCategory>("personal");
  const [target, setTarget] = useState(1);
  const [deadline, setDeadline] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), category, target, deadline);

    setTitle("");
    setCategory("personal");
    setTarget(1);
    setDeadline("");
  }

  return (
    <GlassCard className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <Target size={18} className="text-cyan-500" />
          <h2 className="text-lg font-semibold font-heading text-[var(--text)]">
            Create Goal
          </h2>
        </div>

        <input
          type="text"
          placeholder="What is your goal title?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--primary)]/50"
          required
        />

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as GoalCategory)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-2.5 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--primary)]/50 [&>option]:bg-[var(--popover)] [&>option]:text-[var(--popover-foreground)] capitalize"
            >
              <option value="personal">Personal</option>
              <option value="fitness">Fitness</option>
              <option value="study">Study</option>
              <option value="career">Career</option>
              <option value="football">Football</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Target Value</label>
            <input
              type="number"
              min={1}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-2.5 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--primary)]/50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">Target Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-2.5 text-sm text-[var(--text-secondary)] outline-none transition-all focus:border-[var(--primary)]/50"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 active:scale-[0.99]"
          >
            <Plus size={18} />
            Add Goal
          </button>
        </div>
      </form>
    </GlassCard>
  );
}