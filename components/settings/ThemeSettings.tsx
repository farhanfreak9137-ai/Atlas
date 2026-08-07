"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

const ACCENT_COLORS = [
  { label: "Emerald",  hex: "#1F7A5B" },
  { label: "Violet",   hex: "#7C3AED" },
  { label: "Sky",      hex: "#0284C7" },
  { label: "Rose",     hex: "#E11D48" },
  { label: "Amber",    hex: "#D97706" },
  { label: "Cyan",     hex: "#0891B2" },
];

type FontSize = "small" | "medium" | "large";
type Scheme   = "dark" | "light" | "auto";

interface ThemeValue {
  scheme: Scheme;
  accentColor: string;
  fontSize: FontSize;
}

export default function ThemeSettings({
  value,
  onChange,
}: {
  value: ThemeValue;
  onChange: (partial: Partial<ThemeValue>) => void;
}) {
  return (
    <section>
      <SectionHeader title="Appearance" subtitle="Customize the visual theme and font size" />

      <div className="grid gap-4 md:grid-cols-3">

        {/* Color Scheme */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-zinc-400 mb-4">Color Scheme</p>
          <div className="flex flex-col gap-2">
            {(["dark", "light", "auto"] as Scheme[]).map((s) => (
              <ToggleButton
                key={s}
                selected={value.scheme === s}
                onClick={() => onChange({ scheme: s })}
                className="justify-start capitalize"
              >
                {s === "dark"  ? "🌙 Dark"  : s === "light" ? "☀️ Light" : "🖥 System"}
              </ToggleButton>
            ))}
          </div>
        </GlassCard>

        {/* Accent Color */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-zinc-400 mb-4">Accent Color</p>
          <div className="grid grid-cols-3 gap-3">
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.hex}
                title={color.label}
                onClick={() => onChange({ accentColor: color.hex })}
                className={`
                  flex flex-col items-center gap-1.5 rounded-xl p-2
                  transition-all duration-200
                  ${value.accentColor === color.hex
                    ? "ring-2 ring-white/60 ring-offset-1 ring-offset-transparent"
                    : "opacity-60 hover:opacity-100"
                  }
                `}
              >
                <div
                  className="h-8 w-8 rounded-full shadow-lg"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] text-zinc-400">{color.label}</span>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Font Size */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-zinc-400 mb-4">Font Size</p>
          <div className="flex flex-col gap-2">
            {([
              ["small",  "Small  — 14px"],
              ["medium", "Medium — 16px"],
              ["large",  "Large  — 18px"],
            ] as [FontSize, string][]).map(([size, label]) => (
              <ToggleButton
                key={size}
                selected={value.fontSize === size}
                onClick={() => onChange({ fontSize: size })}
                className="justify-start"
              >
                {label}
              </ToggleButton>
            ))}
          </div>
        </GlassCard>

      </div>
    </section>
  );
}