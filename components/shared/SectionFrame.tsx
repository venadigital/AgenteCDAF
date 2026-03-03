import type { ReactNode } from "react";
import { Eyebrow } from "@/components/shared/Eyebrow";

interface SectionFrameProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
}: SectionFrameProps) {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="mb-6 space-y-3">
        {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
        <h2 className="font-display text-4xl leading-[0.95] text-[var(--color-ink)] sm:text-5xl">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-[var(--color-muted)] sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
