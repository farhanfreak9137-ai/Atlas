import { Section } from "@/components/common/Section";
import { DashboardPanel } from "@/components/common/DashboardPanel";
<Section
  title="Today's Focus"
  subtitle="Your priorities for today" children={undefined}>
  {/* existing card content */}
</Section>
export function TodaysFocus() {
 import { getDashboardData } from "@/services/dashboard.service";

const dashboard = getDashboardData();

const tasks = dashboard.todaysFocus;

  return (
    <DashboardPanel>
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
    </DashboardPanel>
  );
}