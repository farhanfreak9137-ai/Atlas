interface PrimaryButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function PrimaryButton({
  children,
  className = "",
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      {...props}
      className={`rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-5 py-2.5 font-medium text-white shadow-sm shadow-[var(--primary-glow)] transition-all duration-200 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}