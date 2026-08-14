"use client";

import { FormEvent, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Plus, Sparkles } from "lucide-react";

interface HabitFormProps {
  onAdd: (
    title: string,
    icon: string,
    color: string,
    target: number
  ) => void;
}

export function HabitForm({ onAdd }: HabitFormProps) {
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("💧");
  const [color, setColor] = useState("emerald");
  const [target, setTarget] = useState(8);

  const suggestedIcons = [
    "💧", "🍎", "🏃", "🎧", "📚", "🌱", "💪", "⭐", "🧘", "🛌",
    "🍳", "🚲", "📖", "🌙", "☀️", "❤️", "🚀", "⚡", "🎯", "🔥"
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    onAdd(title.trim(), icon, color, target);

    setTitle("");
    setIcon("💧");
    setColor("emerald");
    setTarget(8);
  };

  return (
    <GlassCard className="p-6 sm:p-7 border-[var(--border)]">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-[var(--primary)]" />
            <h2 className="text-lg sm:text-xl font-semibold font-heading text-[var(--text)]">
              Create New Habit
            </h2>
          </div>
          <span className="text-xs font-medium text-[var(--text-secondary)]">Build consistency</span>
        </div>

        <div className="grid gap-4 md:grid-cols-12">
          {/* Title input */}
          <div className="md:col-span-6 space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              Habit Name
            </label>
            <input
              type="text"
              placeholder="What positive habit will you build?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-tertiary)] outline-none transition-all focus:border-[var(--primary)]/50"
              required
            />
          </div>

          {/* Target input */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              Daily Target
            </label>
            <input
              type="number"
              min={1}
              value={target}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--primary)]/50"
            />
          </div>

          {/* Color accent */}
          <div className="md:col-span-3 space-y-1.5">
            <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
              Accent Color
            </label>
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] px-4 py-3 text-sm text-[var(--text)] outline-none transition-all focus:border-[var(--primary)]/50 [&>option]:bg-[var(--popover)] [&>option]:text-[var(--popover-foreground)]"
            >
              <option value="emerald">Emerald</option>
              <option value="cyan">Cyan</option>
              <option value="purple">Purple</option>
              <option value="amber">Amber</option>
              <option value="rose">Rose</option>
            </select>
          </div>
        </div>

        {/* Icon Picker Row */}
        <div className="space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
            Choose Icon
          </label>
          <div className="flex flex-wrap gap-2 pt-1">
            {suggestedIcons.map((ic) => (
              <button
                key={ic}
                type="button"
                onClick={() => setIcon(ic)}
                className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl transition-all ${
                  icon === ic
                    ? "bg-[var(--primary)]/20 border border-[var(--primary)]/40 scale-110 shadow-md shadow-[var(--primary)]/20"
                    : "bg-[var(--surface-2,rgba(255,255,255,0.04))] border border-[var(--border)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                {ic}
              </button>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-6 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 active:scale-[0.99]"
          >
            <Plus size={18} />
            Add Habit
          </button>
        </div>
      </form>
    </GlassCard>
  );
}