import { CheckCircle2, ChevronDown, ListTree } from "lucide-react";
import { FlowStepRenderer } from "@/components/sections/flujos/FlowStepRenderer";
import type { FlowDefinition } from "@/lib/types";

interface FlowFullFlowPanelProps {
  flow: FlowDefinition;
}

export function FlowFullFlowPanel({ flow }: FlowFullFlowPanelProps) {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-black/12 bg-white/84 p-4">
        <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
          <ListTree className="h-4 w-4 text-black/62" />
          Vista completa del flujo
        </p>
        <p className="mt-2 text-sm leading-6 text-black/78">
          Los pasos inician cerrados para facilitar lectura. Haz clic en cada paso para desplegar su detalle.
        </p>
      </div>

      {flow.steps.map((step) => (
        <details
          key={`${flow.key}-full-step-${step.id}`}
          className="group rounded-2xl border border-black/12 bg-white/84"
        >
          <summary className="cursor-pointer list-none px-4 py-3 transition hover:bg-[rgba(200,238,3,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
              <span className="inline-flex min-w-10 items-center justify-center rounded-full border border-black/15 bg-black px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white">
                Paso {step.id}
              </span>
              <p className="text-sm font-semibold text-black">{step.title}</p>
              </div>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-black/14 bg-white text-black/72 transition group-open:rotate-180 group-open:bg-black group-open:text-[#c8ee03]">
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </summary>
          <div className="border-t border-black/10 px-4 py-3">
            <FlowStepRenderer blocks={step.blocks} />
          </div>
        </details>
      ))}

      <div className="rounded-2xl border border-[rgba(200,238,3,0.5)] bg-[rgba(200,238,3,0.16)] p-4">
        <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">
          <CheckCircle2 className="h-4 w-4 text-[#7da50f]" />
          Cierre del flujo
        </p>
        <p className="mt-2 text-sm leading-6 text-black/82">{flow.finish}</p>
      </div>
    </div>
  );
}
