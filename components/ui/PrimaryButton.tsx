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
        bg-[#1F7A5B]
        px-5
        py-3

        font-medium
        text-white

        transition-all
        duration-300

        hover:scale-[1.02]
        hover:bg-[#2A8F66]

        active:scale-[0.98]
        `,
        className
      )}
    />
  );
}