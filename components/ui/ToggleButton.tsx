"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface ToggleButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
}

export function ToggleButton({
  selected = false,
  className,
  children,
  ...props
}: ToggleButtonProps) {
  return (
    <button
      className={cn(
        `
        rounded-2xl

        border
        px-5
        py-3

        font-medium

        transition-all
        duration-200

        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
        selected
          ? `
            border-[var(--primary)]
            bg-[var(--primary)]
            text-white

            shadow-[var(--shadow-glow)]
          `
          : `
            border-[var(--border)]
            bg-[var(--glass)]
            text-[var(--text)]

            hover:bg-[var(--glass-strong)]
          `,
        className
      )}
      aria-pressed={selected}
      {...props}
    >
      {children}
    </button>
  );
}
