import { ReactNode } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/cn";

interface InfoCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  className?: string;
}

export function InfoCard({
  title,
  value,
  icon,
  className,
}: InfoCardProps) {
  return (
    <GlassCard
      className={cn(
        "group cursor-pointer overflow-hidden",
        className
      )}
    >
      <div className="flex items-start justify-between">

        <div className="space-y-1.5">

          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary,#64748b)]">
            {title}
          </p>

          <h3 className="text-2xl sm:text-3xl font-bold tracking-display tabular-nums text-[var(--text)] font-heading group-hover:text-[var(--primary)]"
            style={{ transition: "color 200ms ease" }}
          >
            {value}
          </h3>

        </div>

        <div
          className="
            flex h-11 w-11 items-center justify-center
            rounded-xl
            bg-[var(--primary)]/10
            border border-[var(--primary)]/20
            text-[var(--primary)]
            shadow-[0_0_12px_rgba(16,185,129,0.08)]

            group-hover:scale-105
            group-hover:bg-[var(--primary)]/15
            group-hover:border-[var(--primary)]/30
          "
          style={{ transition: "transform 200ms ease, background-color 200ms ease, border-color 200ms ease" }}
        >
          {icon}
        </div>

      </div>
    </GlassCard>
  );
}