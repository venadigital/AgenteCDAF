"use client";

import { useMemo, useState } from "react";
import { Tag } from "@/components/shared/Tag";
import type { DiagnosticoTarifaRow } from "@/content/sections/diagnostico-detail";

type FilterKey =
  | "all"
  | "cancha-padel"
  | "cancha-tenis"
  | "clase-padel"
  | "clase-tenis";

interface TarifasPanelProps {
  rows: DiagnosticoTarifaRow[];
}

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: "cancha-padel", label: "Canchas de Padel" },
  { key: "cancha-tenis", label: "Canchas de Tenis" },
  { key: "clase-padel", label: "Clases de Padel" },
  { key: "clase-tenis", label: "Clases de Tenis" },
  { key: "all", label: "Todo el tarifario" },
];

export function TarifasPanel({ rows }: TarifasPanelProps) {
  const [filter, setFilter] = useState<FilterKey>("all");

  const filtered = useMemo(() => {
    switch (filter) {
      case "cancha-padel":
        return rows.filter((r) => r.category === "cancha-padel");
      case "cancha-tenis":
        return rows.filter((r) => r.category === "cancha-tenis");
      case "clase-padel":
        return rows.filter((r) => r.category === "clase-padel");
      case "clase-tenis":
        return rows.filter((r) => r.category === "clase-tenis");
      default:
        return rows;
    }
  }, [filter, rows]);

  const maxValue = Math.max(
    ...rows.map((row) => row.priceMax ?? 0),
    1,
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setFilter(item.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-[0.14em] transition ${
              filter === item.key
                ? "border-[var(--color-accent)] bg-[rgba(200,238,3,0.16)] text-[var(--color-ink)]"
                : "border-black/14 bg-white/75 text-black/65 hover:border-black/25 hover:text-black"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {filtered.map((row, index) => {
          const widthPct =
            row.priceMax === null ? 0 : Math.max(8, (row.priceMax / maxValue) * 100);

          return (
            <div
              key={`${row.service}-${row.condition}-${index}`}
              className="rounded-2xl border border-black/10 bg-white/80 p-4"
            >
              <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr_0.8fr_1fr]">
                <div>
                  <p className="text-base font-semibold leading-6 text-black">
                    {row.service}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-black/70">
                    {row.condition}
                  </p>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/55">
                    Precio
                  </p>
                  <p className="mt-1 text-base font-semibold text-black">
                    {row.price}
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/55">
                    Tipo
                  </p>
                  <div className="mt-1 flex flex-wrap gap-2">
                    <Tag tone={row.sport === "padel" ? "opportunity" : "scope"}>
                      {row.sport}
                    </Tag>
                    <Tag tone="neutral">
                      {row.category.startsWith("cancha") ? "cancha" : "clase"}
                    </Tag>
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/55">
                    Nota
                  </p>
                  <p className="mt-1 text-sm leading-5 text-black/75">{row.notes}</p>
                </div>
              </div>

              <div className="mt-3">
                <div className="mb-1 flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.14em] text-black/55">
                  <span>Comparativo de valor</span>
                  <span>
                    {row.priceMax === null ? "Por definir" : `$${row.priceMax.toLocaleString("es-CO")}`}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/6">
                  {row.priceMax === null ? (
                    <div className="h-2 w-full rounded-full border border-dashed border-[#c8ee03] bg-[rgba(200,238,3,0.08)]" />
                  ) : (
                    <div
                      className="h-2 rounded-full bg-[linear-gradient(90deg,#020202,#c8ee03)]"
                      style={{ width: `${widthPct}%` }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
