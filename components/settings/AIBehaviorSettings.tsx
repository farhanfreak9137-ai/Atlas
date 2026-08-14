"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

const VERBOSITY_LABELS: Record<number, string> = {
  1: "Very Brief",
  2: "Concise",
  3: "Balanced",
  4: "Detailed",
  5: "Comprehensive",
};

interface AIValue {
  verbosity: number;
  creativeMode: boolean;
  rememberHistory: boolean;
}

export default function AIBehaviorSettings({
  value,
  onChange,
}: {
  value: AIValue;
  onChange: (partial: Partial<AIValue>) => void;
}) {
  return (
    <section>
      <SectionHeader title="AI Behavior" subtitle="Control how your AI assistant thinks and responds" />

      <div className="grid gap-4 md:grid-cols-3">

        {/* Verbosity */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Response Verbosity</p>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">
            How detailed should AI replies be?
          </p>
          <div className="flex flex-col gap-2">
            {([1, 2, 3, 4, 5] as const).map((level) => (
              <ToggleButton
                key={level}
                selected={value.verbosity === level}
                onClick={() => onChange({ verbosity: level })}
                className="justify-between"
              >
                <span>{VERBOSITY_LABELS[level]}</span>
                <span className="text-xs opacity-60 font-mono">{level}/5</span>
              </ToggleButton>
            ))}
          </div>
        </GlassCard>

        {/* Creative Mode */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Creative Mode</p>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">
            When on, the AI generates more imaginative and experimental responses.
          </p>
          <div className="flex flex-col gap-2">
            <ToggleButton
              selected={!value.creativeMode}
              onClick={() => onChange({ creativeMode: false })}
              className="justify-start"
            >
              🎯 Precise
            </ToggleButton>
            <ToggleButton
              selected={value.creativeMode}
              onClick={() => onChange({ creativeMode: true })}
              className="justify-start"
            >
              🎨 Creative
            </ToggleButton>
          </div>

          <div className={`mt-4 rounded-xl p-3 text-xs transition-all ${
            value.creativeMode
              ? "bg-violet-500/10 text-violet-500 border border-violet-500/20 font-medium"
              : "bg-[var(--surface-2)] text-[var(--text-secondary)]"
          }`}>
            {value.creativeMode
              ? "AI will take creative liberties and explore ideas freely."
              : "AI will stay factual and focused on your goals."}
          </div>
        </GlassCard>

        {/* Remember History */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-[var(--text-secondary)] mb-1">Conversation Memory</p>
          <p className="text-xs text-[var(--text-tertiary)] mb-4">
            Should the AI remember past conversations to give better advice?
          </p>
          <div className="flex flex-col gap-2">
            <ToggleButton
              selected={value.rememberHistory}
              onClick={() => onChange({ rememberHistory: true })}
              className="justify-start"
            >
              🧠 Remember history
            </ToggleButton>
            <ToggleButton
              selected={!value.rememberHistory}
              onClick={() => onChange({ rememberHistory: false })}
              className="justify-start"
            >
              🔒 Always fresh start
            </ToggleButton>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}