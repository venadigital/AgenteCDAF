interface FlowDataTableProps {
  title: string;
  columns: string[];
  rows: string[][];
}

export function FlowDataTable({ title, columns, rows }: FlowDataTableProps) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white/84 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">{title}</p>

      <div className="mt-3 overflow-x-auto">
        <table className="min-w-full border-separate border-spacing-0 overflow-hidden rounded-xl border border-black/10 bg-white text-left">
          <thead>
            <tr className="bg-black/5">
              {columns.map((column) => (
                <th
                  key={column}
                  className="border-b border-black/10 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-black/65"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={`${row[0]}-${rowIndex}`} className="align-top">
                {row.map((cell, cellIndex) => {
                  const highlighted = /por confirmar|consultar/i.test(cell);
                  return (
                    <td
                      key={`${cell}-${cellIndex}`}
                      className={`border-b border-black/8 px-3 py-2 text-sm leading-6 text-black/80 last:border-b-0 ${
                        highlighted ? "text-[#8b4e2e]" : ""
                      }`}
                    >
                      {cell}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
