"use client";

import { InfoCard } from "@/components/common/InfoCard";
import { useDashboard } from "@/hooks/useDashboard";

import {
  CheckSquare,
  Droplets,
  Dumbbell,
  FolderKanban,
} from "lucide-react";

export function QuickStatsSection() {
  const dashboard = useDashboard();

  return (
    <section>
      <h2 className="mb-5 text-lg font-semibold">
        Today at a Glance
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Tasks"
          value={`${dashboard.tasks.active} Active`}
          icon={<CheckSquare size={24} />}
        />

        <InfoCard
          title="Habits"
          value={`${dashboard.habits.completed} / ${dashboard.habits.total}`}
          icon={<Droplets size={24} />}
        />

        <InfoCard
          title="Goals"
          value={`${dashboard.goals.active} Active`}
          icon={<FolderKanban size={24} />}
        />

        <InfoCard
          title="Productivity"
          value={`${dashboard.productivity}%`}
          icon={<Dumbbell size={24} />}
        />
      </div>
    </section>
  );
}