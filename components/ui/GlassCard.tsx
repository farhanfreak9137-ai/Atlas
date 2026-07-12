import { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        `
        glass
        smooth
        rounded-[28px]
        border
        border-white/10
        p-6

        hover:-translate-y-1
        hover:border-blue-500/30
        hover:shadow-[0_0_40px_rgba(59,130,246,.12)]
        `,
        className
      )}
    >
      {children}
    </div>
  );
}