"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function ActivityFeedSkeleton() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
      <Skeleton className="h-6 w-1/2 mb-5" />

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl bg-zinc-800 p-3">
            <Skeleton className="h-5 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
