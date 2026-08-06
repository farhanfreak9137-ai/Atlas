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
      <h2 className="text-xl font-semibold text-accent">
        Today`s Focus
      </h2>

      <div className="mt-6 space-y-5">
        {dashboard.highestPriorityTask && (
          <div className="rounded-xl border border-danger/20 bg-danger/10 p-4">
            <p className="text-sm text-danger">
              HIGH PRIORITY TASK
            </p>

            <h3 className="mt-1 font-semibold text-accent">
              {dashboard.highestPriorityTask.title}
            </h3>
          </div>
        )}

        {dashboard.longestHabitStreak && (
          <div className="rounded-xl border border-primary/20 bg-primary/10 p-4">
            <p className="text-sm text-primary">
              BEST HABIT STREAK
            </p>

            <h3 className="mt-1 font-semibold text-accent">
              {dashboard.longestHabitStreak.icon}{" "}
              {dashboard.longestHabitStreak.title}
            </h3>

            <p className="mt-1 text-sm text-accent">
              🔥 {dashboard.longestHabitStreak.streak} day streak
            </p>
          </div>
        )}

        {dashboard.nearestGoalDeadline && (
          <div className="rounded-xl border border-secondary/20 bg-secondary/10 p-4">
            <p className="text-sm text-secondary">
              NEAREST GOAL
            </p>

            <h3 className="mt-1 font-semibold text-accent">
              {dashboard.nearestGoalDeadline.title}
            </h3>

            <p className="mt-1 text-sm text-accent">
              📅 {dashboard.nearestGoalDeadline.deadline}
            </p>
          </div>
        )}
      </div>
    </DashboardPanel>
  );
}