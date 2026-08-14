import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";

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
    <GlassCard className={cn("border-[var(--border)]", className)}>
      {title && <h2 className="text-lg font-bold font-heading text-[var(--text)] mb-4">{title}</h2>}
      <div>{children}</div>
    </GlassCard>
  );
}