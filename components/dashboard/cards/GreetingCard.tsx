"use client";

import { GlassCard } from "@/components/ui/GlassCard";

export function GreetingCard() {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <GlassCard className="relative overflow-hidden">

      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10">

        <p className="text-zinc-400">
          Welcome back
        </p>

        <h1 className="mt-2 text-5xl font-bold tracking-tight">
          {greeting}, Farhan 👋
        </h1>

        <p className="mt-4 max-w-2xl text-lg text-zinc-400">
          Your command center is ready.
          Stay consistent today and build
          the future one task at a time.
        </p>

      </div>

    </GlassCard>
  );
}