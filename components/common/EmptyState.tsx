import { GlassCard } from "@/components/ui/GlassCard";
import { FolderOpen } from "lucide-react";

interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <GlassCard className="py-16 text-center border-dashed border-white/10 bg-[#0c1527]/30">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4">
        <FolderOpen size={24} />
      </div>
      <h3 className="text-xl font-semibold font-heading text-slate-100">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-slate-400 font-normal max-w-sm mx-auto">
        {description}
      </p>
    </GlassCard>
  );
}