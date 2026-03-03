import { Ban, ShieldAlert } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import type { RulesNoNegotiableItem } from "@/lib/types";

interface NoNegotiablesPanelProps {
  title: string;
  items: readonly RulesNoNegotiableItem[];
}

export function NoNegotiablesPanel({ title, items }: NoNegotiablesPanelProps) {
  return (
    <ContentCard className="border-[#efb08c]/70 bg-[linear-gradient(180deg,rgba(255,241,232,0.86),rgba(255,255,255,0.94))] p-5 md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4 text-[#a04b27]" />
        <div>
          <Eyebrow className="text-[#8d4a2e]">Panel fijo de control</Eyebrow>
          <h2 className="mt-1 font-display text-3xl leading-[0.95] text-black md:text-4xl">{title}</h2>
        </div>
      </div>

      <div className="grid gap-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[auto_1fr] items-start gap-3 rounded-xl border border-[#efb08c]/75 bg-white/88 px-3 py-2.5"
          >
            <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#efb08c]/80 bg-[#fff1e8] text-[#a04b27]">
              <Ban className="h-3.5 w-3.5" />
            </span>
            <p className="text-sm leading-6 text-black/84">{item.text}</p>
          </div>
        ))}
      </div>
    </ContentCard>
  );
}
