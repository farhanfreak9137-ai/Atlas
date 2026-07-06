import { GoalList } from "@/components/goals/GoalList";

export default function GoalsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-500">
          Productivity
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Goals
        </h1>

        <p className="mt-3 max-w-xl text-zinc-400">
          Turn long-term dreams into measurable progress.
        </p>
      </div>

      <GoalList />
    </main>
  );
}