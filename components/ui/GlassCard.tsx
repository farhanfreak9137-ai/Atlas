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
        glass-card-glow

        relative
        overflow-hidden
        rounded-2xl

        border
        border-[var(--border)]

        bg-[var(--card)]

        backdrop-blur-xl

        p-5 sm:p-6

        shadow-[var(--shadow-card)]

        hover:-translate-y-px
        hover:border-[var(--primary)]/25
        hover:shadow-[var(--shadow-glow)]
        `,
        className
      )}
      style={{
        transition:
          "transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease",
      }}
    >
      {children}
    </div>
  );
}
