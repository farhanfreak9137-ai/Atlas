import { GoalList } from "@/components/goals/GoalList";
import { PageHeader } from "@/components/common/PageHeader";

export default function GoalsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Productivity"
        title="Goals"
        description="Turn long-term dreams into measurable progress."
      />

      <GoalList />
    </div>
  );
}