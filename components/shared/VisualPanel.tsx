import type { ReactNode } from "react";
import { ContentCard } from "@/components/shared/ContentCard";

interface VisualPanelProps {
  children: ReactNode;
  className?: string;
}

export function VisualPanel({ children, className = "" }: VisualPanelProps) {
  return (
    <ContentCard className={`p-4 sm:p-5 ${className}`}>
      <div className="relative">{children}</div>
    </ContentCard>
  );
}
