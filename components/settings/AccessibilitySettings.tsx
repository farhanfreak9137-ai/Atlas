"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

interface AccessibilityValue {
  reducedMotion: boolean;
  contrast: "normal" | "high";
}

export default function AccessibilitySettings({
  value,
  onChange,
}: {
  value: AccessibilityValue;
  onChange: (partial: Partial<AccessibilityValue>) => void;
}) {
  return (
    <section>
      <SectionHeader
        title="Accessibility"
        subtitle="Make Atlas easier to see and interact with"
      />

      <div className="grid gap-4 md:grid-cols-2">

        {/* Reduced Motion */}
        <GlassCard className="!hover:-translate-y-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold">Reduce Motion</p>
              <p className="mt-1 text-sm text-zinc-400">
                Disables all animations and transitions throughout the app.
                Good for motion sensitivity or performance on slow devices.
              </p>
            </div>

            {/* Toggle switch */}
            <button
              onClick={() => onChange({ reducedMotion: !value.reducedMotion })}
              className={`
                relative shrink-0 mt-1
                h-7 w-12 rounded-full border transition-all duration-300
                ${value.reducedMotion
                  ? "bg-[var(--primary)] border-[var(--primary)]"
                  : "bg-white/10 border-white/20"
                }
              `}
              aria-pressed={value.reducedMotion}
              role="switch"
            >
              <span
                className={`
                  absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-sm
                  transition-transform duration-300
                  ${value.reducedMotion ? "translate-x-5" : "translate-x-0.5"}
                `}
              />
            </button>
          </div>

          <div className={`mt-4 rounded-xl p-3 text-xs transition-all ${
            value.reducedMotion
              ? "bg-[var(--primary)]/10 text-zinc-300 border border-[var(--primary)]/20"
              : "bg-white/5 text-zinc-500"
          }`}>
            {value.reducedMotion
              ? "✓ All animations are disabled"
              : "Animations are currently active"}
          </div>
        </GlassCard>

        {/* Contrast Mode */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="font-semibold mb-1">Contrast Mode</p>
          <p className="text-sm text-zinc-400 mb-4">
            High contrast improves text readability by boosting border and text visibility.
          </p>
          <div className="flex flex-col gap-2">
            <ToggleButton
              selected={value.contrast === "normal"}
              onClick={() => onChange({ contrast: "normal" })}
              className="justify-start"
            >
              👁 Normal Contrast
            </ToggleButton>
            <ToggleButton
              selected={value.contrast === "high"}
              onClick={() => onChange({ contrast: "high" })}
              className="justify-start"
            >
              ⬛ High Contrast
            </ToggleButton>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}