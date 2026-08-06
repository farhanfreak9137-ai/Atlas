import { DashboardPanel } from '@/components/dashboard/DashboardPanel';
import { HabitsCard } from './HabitsCard';

export function HabitsCardSkeleton() {
  return (
    <DashboardPanel>
      <HabitsCard/>
    </DashboardPanel>
  );
}