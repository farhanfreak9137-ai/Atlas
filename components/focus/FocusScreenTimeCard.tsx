"use client";

import { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { Smartphone, Clock, Eye, Moon, Lock } from "lucide-react";

export function FocusScreenTimeCard() {
  const { settings, setDailyLimit, setWakeTimeout, setLockState } = usePhoneControlStore();
  const [customMinutes, setCustomMinutes] = useState(settings.dailyLimitMinutes);

  const presetLimits = [
    { label: "1 Hour", minutes: 60 },
    { label: "2 Hours", minutes: 120 },
    { label: "3 Hours", minutes: 180 },
    { label: "4 Hours", minutes: 240 },
  ];

  const wakeTimeouts = [
    { label: "15 Seconds", seconds: 15 },
    { label: "30 Seconds", seconds: 30 },
    { label: "1 Minute", seconds: 60 },
    { label: "5 Minutes", seconds: 300 },
  ];

  const formatMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;
    if (hours === 0) return `${mins}m`;
    if (mins === 0) return `${hours}h`;
    return `${hours}h ${mins}m`;
  };

  const usagePercent = Math.min(
    100,
    Math.round((settings.currentScreenTimeMinutes / settings.dailyLimitMinutes) * 100)
  );

  return (
    <GlassCard className="p-6 sm:p-7 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
            <Smartphone size={24} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[var(--text)] font-heading">
              Screen Time & Phone Wake Control
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">
              Manage maximum active screen duration and automatic sleep policy.
            </p>
          </div>
        </div>

        <button
          onClick={() => setLockState(!settings.isPhoneLocked, "hard_workout")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all ${
            settings.isPhoneLocked
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              : "bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30"
          }`}
        >
          <Lock size={14} />
          {settings.isPhoneLocked ? "Phone Locked (Unlock Test)" : "Trigger Lockout Test"}
        </button>
      </div>

      {/* Screen Time Gauge */}
      <div className="grid gap-6 md:grid-cols-12 items-center">
        <div className="md:col-span-7 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium">
                Today&apos;s Tracked Screen Usage
              </span>
              <div className="text-3xl font-extrabold text-[var(--text)] mt-0.5 font-heading">
                {formatMinutes(settings.currentScreenTimeMinutes)}{" "}
                <span className="text-sm font-normal text-[var(--text-secondary)]">
                  / {formatMinutes(settings.dailyLimitMinutes)} max limit
                </span>
              </div>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                usagePercent >= 100
                  ? "bg-rose-500/20 text-rose-400 border-rose-500/30"
                  : usagePercent >= 75
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
              }`}
            >
              {usagePercent}% Limit Reached
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-[var(--surface-2,rgba(255,255,255,0.06))] overflow-hidden border border-[var(--border)] p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                usagePercent >= 100
                  ? "bg-rose-500"
                  : usagePercent >= 75
                  ? "bg-amber-500"
                  : "bg-[var(--primary)]"
              }`}
              style={{ width: `${usagePercent}%` }}
            />
          </div>
        </div>

        {/* Daily Limit Presets */}
        <div className="md:col-span-5 space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <Clock size={13} />
            Daily Max Screen Limit
          </label>
          <div className="grid grid-cols-4 gap-2">
            {presetLimits.map((preset) => (
              <button
                key={preset.minutes}
                type="button"
                onClick={() => setDailyLimit(preset.minutes)}
                className={`py-2 px-1 rounded-xl text-xs font-medium transition-all ${
                  settings.dailyLimitMinutes === preset.minutes
                    ? "bg-[var(--primary)] text-white shadow-md shadow-[var(--primary)]/20"
                    : "bg-[var(--surface-2,rgba(255,255,255,0.04))] text-[var(--text)] border border-[var(--border)] hover:bg-[var(--surface-hover)]"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Screen Wake Policy */}
      <div className="pt-3 border-t border-[var(--border)] space-y-3">
        <div className="flex items-center gap-2">
          <Eye size={16} className="text-cyan-400" />
          <h4 className="text-sm font-semibold text-[var(--text)]">
            Auto Screen-Sleep Timeout Policy
          </h4>
        </div>
        <p className="text-xs text-[var(--text-secondary)]">
          Force the phone screen to turn off after idle timeout during active focus sessions.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {wakeTimeouts.map((wt) => (
            <button
              key={wt.seconds}
              type="button"
              onClick={() => setWakeTimeout(wt.seconds)}
              className={`py-2.5 px-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border transition-all ${
                settings.screenWakeTimeoutSeconds === wt.seconds
                  ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-sm"
                  : "bg-[var(--surface-2,rgba(255,255,255,0.04))] text-[var(--text-secondary)] border-[var(--border)] hover:border-cyan-500/30"
              }`}
            >
              <Moon size={14} />
              {wt.label}
            </button>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
