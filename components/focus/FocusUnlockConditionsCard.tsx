"use client";

import { GlassCard } from "@/components/ui/GlassCard";
import { usePhoneControlStore } from "@/stores/phone-control.store";
import { HardWorkoutType, UnlockCondition } from "@/types/phone-control";
import {
  Flame,
  Camera,
  CheckCircle2,
  BookOpen,
  Timer,
  Sliders,
  Dumbbell,
  Target,
} from "lucide-react";

export function FocusUnlockConditionsCard() {
  const { settings, setLockState, setSelectedWorkout } = usePhoneControlStore();

  const workoutTypes: {
    id: HardWorkoutType;
    name: string;
    description: string;
    defaultReps: number;
    icon: any;
  }[] = [
    {
      id: "pushups",
      name: "Chest Pushups",
      description: "AI tracks chest lowering to floor & push back up",
      defaultReps: 20,
      icon: Flame,
    },
    {
      id: "burpees",
      name: "Burpees",
      description: "Full drop chest to floor & jump",
      defaultReps: 15,
      icon: Dumbbell,
    },
    {
      id: "squats",
      name: "Air / Jump Squats",
      description: "Deep 90-degree hip squat and jump",
      defaultReps: 25,
      icon: Target,
    },
    {
      id: "plank",
      name: "Core Iso Plank",
      description: "Elbow plank hold with live countdown",
      defaultReps: 45,
      icon: Timer,
    },
  ];

  const unlockConditions: {
    id: UnlockCondition;
    title: string;
    description: string;
    icon: any;
  }[] = [
    {
      id: "hard_workout",
      title: "AI Camera Workout Verification",
      description: "Perform your assigned workout in front of camera to unlock",
      icon: Camera,
    },
    {
      id: "habit_completion",
      title: "Habits & Intention Reflection",
      description: "Complete daily habits & write a short check-in note",
      icon: BookOpen,
    },
    {
      id: "cooldown_timer",
      title: "Mandatory Cooldown Break",
      description: "Enforce a 20-minute phone-free waiting period",
      icon: Timer,
    },
  ];

  return (
    <GlassCard className="p-6 sm:p-7 space-y-6">
      <div className="flex items-center gap-3 border-b border-[var(--border)] pb-5">
        <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <Camera size={24} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--text)] font-heading">
            AI Camera Workout & Unlock Protocol
          </h3>
          <p className="text-xs text-[var(--text-secondary)]">
            Configure your single active workout challenge and target rep count.
          </p>
        </div>
      </div>

      {/* Select Single Active Workout */}
      <div className="space-y-3">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] flex items-center gap-1.5">
          <Dumbbell size={14} className="text-rose-400" />
          Single Active Assigned Workout Challenge
        </h4>

        <div className="grid gap-3 sm:grid-cols-2">
          {workoutTypes.map((w) => {
            const Icon = w.icon;
            const isSelected = settings.selectedWorkoutType === w.id;

            return (
              <div
                key={w.id}
                onClick={() => setSelectedWorkout(w.id, w.defaultReps)}
                className={`cursor-pointer p-4 rounded-xl border transition-all ${
                  isSelected
                    ? "bg-rose-500/10 border-rose-500/50 shadow-sm"
                    : "bg-[var(--surface-2,rgba(255,255,255,0.04))] border-[var(--border)] hover:border-rose-500/30"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-2.5 rounded-xl ${
                      isSelected
                        ? "bg-rose-500 text-white"
                        : "bg-[var(--surface-3,rgba(255,255,255,0.08))] text-[var(--text-secondary)]"
                    }`}
                  >
                    <Icon size={18} />
                  </div>
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-semibold text-[var(--text)]">{w.name}</h5>
                      {isSelected && (
                        <span className="text-[10px] font-bold uppercase text-rose-400 bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/30">
                          Active ({settings.workoutTargetReps || w.defaultReps} Reps)
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] leading-tight">
                      {w.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Target Reps Configurator */}
      <div className="p-4 rounded-xl bg-[var(--surface-2,rgba(255,255,255,0.03))] border border-[var(--border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h5 className="text-xs font-semibold text-[var(--text)]">Target Repetition Count</h5>
          <p className="text-[11px] text-[var(--text-secondary)]">
            Required repetitions verified by front camera before unlocking phone.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {[10, 15, 20, 25, 30].map((reps) => (
            <button
              key={reps}
              type="button"
              onClick={() => setSelectedWorkout(settings.selectedWorkoutType || "pushups", reps)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                (settings.workoutTargetReps || 20) === reps
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  : "bg-white/5 text-[var(--text-secondary)] border border-white/10 hover:text-white"
              }`}
            >
              {reps} Reps
            </button>
          ))}
        </div>
      </div>

      {/* Lock Condition Method Selector */}
      <div className="space-y-3 pt-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-2">
          <Sliders size={16} className="text-[var(--primary)]" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            Unlock Condition Method
          </h4>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${isSelected ? "bg-[var(--primary)] text-white" : "bg-white/5 text-[var(--text-secondary)]"}`}>
                      <Icon size={18} />
                    </div>
                    {isSelected && <CheckCircle2 size={16} className="text-[var(--primary)]" />}
                  </div>
                  <div className="space-y-0.5">
                    <h5 className="text-xs font-semibold text-[var(--text)]">{cond.title}</h5>
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
    </GlassCard>
  );
}
