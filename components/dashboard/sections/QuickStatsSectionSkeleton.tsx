import { DashboardPanel } from '@/components/dashboard/DashboardPanel';

export function QuickStatsSectionSkeleton() {
  return (
    <DashboardPanel>
      <div className="space-y-6">
        {/* Section Header Skeleton */}
        <div className="space-y-2">
          <div className="h-7 w-48 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
          <div className="h-4 w-64 rounded bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
        </div>

        {/* Stats Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-2 p-4 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
              <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-6 w-24 rounded bg-gray-200 dark:bg-gray-700"></div>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}