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
    <div className="mb-10 flex items-end justify-between gap-6">
      <div>
        {eyebrow && (
          <p className="text-sm uppercase tracking-[0.25em] text-[#1F7A5B]">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-2 text-5xl font-bold text-white">
          {title}
        </h1>

        {description && (
          <p className="mt-3 max-w-2xl text-zinc-400">
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