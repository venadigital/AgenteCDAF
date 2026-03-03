"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Copy,
  GitMerge,
  Network,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import {
  limitacionesDetail,
  type DependencyState,
} from "@/content/sections/limitaciones-detail";

type StatusFilter = "all" | DependencyState;

function stateTagClass(state: DependencyState) {
  if (state === "ready") {
    return "border-[rgba(97,171,62,0.4)] bg-[rgba(189,232,146,0.32)] text-[#355a1f]";
  }
  if (state === "decision") {
    return "border-[#efc48f] bg-[#fff2db] text-[#7c5022]";
  }
  return "border-[#f0b59a] bg-[#ffe8dd] text-[#7c3b26]";
}

function statePillText(state: DependencyState) {
  if (state === "ready") return "LISTA";
  if (state === "decision") return "DECISIÓN";
  return "PENDIENTE";
}

function stateBorderClass(state: DependencyState) {
  if (state === "ready") return "border-[rgba(97,171,62,0.42)] bg-[rgba(230,246,211,0.72)]";
  if (state === "decision") return "border-[#efc48f] bg-[#fff4e4]";
  return "border-[#f0b59a] bg-[#fff0e7]";
}

function statusCountsByFilter(state: DependencyState) {
  if (state === "ready") return "Lista";
  if (state === "decision") return "Decisión";
  return "Pendiente";
}

export function LimitacionesSectionPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [activeId, setActiveId] = useState(limitacionesDetail.dependencies[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const filteredDependencies = useMemo(
    () =>
      limitacionesDetail.dependencies.filter(
        (row) => filter === "all" || row.state === filter,
      ),
    [filter],
  );

  const activeDependency =
    filteredDependencies.find((row) => row.id === activeId) ??
    filteredDependencies[0] ??
    limitacionesDetail.dependencies[0];

  const totalByState = useMemo(
    () => ({
      ready: limitacionesDetail.dependencies.filter((row) => row.state === "ready").length,
      pending: limitacionesDetail.dependencies.filter((row) => row.state === "pending").length,
      decision: limitacionesDetail.dependencies.filter((row) => row.state === "decision").length,
    }),
    [],
  );

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(limitacionesDetail.offHoursMessage);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
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
                <Tag tone="decision">Bloque 06</Tag>
                <Tag tone="tech">Limitaciones</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{limitacionesDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText text={limitacionesDetail.title} className="max-w-full align-top" />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">
                  {limitacionesDetail.summary}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Network className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>6.1 Dependencias técnicas</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Estado actual e impacto operativo
                </h2>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {[
                { key: "all", label: "Todas" },
                { key: "pending", label: `Pendientes (${totalByState.pending})` },
                { key: "decision", label: `Decisión (${totalByState.decision})` },
                { key: "ready", label: `Listas (${totalByState.ready})` },
              ].map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setFilter(item.key as StatusFilter)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                    filter === item.key
                      ? "border-black bg-black text-[#c8ee03]"
                      : "border-black/15 bg-white/80 text-black/70 hover:border-black/35 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {filteredDependencies.map((row) => {
                const active = row.id === activeDependency?.id;
                return (
                  <button
                    key={row.id}
                    type="button"
                    onClick={() => setActiveId(row.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-black/35 bg-white shadow-[0_10px_24px_rgba(2,2,2,0.08)]"
                        : "border-black/12 bg-white/80 hover:border-black/28 hover:bg-white"
                    }`}
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <Tag tone="tech" className={stateTagClass(row.state)}>
                        {statePillText(row.state)}
                      </Tag>
                      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        {row.id}
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-black">{row.component}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/76">{row.currentStatus}</p>
                  </button>
                );
              })}
            </div>
          </ContentCard>

          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <GitMerge className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Detalle activo</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Componente y efecto en el agente
                </h2>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeDependency?.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.18 }}
                className={`rounded-2xl border p-4 ${stateBorderClass(activeDependency?.state ?? "pending")}`}
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Tag tone="tech" className={stateTagClass(activeDependency?.state ?? "pending")}>
                    {statusCountsByFilter(activeDependency?.state ?? "pending")}
                  </Tag>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">
                    {activeDependency?.id}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-black">{activeDependency?.component}</h3>
                <div className="mt-3 rounded-xl border border-black/12 bg-white/80 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
                    Estado actual
                  </p>
                  <p className="mt-1 text-sm leading-6 text-black/78">{activeDependency?.currentStatus}</p>
                </div>
                <div className="mt-3 rounded-xl border border-black/12 bg-white/85 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
                    Impacto en el agente
                  </p>
                  <p className="mt-1 text-sm leading-6 text-black/82">{activeDependency?.impact}</p>
                </div>
              </motion.div>
            </AnimatePresence>

          </ContentCard>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>6.2 Cuando el agente no sabe la respuesta</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Escalar en lugar de improvisar
                </h2>
              </div>
            </div>

            <div className="rounded-2xl border border-[#efc48f] bg-[#fff4e4] p-4">
              <p className="text-sm leading-6 text-black/84">{limitacionesDetail.unknownAnswerRule}</p>
            </div>
          </ContentCard>

          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>6.3 Mensajes fuera de horario operativo</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Operación continua 24/7
                </h2>
              </div>
            </div>

            <div className="space-y-2">
              {limitacionesDetail.offHoursFlow.map((line, index) => (
                <div
                  key={line}
                  className="rounded-xl border border-black/10 bg-white/80 px-3 py-2.5"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">
                    Paso {index + 1}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-black/80">{line}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-2xl border border-[#b8cd80] bg-[rgba(200,238,3,0.15)] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">
                {limitacionesDetail.offHoursMessageTitle}
              </p>
              <p className="mt-2 text-sm leading-6 text-black/84">{limitacionesDetail.offHoursMessage}</p>
              <div className="mt-3">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    copied
                      ? "border-[rgba(97,171,62,0.45)] bg-[rgba(189,232,146,0.35)] text-[#355a1f]"
                      : "border-black/15 bg-white text-black/76 hover:border-black/30 hover:text-black"
                  }`}
                >
                  {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Mensaje copiado" : "Copiar mensaje"}
                </button>
              </div>
            </div>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}
