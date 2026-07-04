import { ReactNode } from "react";

interface InfoCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

export function InfoCard({
  title,
  value,
  icon,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40">
      <div className="mb-4 text-zinc-400">
        {icon}
      </div>

      <h3 className="text-sm text-zinc-500">
        {title}
      </h3>

      <p className="mt-2 text-xl font-semibold text-white">
        {value}
      </p>
    </div>
  );
}