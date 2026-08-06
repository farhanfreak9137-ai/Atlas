import { DashboardPanel } from '@/components/dashboard/DashboardPanel';

export default function GoalsCardSkeleton() {
  return (
    <DashboardPanel>
      <div className="animate-pulse space-y-4 p-4">
        {/* Title placeholder */}
        <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700"></div>
        
        {/* Content placeholder lines */}
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
          <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    </DashboardPanel>
  );
}