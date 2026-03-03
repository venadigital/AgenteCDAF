import type { FlowDefinition, FlowKey } from "@/lib/types";
import { Tag } from "@/components/shared/Tag";

interface FlowSelectorRailProps {
  flows: FlowDefinition[];
  activeFlowKey: FlowKey;
  onSelectFlow: (flow: FlowKey) => void;
}

export function FlowSelectorRail({
  flows,
  activeFlowKey,
  onSelectFlow,
}: FlowSelectorRailProps) {
  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {flows.map((flow) => {
          const active = flow.key === activeFlowKey;
          return (
            <button
              key={flow.key}
              type="button"
              onClick={() => onSelectFlow(flow.key)}
              className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                active
                  ? "border-black bg-black text-[#c8ee03]"
                  : "border-black/15 bg-white/85 text-black/70 hover:border-black/30 hover:text-black"
              }`}
              aria-current={active ? "true" : undefined}
            >
              {flow.key} · {flow.shortTitle}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        <Tag tone="flow">Reserva</Tag>
        <Tag tone="scope">Consulta</Tag>
        <Tag tone="decision">Escalamiento</Tag>
        <Tag tone="opportunity">Reagendamiento</Tag>
      </div>
    </div>
  );
}
