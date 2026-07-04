import { Section } from "@/components/common/Section";
<Section
  title="Today's Focus"
  subtitle="Your priorities for today" children={undefined}>
  {/* existing card content */}
</Section>
export function TodaysFocus() {
  const tasks = [
    "Finish Atlas Session",
    "Drink 3L of water",
    "Gym Workout",
    "Study Physics",
  ];

  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 className="text-xl font-semibold">
     Today`s Focus
      </h2>

      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <div
            key={task}
            className="flex items-center gap-3"
          >
            <div className="h-3 w-3 rounded-full bg-blue-500" />

            <p>{task}</p>
          </div>
        ))}
      </div>
    </section>
  );
}