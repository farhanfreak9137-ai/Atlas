"use client";

import React from "react";

import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";

const SHORTCUTS = [
  { keys: ["Ctrl", "K"],        label: "Open Search",       desc: "Search tasks, notes, goals & more" },
  { keys: ["Ctrl", "Shift", "D"], label: "Go to Dashboard",  desc: "Jump back to the dashboard" },
  { keys: ["Esc"],              label: "Close Panel",        desc: "Close any open panel or modal" },
  { keys: ["↑", "↓"],          label: "Navigate Results",   desc: "Move between search results" },
  { keys: ["Enter"],            label: "Select Result",      desc: "Open the highlighted search result" },
];

function KeyBadge({ k }: { k: string }) {
  return (
    <kbd className="
      inline-flex items-center justify-center
      rounded-lg border border-white/20 bg-white/5
      px-2.5 py-1
      text-xs font-mono font-semibold text-zinc-300
      shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]
    ">
      {k}
    </kbd>
  );
}

export default function KeyboardSettings() {
  return (
    <section>
      <SectionHeader
        title="Keyboard Shortcuts"
        subtitle="Handy shortcuts available throughout Atlas"
      />

      <GlassCard className="!hover:-translate-y-0">
        <div className="divide-y divide-white/5">
          {SHORTCUTS.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div>
                <p className="font-medium">{s.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{s.desc}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                {s.keys.map((k, i) => (
                  <React.Fragment key={k}>
                    <KeyBadge k={k} />
                    {i < s.keys.length - 1 && (
                      <span className="text-xs text-zinc-600">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-zinc-600">
          On macOS, <kbd className="font-mono text-xs">Ctrl</kbd> = <kbd className="font-mono text-xs">⌘ Cmd</kbd>
        </p>
      </GlassCard>
    </section>
  );
}