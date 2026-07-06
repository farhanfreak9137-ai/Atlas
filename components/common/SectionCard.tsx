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
      className={`rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-lg backdrop-blur ${className}`}
    >
      {title && (
        <h2 className="mb-6 text-xl font-semibold text-white">
          {title}
        </h2>
      )}

      {children}
    </section>
  );
}