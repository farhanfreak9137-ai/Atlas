"use client";

import { DashboardPanel } from "@/components/common/DashboardPanel";
import { Skeleton } from "@/components/ui/Skeleton"; // Assuming a Skeleton component exists or will be created

export function TodaysFocusSkeleton() {
  return (
    <DashboardPanel>
      <Skeleton className="h-6 w-1/2 mb-6" />

      <div className="mt-6 space-y-5">
        {/* High Priority Task Skeleton */}
        <div className="rounded-xl border p-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-2/3 mt-1" />
        </div>

        {/* Best Habit Streak Skeleton */}
        <div className="rounded-xl border p-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-2/3 mt-1" />
          <Skeleton className="h-4 w-1/4 mt-1" />
        </div>

        {/* Nearest Goal Deadline Skeleton */}
        <div className="rounded-xl border p-4">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-6 w-2/3 mt-1" />
          <Skeleton className="h-4 w-1/4 mt-1" />
        </div>
      </div>
    </DashboardPanel>
  );
}
