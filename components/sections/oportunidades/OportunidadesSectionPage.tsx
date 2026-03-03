"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChartNoAxesCombined,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { NumberBadge } from "@/components/shared/NumberBadge";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import {
  oportunidadesDetail,
  type OpportunityPriority,
} from "@/content/sections/oportunidades-detail";

type PriorityFilter = "all" | OpportunityPriority;

function priorityLabel(priority: OpportunityPriority) {
  return priority === "P1" ? "Crítica" : priority === "P2" ? "Alta" : "Estratégica";
}

function priorityDot(priority: OpportunityPriority) {
  if (priority === "P1") return "bg-[#f4bf9f]";
  if (priority === "P2") return "bg-[#ffe286]";
  return "bg-[#c8ee03]";
}

function priorityTagClass(priority: OpportunityPriority) {
  if (priority === "P1") return "!border-[#f2b38f] !bg-[#f8d9c9] !text-[#6b3f24]";
  if (priority === "P2") return "!border-[#f3d683] !bg-[#fff4ce] !text-[#664f16]";
  return "!border-[rgba(200,238,3,0.6)] !bg-[rgba(200,238,3,0.22)] !text-black";
}

function priorityColumnClass(priority: OpportunityPriority) {
  if (priority === "P1") {
    return "border-[#f2b38f]/60 bg-[linear-gradient(180deg,rgba(248,217,201,0.45),rgba(255,255,255,0.88))]";
  }
  if (priority === "P2") {
    return "border-[#f3d683]/65 bg-[linear-gradient(180deg,rgba(255,238,181,0.45),rgba(255,255,255,0.9))]";
  }
  return "border-[rgba(200,238,3,0.5)] bg-[linear-gradient(180deg,rgba(200,238,3,0.2),rgba(255,255,255,0.9))]";
}

