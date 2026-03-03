import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

interface ContentCardProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode;
}

export function ContentCard({ children, className = "", ...props }: ContentCardProps) {
  return (
    <div
      {...props}
      className={`relative overflow-hidden rounded-[22px] border border-black/12 bg-white/88 shadow-[var(--shadow-card)] backdrop-blur-sm ${className}`}
    >
      <GlowingEffect
        spread={34}
        glow={false}
        disabled={false}
        proximity={72}
        inactiveZone={0.18}
        borderWidth={2}
        movementDuration={0.8}
      />
      <div className="relative z-[1] h-full">{children}</div>
    </div>
  );
}
