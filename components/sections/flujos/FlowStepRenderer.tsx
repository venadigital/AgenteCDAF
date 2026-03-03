import { AlertTriangle, Info } from "lucide-react";
import type { FlowStepBlock } from "@/lib/types";
import { FlowDataTable } from "@/components/sections/flujos/FlowDataTable";
import { FlowDecisionNode } from "@/components/sections/flujos/FlowDecisionNode";
import { FlowMessageCard } from "@/components/sections/flujos/FlowMessageCard";

interface FlowStepRendererProps {
  blocks: FlowStepBlock[];
}

export function FlowStepRenderer({ blocks }: FlowStepRendererProps) {
  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <div key={`text-${index}`} className="rounded-2xl border border-black/10 bg-white/84 p-3">
              {block.title ? (
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
                  {block.title}
                </p>
              ) : null}
              <div className="space-y-2">
                {block.paragraphs.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${paragraph}-${paragraphIndex}`}
                    className="text-sm leading-6 text-black/84"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          );
        }

        if (block.type === "rule") {
          const isCritical = block.tone === "critical";
          return (
            <div
              key={`rule-${index}`}
              className={`rounded-2xl border p-3 ${
                isCritical
                  ? "border-[#efb08c] bg-[#fff2e9]"
                  : "border-black/10 bg-white/84"
              }`}
            >
              <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/65">
                {isCritical ? (
                  <AlertTriangle className="h-4 w-4 text-[#c76943]" />
                ) : (
                  <Info className="h-4 w-4 text-black/60" />
                )}
                {isCritical ? "Regla crítica" : "Nota operativa"}
              </p>
              <p className="mt-2 text-sm leading-6 text-black/84">{block.text}</p>
            </div>
          );
        }

        if (block.type === "decision") {
          return (
            <FlowDecisionNode
              key={`decision-${index}`}
              question={block.question}
              yesLabel={block.yesLabel}
              yesOutcome={block.yesOutcome}
              noLabel={block.noLabel}
              noOutcome={block.noOutcome}
            />
          );
        }

        if (block.type === "table") {
          return (
            <FlowDataTable
              key={`table-${index}`}
              title={block.title}
              columns={block.columns}
              rows={block.rows}
            />
          );
        }

        if (block.type === "message") {
          return <FlowMessageCard key={`message-${index}`} title={block.title} lines={block.lines} />;
        }

        return (
          <div key={`finish-${index}`} className="rounded-2xl border border-black/15 bg-black px-4 py-3 text-[#c8ee03]">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em]">{block.text}</p>
          </div>
        );
      })}
    </div>
  );
}
