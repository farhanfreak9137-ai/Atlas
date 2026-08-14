interface SectionCardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  children,
  className = "",
}: SectionCardProps) {
  return (
    <section
      className={`rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-lg backdrop-blur ${className}`}
    >
      {title && (
        <h2 className="mb-6 text-xl font-semibold text-[var(--text)]">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}