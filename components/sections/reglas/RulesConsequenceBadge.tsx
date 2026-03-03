import { AlertTriangle, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BusinessRule } from "@/lib/types";

interface RulesConsequenceBadgeProps {
  severity: BusinessRule["severity"];
  className?: string;
}

function toneBySeverity(severity: BusinessRule["severity"]) {
  if (severity === "critical") {
    return {
      label: "Crítica",
      icon: ShieldAlert,
      className: "border-[#efb08c] bg-[#fff1e8] text-[#7a4127]",
    };
  }

  if (severity === "high") {
    return {
      label: "Alta",
      icon: AlertTriangle,
      className: "border-[rgba(200,238,3,0.56)] bg-[rgba(200,238,3,0.2)] text-black",
    };
  }

  return {
    label: "Media",
    icon: ShieldCheck,
    className: "border-black/20 bg-white/88 text-black/75",
  };
}

export function RulesConsequenceBadge({ severity, className }: RulesConsequenceBadgeProps) {
  const tone = toneBySeverity(severity);
  const Icon = tone.icon;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
        tone.className,
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" />
      {tone.label}
    </span>
  );
}
