import { forwardRef, InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface GlassInputProps
  extends InputHTMLAttributes<HTMLInputElement> {}

export const GlassInput = forwardRef<
  HTMLInputElement,
  GlassInputProps
>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        `
        w-full
        rounded-2xl

        border
        border-[var(--border)]

        bg-[var(--glass)]
        px-4
        py-3

        text-[var(--text)]
        placeholder:text-[var(--text-secondary)]

        backdrop-blur-xl

        outline-none

        transition-all
        duration-200

        focus:border-[var(--primary)]
        focus:ring-2
        focus:ring-[color:var(--primary-glow)]

        hover:border-white/20
        `,
        className
      )}
      {...props}
    />
  );
});

GlassInput.displayName = "GlassInput";