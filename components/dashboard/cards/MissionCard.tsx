import { DashboardPanel } from "@/components/common/DashboardPanel";
import { getDashboardData } from "@/services/dashboard.service";

export function MissionCard() {
  const dashboard = getDashboardData();

  return (
    <DashboardPanel>
      <div className="space-y-6">
        <div>
          <p className="text-sm uppercase tracking-widest text-blue-400">
            Mission Today
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Focus on what moves you forward.
          </h2>

          <p className="mt-2 text-zinc-400">
            Small consistent wins beat one huge burst of motivation.
          </p>
        </div>

        <div className="space-y-3">
          {dashboard.todaysFocus.map((task) => (
            <div
              key={task}
              className="flex items-center gap-3 rounded-xl border border-zinc-800 p-3"
            >
              <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

              <span>{task}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardPanel>
  );
}