"use client";

import { GreetingCard } from "@/components/dashboard/cards/GreetingCard";
import { QuickStatsSection } from "@/components/dashboard/sections/QuickStatsSection";
import { DashboardGrid } from "@/components/dashboard/sections/DashboardGrid";
import { TodaysFocus } from "@/components/dashboard/TodaysFocus";
import { AIInsightCard } from "@/components/dashboard/cards/AIInsightCard";
import { ActivityFeed } from "@/components/dashboard/sections/ActivityFeed";

import { useDashboard } from "@/hooks/useDashboard";
import { useDashboardStore } from "@/stores/dashboard.store";

export default function Home() {
  const { dashboard, isLoading, isError } = useDashboard();
  const settings = useDashboardStore((s) => s.settings);

  if (isLoading) {
    return (
      <div className="space-y-8 p-4 text-center">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-8 p-4 text-center text-red-500">
        <p>Error loading dashboard. Please try again later.</p>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="space-y-8">
        <GreetingCard />
      </div>
    );
  }

  const activeWidgets = settings.activeWidgets ?? [];
  const layout = settings.dashboardLayout ?? "grid";

  // Determine spacing and layout container style
  const layoutClasses =
    layout === "compact"
      ? "space-y-4"
      : layout === "list"
      ? "space-y-6 max-w-4xl mx-auto"
      : "space-y-8";

  const showStats = activeWidgets.some((w) =>
    ["tasks", "habits", "goals", "statistics"].includes(w)
  );

  return (
    <div className={layoutClasses}>
      <GreetingCard />

      {(showStats || activeWidgets.includes("calendar")) && (
        <DashboardGrid>
          {showStats && (
            <div className={activeWidgets.includes("calendar") ? "xl:col-span-8" : "xl:col-span-12"}>
              <QuickStatsSection dashboard={dashboard} activeWidgets={activeWidgets} />
            </div>
          )}

          {activeWidgets.includes("calendar") && (
            <div className={showStats ? "xl:col-span-4" : "xl:col-span-12"}>
              <TodaysFocus dashboard={dashboard} />
            </div>
          )}
        </DashboardGrid>
      )}

      {activeWidgets.includes("aiInsights") && <AIInsightCard />}

      <ActivityFeed />
    </div>
  );
}

