import { TaskList } from "@/components/tasks/TaskList";
import { PageHeader } from "@/components/common/PageHeader";

export default function TasksPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 sm:space-y-8">
      <PageHeader
        eyebrow="Productivity"
        title="Tasks"
        description="Organize everything you need to do in one place."
      />

      <TaskList />
    </div>
  );
}