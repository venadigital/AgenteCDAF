import { KeyboardEvent } from "react";
import { LockKeyhole, ShieldCheck, ShieldX } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BusinessRule } from "@/lib/types";
import { RulesConsequenceBadge } from "@/components/sections/reglas/RulesConsequenceBadge";

interface RulesMatrixMapProps {
  rules: BusinessRule[];
  activeRuleId: string;
  onRuleChange: (ruleId: string) => void;
}

function controlToneLabel(controlTag: BusinessRule["controlTag"]) {
  if (controlTag === "no-negociable") {
    return {
      label: "No negociable",
      icon: ShieldX,
      className: "border-[#efb08c] bg-[#fff1e8] text-[#7a4127]",
    };
  }

  if (controlTag === "validacion-humana") {
    return {
      label: "Validación humana",
      icon: LockKeyhole,
      className: "border-black/20 bg-white/85 text-black/74",
    };
  }

  return {
    label: "Bloqueante",
    icon: ShieldCheck,
    className: "border-[rgba(200,238,3,0.54)] bg-[rgba(200,238,3,0.18)] text-black",
  };
}

export function RulesMatrixMap({ rules, activeRuleId, onRuleChange }: RulesMatrixMapProps) {
  const activeIndex = rules.findIndex((rule) => rule.id === activeRuleId);

  const onListKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!rules.length) return;

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    event.preventDefault();

    const fallbackIndex = activeIndex >= 0 ? activeIndex : 0;
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (fallbackIndex + delta + rules.length) % rules.length;
    onRuleChange(rules[nextIndex].id);
  };

  return (
    <div
      onKeyDown={onListKeyDown}
      className="space-y-2"
      role="listbox"
      aria-label="Lista de reglas"
      aria-activedescendant={activeRuleId}
    >
      {rules.map((rule) => {
        const active = rule.id === activeRuleId;
        const control = controlToneLabel(rule.controlTag);
        const ControlIcon = control.icon;

        return (
          <button
            key={rule.id}
            id={rule.id}
            type="button"
            role="option"
            aria-selected={active}
            onClick={() => onRuleChange(rule.id)}
            className={cn(
              "w-full rounded-2xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,238,3,0.75)]",
              active
                ? "border-[rgba(200,238,3,0.58)] bg-[linear-gradient(135deg,rgba(200,238,3,0.14),rgba(255,255,255,0.95))] shadow-[0_10px_24px_rgba(2,2,2,0.08)]"
                : "border-black/10 bg-white/85 hover:border-black/28 hover:bg-white",
            )}
          >
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center rounded-full border border-black/15 bg-white px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/70">
                {rule.id}
              </span>
              <RulesConsequenceBadge severity={rule.severity} />
            </div>

            <p className="text-sm font-semibold text-black">{rule.condition}</p>

            <div className="mt-2 flex items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
                  control.className,
                )}
              >
                <ControlIcon className="h-3 w-3" />
                {control.label}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
