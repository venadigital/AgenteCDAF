import { Activity, CheckCircle2, Sparkles, Target } from "lucide-react";
import { FlowStepRenderer } from "@/components/sections/flujos/FlowStepRenderer";
import type { FlowDefinition, FlowMapNode } from "@/lib/types";

interface FlowNodeDetailPanelProps {
  flow: FlowDefinition;
  node: FlowMapNode;
}

export function FlowNodeDetailPanel({ flow, node }: FlowNodeDetailPanelProps) {
  const relatedStep = node.stepId ? flow.steps.find((step) => step.id === node.stepId) : undefined;
  const relatedBlock =
    relatedStep && typeof node.blockIndex === "number"
      ? relatedStep.blocks[node.blockIndex]
      : undefined;

  if (node.kind === "start") {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-black/12 bg-white/84 p-4">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">
            <Sparkles className="h-4 w-4 text-[#7da50f]" />
            Inicio del flujo
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-black">{flow.title}</h3>
          <p className="mt-2 text-sm leading-7 text-black/80">{flow.context}</p>
        </div>

        <div className="rounded-2xl border border-black/12 bg-white/84 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Señales típicas</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {flow.typicalSignals.map((signal) => (
              <span
                key={`${flow.key}-signal-${signal}`}
                className="inline-flex rounded-full border border-black/12 bg-white px-3 py-1 text-sm text-black/80"
              >
                “{signal}”
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (node.kind === "finish") {
    return (
      <div className="space-y-3">
        <div className="rounded-2xl border border-[rgba(200,238,3,0.5)] bg-[rgba(200,238,3,0.16)] p-4">
          <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">
            <CheckCircle2 className="h-4 w-4 text-[#7da50f]" />
            Cierre del flujo
          </p>
          <p className="mt-2 text-base leading-7 text-black/84">{flow.finish}</p>
        </div>
      </div>
    );
  }

  if (!relatedStep) {
    return (
      <div className="rounded-2xl border border-black/12 bg-white/84 p-4">
        <p className="text-sm text-black/80">Selecciona un nodo del mapa para ver su contenido.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-black/12 bg-white/84 p-4">
        <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
          <Activity className="h-4 w-4 text-black/65" />
          Nodo activo
        </p>
        <h4 className="mt-2 text-xl font-semibold text-black">{relatedStep.title}</h4>
        {relatedBlock ? (
          <p className="mt-2 inline-flex items-center gap-2 rounded-full border border-black/12 bg-white px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/65">
            <Target className="h-3.5 w-3.5" />
            Bloque {node.blockIndex! + 1}
          </p>
        ) : null}
      </div>

      <FlowStepRenderer blocks={relatedBlock ? [relatedBlock] : relatedStep.blocks} />
    </div>
  );
}
