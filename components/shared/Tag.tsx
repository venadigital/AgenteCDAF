import type { ReactNode } from "react";

type Tone =
  | "neutral"
  | "risk"
  | "opportunity"
  | "scope"
  | "flow"
  | "rules"
  | "tech"
  | "prompt"
  | "decision";

interface TagProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}

const toneClass: Record<Tone, string> = {
  neutral: "border-black/70 bg-black text-white",
  risk: "border-black/70 bg-black text-white",
  opportunity:
    "border-[rgba(200,238,3,0.55)] bg-[rgba(200,238,3,0.18)] text-[var(--color-ink)]",
  scope: "border-black/35 bg-white text-[var(--color-ink)]",
  flow: "border-black/70 bg-black text-white",
  rules:
    "border-[rgba(200,238,3,0.45)] bg-[rgba(200,238,3,0.12)] text-[var(--color-ink)]",
  tech: "border-black/70 bg-black text-white",
  prompt:
    "border-[rgba(200,238,3,0.6)] bg-[rgba(200,238,3,0.24)] text-[var(--color-ink)]",
  decision: "border-[var(--color-court)] bg-[var(--color-court)] text-[var(--color-paper)]",
};

export function Tag({ children, tone = "neutral", className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${toneClass[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
