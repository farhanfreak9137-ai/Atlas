import { HabitList } from "@/components/habits/HabitList";

export default function HabitsPage() {
  return (
    <main className="mx-auto max-w-5xl p-8">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[0.25em] text-blue-500">
          Productivity
        </p>

        <h1 className="mt-2 text-5xl font-bold">
          Habits
        </h1>

        <p className="mt-3 max-w-xl text-zinc-400">
          Build small habits that create big results.
        </p>
      </div>

      <HabitList />
    </main>
  );
}