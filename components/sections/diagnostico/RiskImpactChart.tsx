"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Tag } from "@/components/shared/Tag";
import type { DiagnosticoRiskRow, RiesgoSeverity } from "@/content/sections/diagnostico-detail";

type FilterKey = "all" | RiesgoSeverity;

interface RiskImpactChartProps {
  rows: readonly DiagnosticoRiskRow[];
}

const impactByTitle: Record<string, number> = {
  "Sin respuesta 24/7": 96,
  "Willy = punto único de fallo": 92,
  "Excel de entrenadores no confiable": 88,
  "Canchas bloqueadas sin uso": 84,
  "Sin integración EasyCancha": 74,
  "Política de cancelación sin ejecución": 68,
};

function impactLevel(score: number) {
  if (score >= 90) return "Muy alto";
  if (score >= 80) return "Alto";
  return "Medio-alto";
}

function laneY(severity: RiesgoSeverity) {
  return severity === "CRÍTICO" ? 34 : 74;
}

export function RiskImpactChart({ rows }: RiskImpactChartProps) {
  const enriched = useMemo(
    () =>
      rows.map((row, index) => {
        const score =
          impactByTitle[row.title] ?? (row.severity === "CRÍTICO" ? 84 : 68);
        return {
          ...row,
          score,
          level: impactLevel(score),
          index,
        };
      }),
    [rows],
  );

  const [filter, setFilter] = useState<FilterKey>("all");
  const [activeTitle, setActiveTitle] = useState<string>(rows[0]?.title ?? "");
  const [slideDirection, setSlideDirection] = useState<1 | -1 | 0>(0);

  const filtered = useMemo(
    () => enriched.filter((row) => filter === "all" || row.severity === filter),
    [enriched, filter],
  );

  const activeIndex = filtered.findIndex((row) => row.title === activeTitle);
  const resolvedIndex = activeIndex >= 0 ? activeIndex : 0;
  const active = filtered[resolvedIndex] ?? enriched[0];

  const goPrev = () => {
    if (filtered.length <= 1) return;
    const nextIndex = (resolvedIndex - 1 + filtered.length) % filtered.length;
    setSlideDirection(-1);
    setActiveTitle(filtered[nextIndex].title);
  };

  const goNext = () => {
    if (filtered.length <= 1) return;
    const nextIndex = (resolvedIndex + 1) % filtered.length;
    setSlideDirection(1);
    setActiveTitle(filtered[nextIndex].title);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {[
          { key: "all", label: "Todos" },
          { key: "CRÍTICO", label: "Crítico" },
          { key: "ALTA", label: "Alta" },
        ].map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => {
              setFilter(item.key as FilterKey);
              setSlideDirection(0);
            }}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
              filter === item.key
                ? "border-black bg-black text-[#c8ee03]"
                : "border-black/15 bg-white/85 text-black/70 hover:border-black/30 hover:text-black"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-black/10 bg-white/85 p-4">
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/58">
              Mapa de impacto
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.14em]">
              <span className="inline-flex items-center gap-1.5 text-black/70">
                <span className="h-2.5 w-2.5 rounded-full bg-[#f4bf9f]" />
                Crítico
              </span>
              <span className="inline-flex items-center gap-1.5 text-black/70">
                <span className="h-2.5 w-2.5 rounded-full bg-[#c8ee03]" />
                Alta
              </span>
            </div>
          </div>

          <div className="relative h-[260px] overflow-hidden rounded-xl border border-black/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,251,228,0.72))]">
            {[0, 25, 50, 75, 100].map((tick) => (
              <div
                key={tick}
                className="absolute bottom-0 top-0 border-l border-black/8"
                style={{ left: `${tick}%` }}
              >
                <span className="absolute -top-5 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/45">
                  {tick}
                </span>
              </div>
            ))}

            <div className="absolute inset-x-3 top-[34%] border-t border-dashed border-black/16" />
            <div className="absolute inset-x-3 top-[74%] border-t border-dashed border-black/16" />

            <div className="absolute left-3 top-[34%] -translate-y-1/2 rounded-md bg-white/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">
              Crítico
            </div>
            <div className="absolute left-3 top-[74%] -translate-y-1/2 rounded-md bg-white/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62">
              Alta
            </div>

            {filtered.map((row, idx) => {
              const inLaneIndex = filtered
                .filter((r) => r.severity === row.severity)
                .findIndex((r) => r.title === row.title);
              const activeNode = active?.title === row.title;
              const yOffset = (inLaneIndex % 3) * 16 - 16;
              const color =
                row.severity === "CRÍTICO" ? "bg-[#f4bf9f]" : "bg-[#c8ee03]";

              return (
                <motion.button
                  key={row.title}
                  type="button"
                  onClick={() => {
                    setSlideDirection(0);
                    setActiveTitle(row.title);
                  }}
                  title={`${row.title} · Impacto ${row.score}`}
                  initial={{ opacity: 0, scale: 0.86 }}
                  animate={{ opacity: 1, scale: activeNode ? 1.08 : 1 }}
                  transition={{ delay: idx * 0.04, duration: 0.24 }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 shadow-[0_8px_24px_rgba(2,2,2,0.18)] transition ${
                    activeNode ? "h-7 w-7 ring-2 ring-black/30" : "h-5 w-5"
                  } ${color}`}
                  style={{
                    left: `${row.score}%`,
                    top: `calc(${laneY(row.severity)}% + ${yOffset}px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {active ? (
          <AnimatePresence mode="wait">
            <motion.div
              key={active.title}
              initial={{
                opacity: 0,
                x: slideDirection === 0 ? 0 : slideDirection > 0 ? 24 : -24,
                filter: "blur(6px)",
              }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{
                opacity: 0,
                x: slideDirection === 0 ? 0 : slideDirection > 0 ? -24 : 24,
                filter: "blur(6px)",
              }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="rounded-2xl border border-black/10 bg-white/88 p-4"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/58">
                Riesgo seleccionado
              </p>
              <h3 className="mt-2 text-lg font-semibold leading-7 text-black">
                {active.title}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                <Tag
                  tone="decision"
                  className={
                    active.severity === "CRÍTICO"
                      ? "!border-[#f2b38f] !bg-[#f8d9c9] !text-[#6b3f24]"
                      : "!border-[rgba(200,238,3,0.55)] !bg-[rgba(200,238,3,0.22)] !text-black"
                  }
                >
                  {active.severity}
                </Tag>
                <Tag tone="scope">Impacto {active.level}</Tag>
                <Tag tone="neutral">Score {active.score}/100</Tag>
              </div>

              <p className="mt-4 text-sm leading-6 text-black/78">{active.description}</p>

              <div className="mt-4 h-2.5 rounded-full bg-black/8">
                <div
                  className="h-2.5 rounded-full bg-[linear-gradient(90deg,#020202,#c8ee03)]"
                  style={{ width: `${active.score}%` }}
                />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                  Riesgo {resolvedIndex + 1} de {filtered.length}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Riesgo anterior"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-[#c8ee03]"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Riesgo siguiente"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-[#c8ee03]"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        ) : null}
      </div>
    </div>
  );
}
