import type { RuleQuickTableRow } from "@/lib/types";

interface RulesQuickTableProps {
  rows: RuleQuickTableRow[];
}

export function RulesQuickTable({ rows }: RulesQuickTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/10 bg-white/88">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-black/10 bg-black/[0.03]">
            <th className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">Regla</th>
            <th className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">Valor</th>
            <th className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">Consecuencia</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-black/8 align-top last:border-b-0">
              <td className="px-3 py-2.5 text-black/82">{row.rule}</td>
              <td className="px-3 py-2.5 font-semibold text-black">{row.value}</td>
              <td className="px-3 py-2.5 text-black/74">{row.consequence}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