export function OportunidadesSectionPage() {
  const rows = oportunidadesDetail.rows;
  const [filter, setFilter] = useState<PriorityFilter>("all");
  const [activeId, setActiveId] = useState<string>(rows[0]?.id ?? "");
  const [slideDirection, setSlideDirection] = useState<1 | -1 | 0>(0);

  const filteredRows = useMemo(
    () => rows.filter((row) => filter === "all" || row.priority === filter),
    [filter, rows],
  );

  useEffect(() => {
    if (!filteredRows.some((row) => row.id === activeId)) {
      setActiveId(filteredRows[0]?.id ?? rows[0]?.id ?? "");
      setSlideDirection(0);
    }
  }, [activeId, filteredRows, rows]);

  const activeIndex = filteredRows.findIndex((row) => row.id === activeId);
  const resolvedIndex = activeIndex >= 0 ? activeIndex : 0;
  const active = filteredRows[resolvedIndex] ?? rows[0];
  const solutionImpactLines = useMemo(() => {
    if (!active) return [];
    return active.solutionImpact
      .split(". ")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => (line.endsWith(".") ? line : `${line}.`));
  }, [active]);

  const countByPriority = useMemo(
    () => ({
      P1: rows.filter((row) => row.priority === "P1").length,
      P2: rows.filter((row) => row.priority === "P2").length,
      P3: rows.filter((row) => row.priority === "P3").length,
    }),
    [rows],
  );

  const goPrev = () => {
    if (filteredRows.length <= 1) return;
    const nextIndex = (resolvedIndex - 1 + filteredRows.length) % filteredRows.length;
    setSlideDirection(-1);
    setActiveId(filteredRows[nextIndex].id);
  };

  const goNext = () => {
    if (filteredRows.length <= 1) return;
    const nextIndex = (resolvedIndex + 1) % filteredRows.length;
    setSlideDirection(1);
    setActiveId(filteredRows[nextIndex].id);
  };

  return (
    <main className="relative min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="page-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div className="hero-glow pointer-events-none fixed inset-x-0 top-0 -z-10 h-[35vh]" />

      <div className="mx-auto max-w-[1600px] space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-black/15 bg-white/82 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="relative px-5 py-6 md:px-8 md:py-8">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute inset-y-0 right-0 w-[24%] bg-[linear-gradient(90deg,transparent,rgba(2,2,2,0.05))]" />
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(200,238,3,0.35),transparent_70%)] blur-md" />
              <div className="absolute inset-x-8 top-[44%] h-px bg-black/8" />
            </div>

            <div className="relative space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-3 py-2 text-sm text-black transition hover:border-black/25"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al home
                </Link>
                <Tag tone="decision">Bloque 02</Tag>
                <Tag tone="opportunity">Oportunidades</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{oportunidadesDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText
                    text={oportunidadesDetail.title}
                    className="max-w-full align-top"
                  />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">
                  {oportunidadesDetail.summary}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-3">
          {oportunidadesDetail.priorityDefinitions.map((item) => {
            const documented =
              item.priority === "P1"
                ? countByPriority.P1
                : item.priority === "P2"
                  ? countByPriority.P2
                  : countByPriority.P3;
            return (
              <ContentCard key={item.priority} className={`p-5 ${priorityColumnClass(item.priority)}`}>
                <div className="mb-3 flex items-center justify-between">
                  <Tag tone="decision" className={priorityTagClass(item.priority)}>
                    {item.priority} · {item.label}
                  </Tag>
                  <Sparkles className="h-4 w-4 text-black/65" />
                </div>
                <p className="text-sm leading-6 text-black/78">{item.definition}</p>
                <div className="mt-4 flex items-center justify-between rounded-xl border border-black/10 bg-white/75 px-3 py-2">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                    Documentadas
                  </p>
                  <p className="font-semibold text-black">{documented}</p>
                </div>
              </ContentCard>
            );
          })}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <Eyebrow>Mapa de Priorización</Eyebrow>
                <h2 className="mt-2 font-display text-4xl leading-[0.92] text-black">
                  Impacto vs esfuerzo de implementación
                </h2>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-black/12 bg-white/80 px-3 py-1.5">
                <ChartNoAxesCombined className="h-4 w-4 text-black/65" />
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/65">
                  Click en nodo para detalle
                </p>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { key: "all", label: "Todas" },
                { key: "P1", label: "P1" },
                { key: "P2", label: "P2" },
                { key: "P3", label: "P3" },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key as PriorityFilter)}
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

            <div className="relative h-[360px] overflow-hidden rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,228,0.75))] p-4">
              {[0, 25, 50, 75, 100].map((tick) => (
                <div
                  key={tick}
                  className="absolute bottom-10 top-6 border-l border-black/10"
                  style={{ left: `calc(${tick}% - 1px)` }}
                >
                  <span className="absolute -bottom-7 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/48">
                    {tick}
                  </span>
                </div>
              ))}

              {[25, 50, 75].map((tick) => (
                <div
                  key={tick}
                  className="absolute left-6 right-10 border-t border-dashed border-black/12"
                  style={{ top: `${100 - tick}%` }}
                />
              ))}

              <span className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.14em] text-black/54">
                Impacto →
              </span>
              <span className="absolute right-4 bottom-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/54">
                Esfuerzo →
              </span>

              {filteredRows.map((row, index) => {
                const activeNode = row.id === active?.id;
                return (
                  <motion.button
                    key={row.id}
                    type="button"
                    onClick={() => {
                      setSlideDirection(0);
                      setActiveId(row.id);
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: activeNode ? 1.16 : 1 }}
                    transition={{ delay: index * 0.04, duration: 0.24 }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/20 shadow-[0_8px_20px_rgba(2,2,2,0.18)] transition ${
                      activeNode ? "h-8 w-8 ring-2 ring-black/25" : "h-6 w-6"
                    } ${priorityDot(row.priority)}`}
                    style={{
                      left: `${row.effortScore}%`,
                      top: `${100 - row.impactScore}%`,
                    }}
                    title={`${row.id} · ${row.title}`}
                    aria-label={`${row.id} ${row.title}`}
                  />
                );
              })}
            </div>
          </ContentCard>

          {active ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{
                  opacity: 0,
                  x: slideDirection === 0 ? 0 : slideDirection > 0 ? 24 : -24,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: slideDirection === 0 ? 0 : slideDirection > 0 ? -24 : 24,
                }}
                transition={{ duration: 0.24, ease: "easeInOut" }}
              >
                <ContentCard className="p-5 md:p-6">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/58">
                      Oportunidad seleccionada
                    </p>
                    <NumberBadge value={resolvedIndex + 1} size="sm" />
                  </div>

                  <h3 className="text-2xl font-semibold leading-9 text-black">
                    {active.id} · {active.title}
                  </h3>
                  <p className="mt-1 text-sm text-black/62">{active.stream}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <Tag tone="decision" className={priorityTagClass(active.priority)}>
                      {active.priority}
                    </Tag>
                    <Tag tone="scope">{priorityLabel(active.priority)}</Tag>
                    <Tag tone="neutral">{active.window}</Tag>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl border border-black/10 bg-white/80 p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Situación actual
                      </p>
                      <p className="mt-1 text-sm leading-6 text-black/78">
                        {active.currentSituation}
                      </p>
                    </div>
                    <div className="rounded-xl border border-[rgba(200,238,3,0.5)] bg-[rgba(200,238,3,0.14)] p-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">
                        Solución / impacto
                      </p>
                      <ul className="mt-2 space-y-2">
                        {solutionImpactLines.map((line) => (
                          <li
                            key={line}
                            className="grid grid-cols-[auto_1fr] items-start gap-2 text-sm leading-6 text-black/78"
                          >
                            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#020202]" />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Impacto
                      </p>
                      <div className="h-2 rounded-full bg-black/8">
                        <div
                          className="h-2 rounded-full bg-[linear-gradient(90deg,#020202,#c8ee03)]"
                          style={{ width: `${active.impactScore}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Esfuerzo
                      </p>
                      <div className="h-2 rounded-full bg-black/8">
                        <div
                          className="h-2 rounded-full bg-[linear-gradient(90deg,#020202,#f4bf9f)]"
                          style={{ width: `${active.effortScore}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                      Oportunidad {resolvedIndex + 1} de {filteredRows.length}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={goPrev}
                        aria-label="Oportunidad anterior"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-[#c8ee03]"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        aria-label="Oportunidad siguiente"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-[#c8ee03]"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </ContentCard>
              </motion.div>
            </AnimatePresence>
          ) : null}
        </section>

      </div>
    </main>
  );
}
