import { InfoCard } from "@/components/common/InfoCard";

import {
  CheckSquare,
  Droplets,
  Dumbbell,
  FolderKanban,
} from "lucide-react";

export function QuickStatsSection() {
  return (
    <section>

      <h2 className="mb-5 text-lg font-semibold">
        Today at a Glance
      </h2>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <InfoCard
          title="Water"
          value="0 / 3 L"
          icon={<Droplets size={24} />}
        />

        <InfoCard
          title="Workout"
          value="Rest Day"
          icon={<Dumbbell size={24} />}
        />

        <InfoCard
          title="Project"
          value="Atlas"
          icon={<FolderKanban size={24} />}
        />

        <InfoCard
          title="Tasks"
          value="3 Today"
          icon={<CheckSquare size={24} />}
        />

      </div>

    </section>
  );
}