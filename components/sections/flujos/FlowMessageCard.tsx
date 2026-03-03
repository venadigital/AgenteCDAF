interface FlowMessageCardProps {
  title: string;
  lines: string[];
}

export function FlowMessageCard({ title, lines }: FlowMessageCardProps) {
  return (
    <div className="rounded-2xl border border-[rgba(200,238,3,0.5)] bg-[rgba(200,238,3,0.14)] p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">{title}</p>
      <div className="mt-2 space-y-1.5">
        {lines.map((line, index) => (
          <p key={`${line}-${index}`} className="text-sm leading-6 text-black/84">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
