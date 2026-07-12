"use client";

import { DashboardPanel } from "@/components/common/DashboardPanel";
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
      <h2 className="text-xl font-semibold">
        Today`s Focus
      </h2>

      <div className="mt-6 space-y-5">
        {dashboard.highestPriorityTask && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4">
            <p className="text-sm text-red-400">
              HIGH PRIORITY TASK
            </p>

            <h3 className="mt-1 font-semibold">
              {dashboard.highestPriorityTask.title}
            </h3>
          </div>
        )}

        {dashboard.longestHabitStreak && (
          <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4">
            <p className="text-sm text-green-400">
              BEST HABIT STREAK
            </p>

            <h3 className="mt-1 font-semibold">
              {dashboard.longestHabitStreak.icon}{" "}
              {dashboard.longestHabitStreak.title}
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              🔥 {dashboard.longestHabitStreak.streak} day streak
            </p>
          </div>
        )}

        {dashboard.nearestGoalDeadline && (
          <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">
            <p className="text-sm text-blue-400">
              NEAREST GOAL
            </p>

            <h3 className="mt-1 font-semibold">
              {dashboard.nearestGoalDeadline.title}
            </h3>

            <p className="mt-1 text-sm text-zinc-400">
              📅 {dashboard.nearestGoalDeadline.deadline}
            </p>
          </div>
        )}
      </div>
    </DashboardPanel>
  );
}