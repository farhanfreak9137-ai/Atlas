import { DashboardPanel } from "@/components/common/DashboardPanel";

export function TodaysFocus() {
  const focusItems = [
    "Complete today's tasks",
    "Finish your daily habits",
    "Make progress on one goal",
  ];

  return (
    <DashboardPanel>
      <h2 className="text-xl font-semibold">
        Today`s Focus
      </h2>

      <div className="mt-6 space-y-4">
        {focusItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3"
          >
            <div className="h-3 w-3 rounded-full bg-blue-500" />

            <p>{item}</p>
          </div>
        ))}
      </div>
    </DashboardPanel>
  );
}