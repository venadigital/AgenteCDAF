import { motion, useReducedMotion } from "framer-motion";
import { BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowDefinition, FlowKey } from "@/lib/types";
import {
  categoryCloudAnchors,
  flowCloudSlots,
  flowKeywordByKey,
  FLOW_VISUAL_ORDER,
  getOrderedFlows,
} from "@/content/sections/flujos-map-layout";

interface FlowCircuitMapProps {
  flows: FlowDefinition[];
  activeFlowKey: FlowKey;
  onSelectFlow: (flow: FlowKey) => void;
}

function categoryLabel(category: FlowDefinition["category"]) {
  if (category === "reserva") return "Reserva";
  if (category === "consulta") return "Consulta";
  if (category === "escalamiento") return "Escalamiento";
  return "Reagenda";
}

function categoryTone(category: FlowDefinition["category"], active: boolean) {
  if (active) return "border-[rgba(200,238,3,0.7)] bg-[rgba(200,238,3,0.22)] text-black";
  if (category === "escalamiento") return "border-[#efb08c] bg-[#fff2e9] text-[#6b3f24]";
  if (category === "consulta") return "border-black/20 bg-white text-black/75";
  if (category === "reagenda") return "border-[rgba(200,238,3,0.55)] bg-[rgba(200,238,3,0.18)] text-black";
  return "border-black/20 bg-black text-white";
}

export function FlowCircuitMap({ flows, activeFlowKey, onSelectFlow }: FlowCircuitMapProps) {
  const orderedFlows = getOrderedFlows(flows);
  const shouldReduceMotion = useReducedMotion();

  const byKey = new Map(orderedFlows.map((flow) => [flow.key, flow]));

  return (
    <div className="relative h-[390px] overflow-hidden rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,251,231,0.74))] p-4 md:h-[470px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(200,238,3,0.22),transparent_36%),radial-gradient(circle_at_84%_20%,rgba(2,2,2,0.09),transparent_36%)]" />
      <div className="pointer-events-none absolute left-4 top-3 rounded-full border border-black/12 bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">
        Mapa no secuencial de intenciones
      </div>

      <svg className="pointer-events-none absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {FLOW_VISUAL_ORDER.map((key) => {
          const flow = byKey.get(key);
          if (!flow) return null;

          const node = flowCloudSlots[key];
          const hub = categoryCloudAnchors[flow.category];
          const active = flow.key === activeFlowKey;
          const stroke = active ? "rgba(200,238,3,0.95)" : "rgba(2,2,2,0.16)";
          const path = `M ${hub.x} ${hub.y} Q ${(hub.x + node.x) / 2} ${(hub.y + node.y) / 2 - 6} ${node.x} ${node.y}`;

          return (
            <path
              key={`edge-${key}`}
              d={path}
              fill="none"
              stroke={stroke}
              strokeWidth={active ? 0.42 : 0.28}
              strokeDasharray={active ? "0" : "1.1 1.1"}
            />
          );
        })}
      </svg>

      {Object.entries(categoryCloudAnchors).map(([category, anchor]) => (
        <div
          key={category}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/12 bg-white/84 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62"
          style={{ left: `${anchor.x}%`, top: `${anchor.y}%` }}
        >
          {categoryLabel(category as FlowDefinition["category"])}
        </div>
      ))}

      {orderedFlows.map((flow) => {
        const slot = flowCloudSlots[flow.key];
        const active = flow.key === activeFlowKey;

        return (
          <motion.button
            key={flow.key}
            type="button"
            onClick={() => onSelectFlow(flow.key)}
            aria-current={active ? "true" : undefined}
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl border px-3 py-2 text-left",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,238,3,0.7)]",
              active ? "z-[3] border-black bg-black text-[#c8ee03] shadow-[0_10px_26px_rgba(2,2,2,0.28)]" : "z-[2] border-black/12 bg-white/92 text-black hover:border-black/30",
            )}
              style={{ left: `${slot.x}%`, top: `${slot.y}%`, width: "238px" }}
            initial={false}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    y: [0, -slot.drift, 0, slot.drift * 0.6, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 8 + (slot.drift % 3),
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }
            }
          >
            <div className="flex items-center justify-between gap-2">
              <span
                className={cn(
                  "inline-flex min-w-8 items-center justify-center rounded-full border px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.12em]",
                  active ? "border-[#c8ee03]/55 bg-black text-[#c8ee03]" : "border-black/15 bg-black text-white",
                )}
              >
                {flow.key}
              </span>
              <span
                className={cn(
                  "inline-flex rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]",
                  categoryTone(flow.category, active),
                )}
              >
                {categoryLabel(flow.category)}
              </span>
            </div>

            <p className={cn("mt-2 text-[15px] leading-5", active ? "text-[#e9fca0]" : "text-black/78")}>{flow.shortTitle}</p>
          </motion.button>
        );
      })}

      {orderedFlows.map((flow) => {
        const slot = flowCloudSlots[flow.key];
        const active = flow.key === activeFlowKey;
        return (
          <motion.div
            key={`kw-${flow.key}`}
            className={cn(
              "pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]",
              active
                ? "border-[rgba(200,238,3,0.55)] bg-[rgba(200,238,3,0.16)] text-black"
                : "border-black/10 bg-white/75 text-black/55",
            )}
            style={{ left: `${slot.x - 2}%`, top: `${slot.y - 11}%` }}
            initial={false}
            animate={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: [0.3, 0.9, 0.3],
                    y: [0, -5, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? undefined
                : {
                    duration: 7 + (slot.drift % 4),
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }
            }
          >
            {flowKeywordByKey[flow.key]}
          </motion.div>
        );
      })}

      <div className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-2 rounded-full border border-black/12 bg-white/90 px-3 py-1 md:inline-flex">
        <BrainCircuit className="h-4 w-4 text-black/70" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">Selección por intención</span>
      </div>
    </div>
  );
}
