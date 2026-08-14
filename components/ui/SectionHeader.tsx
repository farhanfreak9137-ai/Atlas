import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function SectionHeader({
  title,
  subtitle,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-[var(--text)]">
          {title}
        </h2>

        {/* Emerald accent underline */}
        <div
          className="mt-1.5 h-[2px] w-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-transparent"
        />

        {subtitle && (
          <p className="mt-2 text-sm text-[var(--text-secondary)] font-normal">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}