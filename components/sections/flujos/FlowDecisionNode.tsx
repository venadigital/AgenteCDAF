import { CheckCircle2, XCircle } from "lucide-react";

interface FlowDecisionNodeProps {
  question: string;
  yesLabel?: string;
  yesOutcome: string[];
  noLabel?: string;
  noOutcome: string[];
}

export function FlowDecisionNode({
  question,
  yesLabel,
  yesOutcome,
  noLabel,
  noOutcome,
}: FlowDecisionNodeProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/84 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Nodo de decisión</p>
      <p className="mt-2 text-base font-semibold text-black">◆ {question} ◆</p>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-[rgba(200,238,3,0.55)] bg-[rgba(200,238,3,0.16)] p-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-black">
            <CheckCircle2 className="h-4 w-4 text-[#5a8f1a]" />
            {yesLabel ?? "Sí"}
          </p>
          <ul className="mt-2 space-y-1.5">
            {yesOutcome.map((line, index) => (
              <li key={`${line}-${index}`} className="text-sm leading-6 text-black/82">
                {line}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-[#efb08c] bg-[#fff2e9] p-3">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-black">
            <XCircle className="h-4 w-4 text-[#c76943]" />
            {noLabel ?? "No"}
          </p>
          <ul className="mt-2 space-y-1.5">
            {noOutcome.map((line, index) => (
              <li key={`${line}-${index}`} className="text-sm leading-6 text-black/82">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
