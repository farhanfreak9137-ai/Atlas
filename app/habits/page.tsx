import { HabitList } from "@/components/habits/HabitList";
import { PageHeader } from "@/components/common/PageHeader";

export default function HabitsPage() {
  return (
    <main className="mx-auto max-w-7xl p-8">
      <PageHeader
        eyebrow="Productivity"
        title="Habits"
        description="Build small habits that create big results."
      />

      <HabitList />
    </main>
  );
}