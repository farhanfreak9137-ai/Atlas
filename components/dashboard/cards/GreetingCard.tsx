"use client";

import { GlassCard } from "@/components/ui/GlassCard";

function getGreeting(hour: number): { text: string; emoji: string; label: string } {
  if (hour >= 0 && hour < 5) {
    return { text: "Working late?", emoji: "🌙", label: "Late night" };
  }
  if (hour < 12) {
    return { text: "Good morning", emoji: "☀️", label: "Morning" };
  }
  if (hour < 18) {
    return { text: "Good afternoon", emoji: "🌤️", label: "Afternoon" };
  }
  return { text: "Good evening", emoji: "🌙", label: "Evening" };
}

export function GreetingCard() {
  const hour = new Date().getHours();
  const { text, emoji, label } = getGreeting(hour);

  return (
    <GlassCard className="relative overflow-hidden border-[var(--border)] bg-[var(--card)] page-enter">

      {/* Ambient soft glow */}
      <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--primary)]/8 blur-3xl pointer-events-none" />
      <div className="absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-teal-500/5 blur-2xl pointer-events-none" />

      <div className="relative z-10">

        {/* Time-of-day badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/20 bg-[var(--primary)]/8 px-3 py-1 text-xs font-semibold text-[var(--primary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
          {label}
        </div>

        {/* Main heading */}
        <h1 className="mt-3 text-2xl font-bold font-heading tracking-display text-[var(--text)] sm:text-3xl lg:text-4xl">
          {text}, Farhan {emoji}
        </h1>

        <p className="mt-2 max-w-2xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-normal">
          Your command center is ready. Stay consistent today and build the future one task at a time.
        </p>

      </div>

    </GlassCard>
  );
}