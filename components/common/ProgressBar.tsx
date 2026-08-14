interface ProgressBarProps {
  value: number;
}

export function ProgressBar({
  value,
}: ProgressBarProps) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.5)] transition-all duration-300"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
        }}
      />
    </div>
  );
}