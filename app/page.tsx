"use client";

import { GreetingCard } from "@/components/dashboard/cards/GreetingCard";
import { QuickStatsSection } from "@/components/dashboard/sections/QuickStatsSection";
import { DashboardGrid } from "@/components/dashboard/sections/DashboardGrid";
import { TodaysFocus } from "@/components/dashboard/TodaysFocus";
import { AIInsightCard } from "@/components/dashboard/cards/AIInsightCard";
import { ActivityFeed } from "@/components/dashboard/sections/ActivityFeed";

import { useDashboard } from "@/hooks/useDashboard";

export default function Home() {
  const dashboard = useDashboard();

  if (!dashboard) {
    return (
      <div className="space-y-8">
        <GreetingCard />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GreetingCard />

      <DashboardGrid>
        <div className="xl:col-span-8">
          <QuickStatsSection dashboard={dashboard} />
        </div>

        <div className="xl:col-span-4">
          <TodaysFocus dashboard={dashboard} />
        </div>
      </DashboardGrid>

      <AIInsightCard />

      <ActivityFeed />
    </div>
  );
}