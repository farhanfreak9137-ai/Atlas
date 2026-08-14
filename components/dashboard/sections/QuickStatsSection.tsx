"use client";

import { InfoCard } from "@/components/common/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CheckSquare,
  Droplets,
  Dumbbell,
  FolderKanban,
  Activity,
  Trophy,
} from "lucide-react";

import { DashboardService } from "@/services/dashboard.service";

interface QuickStatsSectionProps {
  dashboard: ReturnType<
    typeof DashboardService.getOverview
  >;
  activeWidgets?: string[];
}

export function QuickStatsSection({
  dashboard,
  activeWidgets,
}: QuickStatsSectionProps) {
  const showAll = !activeWidgets;
  const showTasks = showAll || activeWidgets.includes("tasks");
  const showHabits = showAll || activeWidgets.includes("habits");
  const showGoals = showAll || activeWidgets.includes("goals");
  const showStats = showAll || activeWidgets.includes("statistics");

  return (
    <section>
      <SectionHeader
        title="Today's Overview"
        subtitle="A quick snapshot of your progress."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {showTasks && (
          <InfoCard
            title="Tasks"
            value={`${dashboard.tasks.active} Active`}
            icon={<CheckSquare size={22} className="text-[var(--primary)]" />}
          />
        )}

        {showHabits && (
          <InfoCard
            title="Habits"
            value={`${dashboard.habits.completed} / ${dashboard.habits.total}`}
            icon={<Droplets size={22} className="text-[var(--primary)]" />}
          />
        )}

        {showGoals && (
          <InfoCard
            title="Goals"
            value={`${dashboard.goals.active} Active`}
            icon={<FolderKanban size={22} className="text-[var(--primary)]" />}
          />
        )}

        {showStats && (
          <>
            <InfoCard
              title="Productivity"
              value={`${dashboard.productivity}%`}
              icon={<Activity size={22} className="text-[var(--primary)]" />}
            />

            <InfoCard
              title="Gym"
              value={`${dashboard.gymStats.streak} day streak`}
              icon={<Dumbbell size={22} className="text-[var(--primary)]" />}
            />

            <InfoCard
              title="Football"
              value={`${dashboard.footballStats.totalGoals} goals`}
              icon={<Trophy size={22} className="text-[var(--primary)]" />}
            />
          </>
        )}
      </div>
    </section>
  );
}

