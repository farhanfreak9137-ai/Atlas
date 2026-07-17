import { DashboardPanel } from "@/components/common/DashboardPanel";
import { Skeleton } from "@/components/ui/Skeleton";

export function AIInsightCardSkeleton() {
  return (
    <DashboardPanel>
      <div className="space-y-4">
        <div>
          <Skeleton className="h-4 w-1/4 mb-2" />
          <Skeleton className="h-8 w-3/4" />
        </div>

        <Skeleton className="h-16 w-full" />
      </div>
    </DashboardPanel>
  );
}
