"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { DisciplineMode } from "@/types/phone-control";
import {
  ShieldAlert,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Lock,
} from "lucide-react";

export function FocusDisciplineModeCard() {
  const {
    settings,
    setDisciplineMode,
    requestNativeUsageAccess,
    requestNativeOverlay,
  } = usePhoneControlStore();

  const modes: {
    id: DisciplineMode;
    title: string;
    description: string;
    icon: any;
    badgeColor: string;
  }[] = [
    {
      id: "gentle",
      title: "Gentle Mode",
      description: "Shows notifications and soft banner warnings when screen time limit is reached.",
      icon: ShieldCheck,
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    {
      id: "strict",
      title: "Strict Mode",
      description: "Draws a full-screen un-dismissable lockout window requiring a challenge to unlock.",
      icon: ShieldAlert,
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    {
      id: "hardcore",
      title: "Hardcore Mode",
      description: "Enforces Accessibility anti-bypass lock. Prevents closing or uninstalling Atlas without challenge.",
      icon: Flame,
      badgeColor: "text-rose-400 border-rose-500/30 bg-rose-500/10",
    },
  ];

  return (
    <GlassCard className="p-6 sm:p-7 space-y-6">
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-5">
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Lock size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)] font-heading">
            Discipline Enforcement Level
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Configure how aggressively Atlas enforces phone lockouts and anti-bypass rules.
          </p>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="grid gap-3 sm:grid-cols-3">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = settings.disciplineMode === mode.id;

          return (
            <div
              key={mode.id}
              onClick={() => setDisciplineMode(mode.id)}
              className={`cursor-pointer p-4 rounded-xl border transition-all ${
                isSelected
                  ? "bg-[var(--primary)]/10 border-[var(--primary)]/50 shadow-sm"
                  : "bg-[var(--surface-2,rgba(255,255,255,0.04))] border-[var(--border)] hover:border-[var(--primary)]/30"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${mode.badgeColor} border`}>
                    <Icon size={18} />
                  </div>
                  {isSelected && <CheckCircle2 size={16} className="text-[var(--primary)]" />}
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-semibold text-[var(--text)]">{mode.title}</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
                    {mode.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Native Permissions Panel */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2,rgba(255,255,255,0.02))] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[var(--text)] flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-400" />
            Android System Control & Anti-Bypass Status
          </span>
          <span className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wider">
            Device Health
          </span>
        </div>

        <div className="grid gap-2 sm:grid-cols-3 text-xs">
          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.04))]">
            <span className="text-[var(--text-secondary)]">Usage Access:</span>
            {settings.usageAccessGranted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Active
              </span>
            ) : (
              <button
                onClick={requestNativeUsageAccess}
                className="text-amber-400 underline font-medium hover:text-amber-300"
              >
                Grant Access
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.04))]">
            <span className="text-[var(--text-secondary)]">Display Over Apps:</span>
            {settings.overlayGranted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Active
              </span>
            ) : (
              <button
                onClick={requestNativeOverlay}
                className="text-amber-400 underline font-medium hover:text-amber-300"
              >
                Grant Access
              </button>
            )}
          </div>

          <div className="flex items-center justify-between p-2.5 rounded-lg bg-[var(--surface-3,rgba(255,255,255,0.04))]">
            <span className="text-[var(--text-secondary)]">Anti-Uninstall Lock:</span>
            {settings.accessibilityGranted ? (
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle2 size={12} /> Active
              </span>
            ) : (
              <span className="text-emerald-400 font-medium">Ready</span>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
