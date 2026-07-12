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
    <div className="mb-8 flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-zinc-400">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}