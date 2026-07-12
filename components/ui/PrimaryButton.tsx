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
        rounded-2xl
        bg-blue-600
        px-5
        py-3

        font-medium
        text-white

        transition-all
        duration-300

        hover:scale-[1.02]
        hover:bg-blue-500

        active:scale-[0.98]
        `,
        className
      )}
    />
  );
}