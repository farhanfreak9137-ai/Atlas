"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

const WIDGET_OPTIONS = [
  { id: "tasks",      label: "Tasks",      emoji: "✅" },
  { id: "habits",     label: "Habits",     emoji: "🔥" },
  { id: "goals",      label: "Goals",      emoji: "🎯" },
  { id: "calendar",   label: "Calendar",   emoji: "📅" },
  { id: "aiInsights", label: "AI Insights",emoji: "🧠" },
  { id: "statistics", label: "Statistics", emoji: "📊" },
];

type Layout = "grid" | "list" | "compact";

interface DashboardValue {
  layout: Layout;
  widgets: string[];
}

export default function DashboardSettings({
  value,
  onChange,
}: {
  value: DashboardValue;
  onChange: (partial: Partial<DashboardValue>) => void;
}) {
  function toggleWidget(id: string) {
    const next = value.widgets.includes(id)
      ? value.widgets.filter((w) => w !== id)
      : [...value.widgets, id];
    onChange({ widgets: next });
  }

  return (
    <section>
      <SectionHeader
        title="Dashboard"
        subtitle="Control which widgets appear and how they're arranged"
      />

      <div className="grid gap-4 md:grid-cols-2">

        {/* Layout Style */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Layout Style</p>
          <div className="flex flex-col gap-2">
            {([
              ["grid",    "⊞ Grid",    "Cards arranged in a responsive grid"],
              ["list",    "☰ List",    "Stacked vertical list view"],
              ["compact", "⊟ Compact", "Minimal, information-dense layout"],
            ] as [Layout, string, string][]).map(([l, label, desc]) => (
              <button
                key={l}
                onClick={() => onChange({ layout: l })}
                className={`
                  flex items-center gap-3 rounded-2xl border p-4 text-left
                  transition-all duration-200
                  ${value.layout === l
                    ? "border-[var(--primary)]/50 bg-[var(--primary)]/15 text-[var(--primary)] font-semibold shadow-sm"
                    : "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
                  }
                `}
              >
                <div>
                  <p className="font-medium text-[var(--text)]">{label}</p>
                  <p className="text-xs text-[var(--text-secondary)] opacity-80 mt-0.5">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Widgets */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-4">Visible Widgets</p>
          <div className="grid grid-cols-2 gap-2">
            {WIDGET_OPTIONS.map((w) => {
              const on = value.widgets.includes(w.id);
              return (
                <button
                  key={w.id}
                  onClick={() => toggleWidget(w.id)}
                  className={`
                    flex items-center gap-2 rounded-xl border p-3 text-left text-sm
                    transition-all duration-200
                    ${on
                      ? "border-[var(--primary)]/50 bg-[var(--primary)]/15 text-[var(--primary)] font-semibold shadow-sm"
                      : "border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.04))] text-[var(--text-secondary)] hover:text-[var(--text)] hover:bg-[var(--surface-hover)]"
                    }
                  `}
                >
                  <span>{w.emoji}</span>
                  <span className="font-medium">{w.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-xs text-[var(--text-tertiary)] font-medium">
            {value.widgets.length} of {WIDGET_OPTIONS.length} widgets visible
          </p>
        </GlassCard>

      </div>
    </section>
  );
}