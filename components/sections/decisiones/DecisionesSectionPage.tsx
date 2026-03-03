"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  FileQuestion,
  ListChecks,
  Settings2,
} from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import {
  decisionesDetail,
  type DecisionGroup,
  type DecisionItem,
} from "@/content/sections/decisiones-detail";

function compactQuestion(question: string) {
  const normalized = question.trim();
  return normalized.length > 90 ? `${normalized.slice(0, 90).trim()}…` : normalized;
}

export function DecisionesSectionPage() {
  const groups = decisionesDetail.groups as readonly DecisionGroup[];

  const [activeGroupKey, setActiveGroupKey] = useState(decisionesDetail.groups[0]?.key ?? "A");
  const [activeDecisionId, setActiveDecisionId] = useState(
    decisionesDetail.groups[0]?.decisions[0]?.id ?? "DECISIÓN 1",
  );

  const activeGroup = useMemo<DecisionGroup | undefined>(
    () => groups.find((group) => group.key === activeGroupKey) ?? groups[0],
    [activeGroupKey, groups],
  );

  const activeDecisionIndex =
    activeGroup?.decisions.findIndex((decision) => decision.id === activeDecisionId) ?? 0;

  const activeDecision: DecisionItem | undefined =
    (activeDecisionIndex >= 0 && activeGroup?.decisions[activeDecisionIndex]) ||
    activeGroup?.decisions[0];

  const goToPrev = () => {
    if (!activeGroup || activeGroup.decisions.length === 0) return;
    const prev = (activeDecisionIndex - 1 + activeGroup.decisions.length) % activeGroup.decisions.length;
    setActiveDecisionId(activeGroup.decisions[prev].id);
  };

  const goToNext = () => {
    if (!activeGroup || activeGroup.decisions.length === 0) return;
    const next = (activeDecisionIndex + 1) % activeGroup.decisions.length;
    setActiveDecisionId(activeGroup.decisions[next].id);
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
                <Tag tone="decision">Bloque 08</Tag>
                <Tag tone="decision">Decisiones</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{decisionesDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText text={decisionesDetail.title} className="max-w-full align-top" />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">{decisionesDetail.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.78fr_1.22fr]">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Selector</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Grupo y decisión</h2>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {groups.map((group) => {
                const isActive = group.key === activeGroup?.key;
                return (
                  <button
                    key={group.key}
                    type="button"
                    onClick={() => {
                      setActiveGroupKey(group.key);
                      setActiveDecisionId(group.decisions[0]?.id ?? "");
                    }}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                      isActive
                        ? "border-black bg-black text-[#dff58f]"
                        : "border-black/12 bg-white text-black/72 hover:border-black/30 hover:text-black"
                    }`}
                  >
                    Grupo {group.key}
                  </button>
                );
              })}
            </div>

            <div className="mb-4 rounded-xl border border-black/10 bg-white/80 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Grupo activo</p>
              <p className="mt-1 text-sm leading-6 text-black/84">{activeGroup?.title}</p>
            </div>

            <div className="space-y-2">
              {activeGroup?.decisions.map((decision, index) => {
                const isActive = decision.id === activeDecision?.id;
                return (
                  <button
                    key={decision.id}
                    type="button"
                    onClick={() => setActiveDecisionId(decision.id)}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                      isActive
                        ? "border-black/30 bg-[rgba(200,238,3,0.18)]"
                        : "border-black/12 bg-white/90 hover:border-black/28"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex h-6 min-w-6 items-center justify-center rounded-full border px-2 font-mono text-[10px] uppercase tracking-[0.14em] ${
                          isActive
                            ? "border-black/30 bg-black text-[#dff58f]"
                            : "border-black/14 bg-white text-black/66"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <p className="text-sm leading-6 text-black/84">{compactQuestion(decision.question)}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </ContentCard>

          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <FileQuestion className="h-4 w-4 text-black" />
                <div>
                  <Eyebrow>Detalle de decisión</Eyebrow>
                  <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Lectura enfocada</h2>
                </div>
              </div>

              <div className="inline-flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs text-black/78 transition hover:border-black/30 hover:text-black"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  className="inline-flex items-center gap-1 rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs text-black/78 transition hover:border-black/30 hover:text-black"
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {activeDecision && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-black/12 bg-white/90 p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <Tag tone="decision">{activeDecision.id}</Tag>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">
                      {activeGroup?.title}
                    </span>
                  </div>
                  <p className="text-[22px] leading-[1.35] text-black/90">{activeDecision.question}</p>
                </div>

                <div className="rounded-2xl border border-[#efc48f] bg-[#fff2db] p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Contexto operativo</p>
                  <p className="mt-2 text-sm leading-7 text-black/84">{activeDecision.context}</p>
                </div>

                {activeDecision.options && activeDecision.options.length > 0 && (
                  <div className="rounded-2xl border border-black/12 bg-white/90 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <ListChecks className="h-4 w-4 text-black" />
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Opciones definidas</p>
                    </div>
                    <div className="space-y-2">
                      {activeDecision.options.map((option, idx) => (
                        <div key={option} className="rounded-xl border border-black/10 bg-white p-3 text-sm leading-6 text-black/82">
                          <span className="mr-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-black/14 bg-black/[0.04] px-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-black/66">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </ContentCard>
        </section>

        <section>
          <ContentCard className="p-4 md:p-5">
            <div className="grid gap-4 md:grid-cols-[1fr] md:items-center">
              <p className="text-sm leading-6 text-black/74">{decisionesDetail.footer}</p>
            </div>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}
