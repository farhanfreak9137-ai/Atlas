"use client";

import { Brain, CheckSquare, Target, Zap, Lightbulb, Sparkles } from "lucide-react";

interface ChatEmptyProps {
  onSelectPrompt?: (prompt: string) => void;
}

const PROMPT_SUGGESTIONS = [
  {
    icon: CheckSquare,
    label: "Priority Tasks",
    prompt: "What are my top priority pending tasks for today?",
  },
  {
    icon: Target,
    label: "Goal Progress",
    prompt: "Review my active goals and suggest my next steps.",
  },
  {
    icon: Zap,
    label: "Habit Status",
    prompt: "Which habits have I completed today and what is remaining?",
  },
  {
    icon: Lightbulb,
    label: "Brainstorming",
    prompt: "Give me 3 high-impact focus ideas based on my current tasks.",
  },
];

export function ChatEmpty({ onSelectPrompt }: ChatEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12 text-center my-auto page-enter">

      {/* Icon */}
      <div className="relative">
        <div className="rounded-2xl bg-[var(--primary)]/12 p-5 border border-[var(--primary)]/25 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <Brain size={36} className="text-[var(--primary)] animate-pulse" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-[10px] font-bold text-white shadow-[0_0_10px_var(--primary-glow)]">
          <Sparkles size={10} />
        </div>
      </div>

      {/* Heading */}
      <div className="max-w-sm">
        <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-display text-[var(--text)]">
          Welcome to Atlas AI
        </h2>
        <p className="mt-2.5 text-sm text-[var(--text-secondary)] leading-relaxed">
          Your personal life OS assistant. Ask about your tasks, goals, habits, or start a conversation below.
        </p>
      </div>

      {/* Prompt cards — staggered animation */}
      <div className="w-full max-w-lg grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
        {PROMPT_SUGGESTIONS.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onSelectPrompt?.(item.prompt)}
              className="
                stagger-item
                group
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                backdrop-blur-sm
                p-3.5
                text-left
                hover:border-[var(--primary)]/30
                hover:bg-[var(--primary)]/5
                hover:shadow-[0_0_15px_rgba(16,185,129,0.1)]
                active:scale-[0.98]
              "
              style={{
                transition:
                  "background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease, transform 100ms ease",
              }}
            >
              <div
                className="rounded-lg bg-[var(--primary)]/8 p-2 border border-[var(--primary)]/15 text-[var(--primary)] flex-shrink-0 group-hover:bg-[var(--primary)]/15"
                style={{ transition: "background-color 150ms ease" }}
              >
                <Icon size={17} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold text-[var(--text)] group-hover:text-[var(--primary)]"
                  style={{ transition: "color 150ms ease" }}
                >
                  {item.label}
                </p>
                <p className="text-[11px] text-[var(--text-tertiary,#64748b)] line-clamp-2 mt-0.5 leading-snug">
                  {item.prompt}
                </p>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
}
