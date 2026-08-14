import { DashboardPanel } from "@/components/dashboard/DashboardPanel";
import { Sparkles } from "lucide-react";

export function AIInsightCard() {
  return (
    <DashboardPanel>
      <div className="space-y-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <Sparkles size={13} className="text-emerald-400" />
            Atlas Insight
          </div>

          <h2 className="mt-3 text-xl sm:text-2xl font-bold font-heading text-[var(--text)]">
            You're making good progress.
          </h2>
        </div>

        <p className="text-[var(--text-secondary)] leading-relaxed text-sm sm:text-base">
          Keep your water intake consistent today. Based on your routine,
          staying hydrated before your workout will help your performance.
        </p>
      </div>
    </DashboardPanel>
  );
}