import { DashboardPanel } from "@/components/common/DashboardPanel";

export function AIInsightCard() {
  return (
    <DashboardPanel>
      <div className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-widest text-blue-400">
            Atlas Insight
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            You`re making good progress.
          </h2>
        </div>

        <p className="text-zinc-400">
          Keep your water intake consistent today. Based on your routine,
          staying hydrated before your workout will help your performance.
        </p>
      </div>
    </DashboardPanel>
  );
}