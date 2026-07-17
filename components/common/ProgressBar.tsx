interface ProgressBarProps {
  value: number;
}

export function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
      <div
        className="h-full rounded-full bg-[#1F7A5B] transition-all duration-300"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
        }}
      />
    </div>
  );
}