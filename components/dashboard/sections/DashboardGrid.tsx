import { ReactNode } from "react";

interface DashboardGridProps {
  children: ReactNode;
}

export function DashboardGrid({
  children,
}: DashboardGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
      {children}
    </div>
  );
}