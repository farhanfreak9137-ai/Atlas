import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Props =
  ButtonHTMLAttributes<HTMLButtonElement>;

export function PrimaryButton({
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        `
        rounded-xl
        bg-[var(--primary)]
        px-5
        py-2.5

        font-medium
        text-white
        shadow-sm
        shadow-[var(--primary-glow)]

        transition-all
        duration-200

        hover:bg-[var(--primary-hover)]

        active:scale-[0.99]
        disabled:opacity-50
        disabled:cursor-not-allowed
        `,
        className
      )}
    />
  );
}