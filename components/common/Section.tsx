import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function Section({
  title,
  subtitle,
  children,
}: SectionProps) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold font-heading text-[var(--text)]">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            {subtitle}
          </p>
        )}
      </div>

      {children}
    </section>
  );
}