import { AppShell } from "@/components/layout/AppShell";
import { GreetingCard } from "@/components/dashboard/GreetingCard";
import { QuickStatsSection } from "@/components/dashboard/QuickStatsSection";
import { getDashboardData } from "@/services/dashboard.service";
import { DashboardGrid } from "@/components/dashboard/dashboardgrid";
import { TodaysFocus } from "@/components/dashboard/TodaysFocus";
const dashboard = getDashboardData();
export default function Home() {
  return (
    <AppShell>
  <div className="space-y-8">

    <GreetingCard />

    <DashboardGrid>

      <div className="xl:col-span-8">
        <QuickStatsSection />
      </div>

      <div className="xl:col-span-4">
        <TodaysFocus />
      </div>

    </DashboardGrid>

  </div>
    </AppShell>
  );
}
