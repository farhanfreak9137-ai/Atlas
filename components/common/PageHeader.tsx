interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-8 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary)]">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-1.5 text-3xl sm:text-4xl font-bold font-heading tracking-tight text-[var(--text)]">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-2xl text-[var(--text-secondary)] font-normal text-sm sm:text-base">
            {description}
          </p>
        )}
      </div>

      {children && (
        <div className="flex items-center gap-3">
          {children}
        </div>
      )}
    </div>
  );
}