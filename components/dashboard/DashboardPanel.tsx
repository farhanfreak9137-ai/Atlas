import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";

interface DashboardPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function DashboardPanel({
  title,
  children,
  className = "",
}: DashboardPanelProps) {
  return (
    <GlassCard className={cn("border-zinc-800 bg-zinc-900", className)}>
      <h2 className="text-lg font-medium text-zinc-100 mb-4">{title}</h2>
      <div className="p-4">{children}</div>
    </GlassCard>
  );
}