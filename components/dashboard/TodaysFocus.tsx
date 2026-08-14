"use client";

import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { DashboardService } from "@/services/dashboard.service";

interface TodaysFocusProps {
  dashboard: ReturnType<
    typeof DashboardService.getOverview
  >;
}

export function TodaysFocus({
  dashboard,
}: TodaysFocusProps) {
  return (
    <DashboardPanel>
      <h2 className="text-xl font-bold font-heading text-[var(--text)]">
        Today's Focus
      </h2>

      <div className="mt-6 space-y-4">
        {dashboard.highestPriorityTask && (
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-4 backdrop-blur-md">
            <p className="text-xs font-bold tracking-wider text-rose-400 uppercase">
              High Priority Task
            </p>

            <h3 className="mt-1 font-semibold text-[var(--text)]">
              {dashboard.highestPriorityTask.title}
            </h3>
          </div>
        )}

        {dashboard.longestHabitStreak && (
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 backdrop-blur-md">
            <p className="text-xs font-bold tracking-wider text-emerald-400 uppercase">
              Best Habit Streak
            </p>

            <h3 className="mt-1 font-semibold text-[var(--text)]">
              {dashboard.longestHabitStreak.icon}{" "}
              {dashboard.longestHabitStreak.title}
            </h3>

            <p className="mt-1 text-sm font-medium text-emerald-300">
              🔥 {dashboard.longestHabitStreak.streak} day streak
            </p>
          </div>
        )}

        {dashboard.nearestGoalDeadline && (
          <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 backdrop-blur-md">
            <p className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
              Nearest Goal
            </p>

            <h3 className="mt-1 font-semibold text-[var(--text)]">
              {dashboard.nearestGoalDeadline.title}
            </h3>

            <p className="mt-1 text-sm font-medium text-cyan-300">
              📅 {dashboard.nearestGoalDeadline.deadline}
            </p>
          </div>
        )}
      </div>
    </DashboardPanel>
  );
}