import { DashboardPanel } from '@/components/dashboard/DashboardPanel';
import { AIInsightCard } from './AIInsightCard';

export function AIInsightCardSkeleton() {  // Now using real implementation
  return (
    <DashboardPanel>
      <AIInsightCard/>
    </DashboardPanel>
  );
}