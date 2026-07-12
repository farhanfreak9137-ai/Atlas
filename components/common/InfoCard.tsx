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

        <div className="space-y-3">

          <p className="text-sm font-medium text-zinc-400">
            {title}
          </p>

          <h3 className="text-3xl font-bold tracking-tight text-white">
            {value}
          </h3>

        </div>

        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-blue-500/10
            text-blue-400

            transition-all
            duration-300

            group-hover:scale-110
            group-hover:bg-blue-500/20
            group-hover:text-blue-300
          "
        >
          {icon}
        </div>

      </div>
    </GlassCard>
  );
}