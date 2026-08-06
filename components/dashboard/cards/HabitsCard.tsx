import { DashboardPanel } from "@/components/dashboard/DashboardPanel";

export function HabitsCard() {
  return (
    <DashboardPanel>
      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-primary">
            Daily Habits
          </p>

          <h2 className="mt-2 text-2xl font-bold text-accent">
            Build consistency.
          </h2>
        </div>

        <p className="text-accent">
          Track your daily habits and build momentum. Every small action compounds into significant progress.
        </p>
      </div>
    </DashboardPanel>
  );
}
