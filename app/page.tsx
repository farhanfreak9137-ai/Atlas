import { AppShell } from "@/components/layout/AppShell";

import { GreetingCard } from "@/components/dashboard/GreetingCard";
import { QuickStatsSection } from "@/components/dashboard/QuickStatsSection";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { TodaysFocus } from "@/components/dashboard/TodaysFocus";
import { AIInsightCard } from "@/components/dashboard/AIInsightCard";

import { DashboardService } from "@/services/dashboard.service";

export default function Home() {
  const dashboard =
    DashboardService.getOverview();

  return (
    <AppShell>
      <div className="space-y-8">
        <GreetingCard />

        <DashboardGrid>
          <div className="xl:col-span-8">
            <QuickStatsSection
              stats={dashboard}
            />
          </div>

          <div className="xl:col-span-4">
            <TodaysFocus />
          </div>
        </DashboardGrid>

        <AIInsightCard
          productivity={
            dashboard.productivity
          }
        />
      </div>
    </AppShell>
  );
}