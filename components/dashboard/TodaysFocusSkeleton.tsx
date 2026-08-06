import { DashboardPanel } from '@/components/dashboard/DashboardPanel';

export function TodaysFocusSkeleton() {
  return (
    <DashboardPanel>
      <div className="space-y-6">
        {/* Title Skeleton */}
        <div className="h-6 w-40 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

        {/* Focus Items Skeleton */}
        <div className="space-y-5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-4 animate-pulse">
              <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-5 w-48 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}