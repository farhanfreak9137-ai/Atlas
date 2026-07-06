import { InfoCard } from "@/components/common/InfoCard";

import {
  CheckSquare,
  Droplets,
  Dumbbell,
  FolderKanban,
} from "lucide-react";

interface QuickStatsSectionProps {
  stats: {
    tasks: {
      total: number;
      completed: number;
      active: number;
      completionRate: number;
    };

    habits: {
      total: number;
      completed: number;
      active: number;
      completionRate: number;
    };

    goals: {
      total: number;
      completed: number;
      active: number;
      completionRate: number;
    };

    productivity: number;
  };
}

export function QuickStatsSection({
  stats,
}: QuickStatsSectionProps) {
  return (
    <section>
      <h2 className="mb-5 text-lg font-semibold">
        Today at a Glance
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard
          title="Tasks"
          value={`${stats.tasks.active} Active`}
          icon={<CheckSquare size={24} />}
        />

        <InfoCard
          title="Habits"
          value={`${stats.habits.completed}/${stats.habits.total}`}
          icon={<Droplets size={24} />}
        />

        <InfoCard
          title="Goals"
          value={`${stats.goals.active} Active`}
          icon={<FolderKanban size={24} />}
        />

        <InfoCard
          title="Productivity"
          value={`${stats.productivity}%`}
          icon={<Dumbbell size={24} />}
        />
      </div>
    </section>
  );
}