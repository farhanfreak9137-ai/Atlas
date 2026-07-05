import { TaskList } from "@/components/tasks/TaskList";

export default function TasksPage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        Tasks
      </h1>

      <p className="mb-8 text-zinc-400">
        Manage everything you need to do.
      </p>

      <TaskList />
    </main>
  );
}