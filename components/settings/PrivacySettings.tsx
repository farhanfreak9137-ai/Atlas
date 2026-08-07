"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToggleButton } from "@/components/ui/ToggleButton";

type DataRetention = "session" | "week" | "month" | "forever";

interface PrivacyValue {
  autoLockTime: number; // minutes, 0 = disabled
  dataRetention: DataRetention;
}

export default function PrivacySettings({
  value,
  onChange,
}: {
  value: PrivacyValue;
  onChange: (partial: Partial<PrivacyValue>) => void;
}) {
  const [cleared, setCleared] = useState(false);

  function clearAllData() {
    if (!confirm("This will clear all locally stored data (tasks, habits, goals, notes). Are you sure?")) return;
    // Only clear app data keys — keep settings
    const settingsBackup = localStorage.getItem("atlas-settings");
    localStorage.clear();
    if (settingsBackup) localStorage.setItem("atlas-settings", settingsBackup);
    setCleared(true);
    setTimeout(() => setCleared(false), 3000);
  }

  const autoLockOptions: [number, string][] = [
    [0,  "Never"],
    [5,  "5 min"],
    [10, "10 min"],
    [15, "15 min"],
    [30, "30 min"],
  ];

  const retentionOptions: [DataRetention, string, string][] = [
    ["session", "Session Only", "Data is cleared when you close the browser"],
    ["week",    "1 Week",       "Old data auto-deleted after 7 days"],
    ["month",   "1 Month",      "Old data auto-deleted after 30 days"],
    ["forever", "Keep Forever", "Nothing is ever auto-deleted"],
  ];

  return (
    <section>
      <SectionHeader title="Privacy & Data" subtitle="Control how Atlas stores and retains your data" />

      <div className="grid gap-4 md:grid-cols-2">

        {/* Auto-Lock */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-zinc-400 mb-1">Screen Lock</p>
          <p className="text-xs text-zinc-500 mb-4">
            Automatically lock Atlas after a period of inactivity.
          </p>
          <div className="flex flex-wrap gap-2">
            {autoLockOptions.map(([mins, label]) => (
              <ToggleButton
                key={mins}
                selected={value.autoLockTime === mins}
                onClick={() => onChange({ autoLockTime: mins })}
              >
                {label}
              </ToggleButton>
            ))}
          </div>
        </GlassCard>

        {/* Data Retention */}
        <GlassCard className="!hover:-translate-y-0">
          <p className="text-sm font-semibold text-zinc-400 mb-1">Data Retention</p>
          <p className="text-xs text-zinc-500 mb-4">
            How long should Atlas keep your activity history?
          </p>
          <div className="flex flex-col gap-2">
            {retentionOptions.map(([ret, label, desc]) => (
              <button
                key={ret}
                onClick={() => onChange({ dataRetention: ret })}
                className={`
                  flex items-start gap-3 rounded-xl border p-3 text-left
                  transition-all duration-200
                  ${value.dataRetention === ret
                    ? "border-[var(--primary)]/30 bg-[var(--primary)]/10 text-white"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/8"
                  }
                `}
              >
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-[10px] opacity-60 mt-0.5">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* Clear Data */}
        <GlassCard className="md:col-span-2 !hover:-translate-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-semibold">Clear All Local Data</p>
              <p className="mt-1 text-sm text-zinc-400">
                Permanently delete all stored tasks, habits, goals, and notes from this device.
                Your settings will be preserved.
              </p>
            </div>
            <button
              onClick={clearAllData}
              className={`
                shrink-0 rounded-2xl border px-6 py-3 text-sm font-medium
                transition-all duration-200
                ${cleared
                  ? "border-green-500/30 bg-green-500/10 text-green-400"
                  : "border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20"
                }
              `}
            >
              {cleared ? "✓ Cleared!" : "Clear Data"}
            </button>
          </div>
        </GlassCard>

      </div>
    </section>
  );
}