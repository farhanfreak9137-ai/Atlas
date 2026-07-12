interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-zinc-700 py-16 text-center">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-2 text-zinc-500">
        {description}
      </p>
    </div>
  );
}