import { HabitList } from "@/components/habits/HabitList";
import { PageHeader } from "@/components/common/PageHeader";

export default function HabitsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Productivity"
        title="Habits"
        description="Build small habits that create big results."
      />

      <HabitList />
    </div>
  );
}