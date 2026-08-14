"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

const ALL_CATEGORIES = [
  { id: "tasks",     label: "Tasks",     emoji: "✅" },
  { id: "habits",    label: "Habits",    emoji: "🔥" },
  { id: "goals",     label: "Goals",     emoji: "🎯" },
  { id: "reminders", label: "Reminders", emoji: "⏰" },
  { id: "gym",       label: "Gym",       emoji: "💪" },
  { id: "calendar",  label: "Calendar",  emoji: "📅" },
];

interface NotificationsValue {
  categories: string[];
}

export default function NotificationsSettings({
  value,
  onChange,
}: {
  value: NotificationsValue;
  onChange: (partial: Partial<NotificationsValue>) => void;
}) {
  function toggle(id: string) {
    const current = value.categories ?? [];
    const next = current.includes(id)
      ? current.filter((c) => c !== id)
      : [...current, id];
    onChange({ categories: next });
  }

  const allOn = ALL_CATEGORIES.every((c) => value.categories?.includes(c.id));

  function toggleAll() {
    onChange({
      categories: allOn ? [] : ALL_CATEGORIES.map((c) => c.id),
    });
  }

  return (
    <section>
      <SectionHeader
        title="Notifications"
        subtitle="Choose which categories send you alerts"
        action={
          <button
            onClick={toggleAll}
            className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors"
          >
            {allOn ? "Disable all" : "Enable all"}
          </button>
        }
      />

      <GlassCard className="!hover:-translate-y-0">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {ALL_CATEGORIES.map((cat) => {
            const enabled = value.categories?.includes(cat.id) ?? false;
            return (
              <button
                key={cat.id}
                onClick={() => toggle(cat.id)}
                className={`
                  flex items-center gap-3 rounded-2xl border p-4
                  transition-all duration-200 text-left
                  ${enabled
                    ? "border-[var(--primary)]/50 bg-[var(--primary)]/15 text-[var(--primary)] font-semibold shadow-sm"
                    : "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
                  }
                `}
              >
                <span className="text-xl">{cat.emoji}</span>
                <div>
                  <p className="text-sm font-medium text-[var(--text)]">{cat.label}</p>
                  <p className="text-[10px] mt-0.5 opacity-80">
                    {enabled ? "On" : "Off"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}