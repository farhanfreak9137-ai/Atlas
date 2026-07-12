import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface GlassButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
}

export function GlassButton({
  variant = "primary",
  className,
  children,
  ...props
}: GlassButtonProps) {
  const variants = {
    primary: `
      bg-[var(--primary)]
      text-white
      hover:bg-[var(--primary-hover)]
      hover:shadow-[var(--shadow-glow)]
    `,

    secondary: `
      bg-[var(--glass)]
      border
      border-[var(--border)]
      text-[var(--text)]
      hover:bg-[var(--glass-strong)]
    `,

    danger: `
      bg-[var(--danger)]
      text-white
      hover:brightness-110
    `,
  };

  return (
    <button
      className={cn(
        `
        smooth
        rounded-2xl
        px-5
        py-3

        font-medium

        transition-all
        duration-200

        hover:-translate-y-0.5

        active:translate-y-0

        disabled:cursor-not-allowed
        disabled:opacity-50
        `,
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}