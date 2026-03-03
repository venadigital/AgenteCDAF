import { LockKeyhole, ShieldCheck, ShieldX } from "lucide-react";
import { motion } from "framer-motion";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import type { BusinessRule, RuleCategory } from "@/lib/types";
import { RulesConsequenceBadge } from "@/components/sections/reglas/RulesConsequenceBadge";

interface RuleDetailPanelProps {
  category: RuleCategory;
  rule: BusinessRule;
}

function controlTone(controlTag: BusinessRule["controlTag"]) {
  if (controlTag === "no-negociable") {
    return {
      icon: ShieldX,
      title: "Control no negociable",
      className: "border-[#efb08c]/70 bg-[#fff2e9] text-[#7a4127]",
      value: "No se permite excepción sin redefinición oficial de la regla.",
    };
  }

  if (controlTag === "validacion-humana") {
    return {
      icon: LockKeyhole,
      title: "Control con validación humana",
      className: "border-black/18 bg-white/86 text-black/80",
      value: "El agente debe escalar y esperar validación antes de confirmar.",
    };
  }

  return {
    icon: ShieldCheck,
    title: "Control bloqueante",
    className: "border-[rgba(200,238,3,0.55)] bg-[rgba(200,238,3,0.16)] text-black",
    value: "El agente detiene la acción si la condición no se cumple.",
  };
}

export function RuleDetailPanel({ category, rule }: RuleDetailPanelProps) {
  const control = controlTone(rule.controlTag);
  const ControlIcon = control.icon;

  return (
    <div className="space-y-4">
      <ContentCard className="p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div>
            <Eyebrow>{category.title}</Eyebrow>
            <h3 className="mt-2 font-display text-3xl leading-[0.95] text-black md:text-4xl">
              Detalle de regla activa
            </h3>
          </div>
          <RulesConsequenceBadge severity={rule.severity} className="self-start" />
        </div>

        <motion.div
          key={rule.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-3"
        >
          <div className="rounded-xl border border-black/10 bg-white/85 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Condición</p>
            <p className="mt-1 text-base font-semibold text-black">{rule.condition}</p>
          </div>

          <div className="rounded-xl border border-black/10 bg-white/85 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Regla operativa</p>
            <p className="mt-1 text-sm leading-6 text-black/84">{rule.rule}</p>
          </div>

          <div className="rounded-xl border border-[#efb08c]/70 bg-[#fff2ea] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#8b4f30]">Consecuencia si no se cumple</p>
            <p className="mt-1 text-sm leading-6 text-[#74482f]">{rule.consequence}</p>
          </div>

          <div className={`rounded-xl border p-3 ${control.className}`}>
            <div className="mb-1 flex items-center gap-2">
              <ControlIcon className="h-4 w-4" />
              <p className="font-mono text-[10px] uppercase tracking-[0.14em]">{control.title}</p>
            </div>
            <p className="text-sm leading-6">{control.value}</p>
          </div>
        </motion.div>
      </ContentCard>

    </div>
  );
}
