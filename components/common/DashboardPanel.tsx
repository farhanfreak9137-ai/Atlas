import { ReactNode } from "react";

interface DashboardPanelProps {
  children: ReactNode;
  className?: string;
}

export function DashboardPanel({
  children,
  className = "",
}: DashboardPanelProps) {
  return (
    <div
      className={`rounded-2xl border border-zinc-800 bg-zinc-900 p-6 ${className}`}
    >
      {children}
    </div>
  );
}