"use client";

import { useEffect, useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { UnlockCondition } from "@/types/phone-control";
import {
  Smartphone,
  ShieldAlert,
  Clock,
  CheckCircle2,
  Lock,
  Flame,
  BookOpen,
  Timer,
  Sliders,
} from "lucide-react";

export function PhoneControlPanel() {
  const {
    settings,
    load,
    setDailyLimit,
    setLockState,
    setPermissions,
  } = usePhoneControlStore();

  const [customLimit, setCustomLimit] = useState(settings.dailyLimitMinutes);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setCustomLimit(settings.dailyLimitMinutes);
  }, [settings.dailyLimitMinutes]);

  const presetLimits = [
    { label: "1 Hour", minutes: 60 },
    { label: "2 Hours", minutes: 120 },
    { label: "3 Hours", minutes: 180 },
    { label: "4 Hours", minutes: 240 },
  ];

  const unlockConditions: {
    id: UnlockCondition;
    title: string;
    description: string;
    icon: any;
  }[] = [
    {
      id: "hard_workout",
      title: "Hard Household Workout",
      description: "Complete 20 Burpees, 25 Diamond Pushups, or 90s Iso Plank",
      icon: Flame,
    },
    {
      id: "habit_completion",
      title: "Habits & Reflection",
      description: "Complete your daily habits & write a short check-in log",
      icon: BookOpen,
    },
    {
      id: "cooldown_timer",
      title: "Mandatory Cooldown",
      description: "Enforce a 20-minute phone-free waiting period",
      icon: Timer,
    },
  ];

  const handlePresetClick = (mins: number) => {
    setCustomLimit(mins);
    setDailyLimit(mins);
  };

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border)] pb-5">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/20">
            <Smartphone size={24} />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text)] font-heading">
              Phone Usage & Control Habit
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              Enforce maximum phone screen-time limits & build digital discipline.
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
          {settings.isPhoneLocked ? "Phone Currently Locked (Unlock Test)" : "Test Lock Screen"}
        </button>
      </div>

      {/* Screen Time Tracker Gauge */}
      <div className="grid gap-4 md:grid-cols-12 items-center">
        <div className="md:col-span-7 space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-medium">
                Today&apos;s Screen Usage
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[var(--text)] mt-0.5">
                {formatMinutes(settings.currentScreenTimeMinutes)}{" "}
                <span className="text-sm font-normal text-[var(--text-secondary)]">
                  / {formatMinutes(settings.dailyLimitMinutes)} limit
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
              {usagePercent}% Used
            </span>
          </div>

          {/* Progress Bar */}
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

        {/* Limit Presets */}
        <div className="md:col-span-5 space-y-2">
          <label className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
            <Clock size={13} />
            Set Daily Limit
          </label>
          <div className="grid grid-cols-4 gap-2">
            {presetLimits.map((preset) => (
              <button
                key={preset.minutes}
                type="button"
                onClick={() => handlePresetClick(preset.minutes)}
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

      {/* Unlock Condition Selector */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-[var(--primary)]" />
          <h3 className="text-sm font-semibold text-[var(--text)]">
            Required Condition to Unlock Phone
          </h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {unlockConditions.map((cond) => {
            const Icon = cond.icon;
            const isSelected = (settings.activeUnlockCondition || "hard_workout") === cond.id;

            return (
              <div
                key={cond.id}
                onClick={() => setLockState(settings.isPhoneLocked, cond.id)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-[var(--primary)]/10 border-[var(--primary)]/50 shadow-sm"
                    : "bg-[var(--surface-2,rgba(255,255,255,0.04))] border-[var(--border)] hover:border-[var(--primary)]/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--surface-3,rgba(255,255,255,0.08))] text-[var(--text-secondary)]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-[var(--text)]">
                        {cond.title}
                      </h4>
                      {isSelected && (
                        <CheckCircle2 size={14} className="text-[var(--primary)]" />
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                      {cond.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Permissions Status Footer */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.02))] p-4 space-y-3">
        <div className="flex items-center gap-2">
          <ShieldAlert size={16} className="text-amber-400" />
          <span className="text-xs font-semibold text-[var(--text)]">
            Android System Control Permissions
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 text-xs">
          <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.04))]">
            <span className="text-[var(--text-secondary)]">Usage Access:</span>
            {settings.usageAccessGranted ? (
              <span className="text-emerald-400 font-medium">Granted</span>
            ) : (
              <button
                onClick={() => usePhoneControlStore.getState().requestNativeUsageAccess()}
                className="text-amber-400 underline font-medium hover:text-amber-300"
              >
                Enable
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.04))]">
            <span className="text-[var(--text-secondary)]">Display Over Apps:</span>
            {settings.overlayGranted ? (
              <span className="text-emerald-400 font-medium">Granted</span>
            ) : (
              <button
                onClick={() => usePhoneControlStore.getState().requestNativeOverlay()}
                className="text-amber-400 underline font-medium hover:text-amber-300"
              >
                Enable
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-2 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.04))]">
            <span className="text-[var(--text-secondary)]">Anti-Bypass Lock:</span>
            {settings.accessibilityGranted ? (
              <span className="text-emerald-400 font-medium">Active</span>
            ) : (
              <button
                onClick={() => setPermissions({ accessibilityGranted: true })}
                className="text-amber-400 underline font-medium hover:text-amber-300"
              >
                Enable
              </button>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
