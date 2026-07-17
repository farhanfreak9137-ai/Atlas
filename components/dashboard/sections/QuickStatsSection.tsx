"use client";

import { InfoCard } from "@/components/common/InfoCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  CheckSquare,
  Droplets,
  Dumbbell,
  FolderKanban,
} from "lucide-react";

import { DashboardService } from "@/services/dashboard.service";

interface QuickStatsSectionProps {
  dashboard: ReturnType<
    typeof DashboardService.getOverview
  >;
}

export function QuickStatsSection({
  dashboard,
}: QuickStatsSectionProps) {
  return (
    <section>
      <SectionHeader
        title="Today's Overview"
        subtitle="A quick snapshot of your progress."
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Tasks"
          value={`${dashboard.tasks.active} Active`}
          icon={<CheckSquare size={24} color="#34C759" />}
          valueColor="text-primary"
          iconBgColor="bg-primary/10"
        />

        <InfoCard
          title="Habits"
          value={`${dashboard.habits.completed} / ${dashboard.habits.total}`}
          icon={<Droplets size={24} color="#34C759" />}
          valueColor="text-primary"
          iconBgColor="bg-primary/10"
        />

        <InfoCard
          title="Goals"
          value={`${dashboard.goals.active} Active`}
          icon={<FolderKanban size={24} color="#34C759" />}
          valueColor="text-primary"
          iconBgColor="bg-primary/10"
        />

        <InfoCard
          title="Productivity"
          value={`${dashboard.productivity}%`}
          icon={<Dumbbell size={24} color="#34C759" />}
          valueColor="text-primary"
          iconBgColor="bg-primary/10"
        />
      </div>
    </section>
  );
}