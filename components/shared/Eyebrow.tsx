import type { ReactNode } from "react";

interface EyebrowProps {
  children: ReactNode;
  className?: string;
}

export function Eyebrow({ children, className = "" }: EyebrowProps) {
  return (
    <p
      className={`font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--color-muted)] ${className}`}
    >
      {children}
    </p>
  );
}
