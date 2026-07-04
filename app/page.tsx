import { AppShell } from "@/components/layout/AppShell";
import { GreetingCard } from "@/components/dashboard/GreetingCard";
import { QuickStatsSection } from "@/components/dashboard/QuickStatsSection";

export default function Home() {
  return (
    <AppShell>
      <div className="space-y-8">
        <GreetingCard />
        <QuickStatsSection />
      </div>
    </AppShell>
  );
}