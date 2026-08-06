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
        p-4 sm:p-6

        hover:-translate-y-1
        hover:border-[#1F7A5B]/30
        hover:shadow-[0_0_40px_rgba(31,122,91,.12)]
        `,
        className
      )}
    >
      {children}
    </div>
  );
}