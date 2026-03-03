"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  Check,
  CheckCircle2,
  Clock3,
  Handshake,
  MoonStar,
  Siren,
  UserRound,
  X,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { scopeDetail } from "@/content/sections/scope-detail";

type EscalationFilter = "luisa" | "willy" | "agent-shift";

function modeIcon(mode: string) {
  if (mode.includes("Autónomo")) return Bot;
  if (mode.includes("Escalamiento")) return Handshake;
  return MoonStar;
}

function isEmailEscalationChannel(channel: string) {
  return channel.toLowerCase().includes("email");
}

function isAcademyEscalationChannel(channel: string) {
  return channel.toLowerCase().includes("academias");
}

function matchesOwnerFilter(owner: string, filter: EscalationFilter) {
  const ownerText = owner.toLowerCase();
  if (filter === "luisa") return ownerText.includes("luisa");
  if (filter === "willy") return ownerText.includes("willy");
  return ownerText.includes("agente de turno");
}

export function ScopeSectionPage() {
  const [escalationFilter, setEscalationFilter] = useState<EscalationFilter>("luisa");

  const escalationRows = useMemo(
    () =>
      scopeDetail.escalationMap.filter((row) =>
        matchesOwnerFilter(row.owner, escalationFilter),
      ),
    [escalationFilter],
  );

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
                <Tag tone="decision">Bloque 03</Tag>
                <Tag tone="scope">Scope</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{scopeDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText text={scopeDetail.title} className="max-w-full align-top" />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">
                  {scopeDetail.summary}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#5a8f1a]" />
              <div>
                <Eyebrow>Dentro Del Alcance</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  El agente sí responde y ejecuta
                </h2>
              </div>
            </div>
            <div className="space-y-2">
              {scopeDetail.inScope.map((item) => (
                <div
                  key={item}
                  className="group rounded-xl border border-[rgba(200,238,3,0.46)] bg-[rgba(200,238,3,0.14)] px-3 py-2.5 transition hover:border-[rgba(200,238,3,0.72)] hover:bg-[rgba(200,238,3,0.2)]"
                >
                  <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#5a8f1a]/40 bg-[#eaffb9] text-[#447013]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-6 text-black/84">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <XCircle className="h-4 w-4 text-[#9b2f2f]" />
              <div>
                <Eyebrow>Fuera Del Alcance</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Debe escalarse a humano
                </h2>
              </div>
            </div>
            <div className="space-y-2">
              {scopeDetail.outOfScope.map((item) => (
                <div
                  key={item}
                  className="group rounded-xl border border-[#efb08c] bg-[#fff2e9] px-3 py-2.5 transition hover:border-[#e59c73] hover:bg-[#ffece0]"
                >
                  <div className="grid grid-cols-[auto_1fr] items-start gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#c76943]/40 bg-[#ffe3d4] text-[#a34325]">
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-6 text-black/84">{item}</p>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>

        <section className="grid gap-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-5">
              <Eyebrow>Modos De Operación</Eyebrow>
              <h2 className="mt-2 font-display text-4xl leading-[0.92] text-black">
                Cómo opera el agente según el contexto
              </h2>
            </div>
            <div className="lg:hidden">
              <div className="relative pl-8">
                <div className="absolute bottom-6 left-3 top-2 w-px bg-black/15" />
                {scopeDetail.modes.map((row, index) => {
                  const Icon = modeIcon(row.mode);
                  return (
                    <motion.div
                      key={row.mode}
                      initial={{ opacity: 0, x: 18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.26, delay: index * 0.08 }}
                      className="relative mb-4 rounded-2xl border border-black/10 bg-white/84 p-4"
                    >
                      <span className="absolute -left-7 top-6 inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/20 bg-white text-[10px] font-mono">
                        {index + 1}
                      </span>
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white text-black">
                          <Icon className="h-5 w-5" />
                        </span>
                        <Tag tone="scope">Paso {index + 1}</Tag>
                      </div>
                      <h3 className="text-base font-semibold text-black">{row.mode}</h3>
                      <p className="mt-2 text-sm leading-6 text-black/78">
                        {row.description}
                      </p>
                      <div className="mt-3 rounded-xl border border-black/10 bg-[rgba(200,238,3,0.12)] p-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">
                          Cuándo aplica
                        </p>
                        <p className="mt-1 text-sm leading-6 text-black/78">
                          {row.appliesWhen}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(245,250,230,0.75))] px-4 pb-14 pt-14">
                <svg
                  viewBox="0 0 1200 470"
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M120 70 H1080 C1125 70 1145 90 1145 135 V335 C1145 380 1125 400 1080 400 H120 C75 400 55 380 55 335 V135 C55 90 75 70 120 70 Z"
                    fill="none"
                    stroke="rgba(2,2,2,0.16)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.9, ease: "easeInOut" }}
                  />
                  <path
                    d="M120 70 H1080 C1125 70 1145 90 1145 135 V335 C1145 380 1125 400 1080 400 H120 C75 400 55 380 55 335 V135 C55 90 75 70 120 70 Z"
                    fill="none"
                    stroke="rgba(200,238,3,0.95)"
                    strokeWidth="2"
                    strokeDasharray="12 16"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      values="0;-56"
                      dur="1.8s"
                      repeatCount="indefinite"
                    />
                  </path>

                  <path d="M965 62 L985 70 L965 78 Z" fill="#c8ee03" />
                  <path d="M1137 270 L1145 290 L1153 270 Z" fill="#c8ee03" />
                  <path d="M235 392 L215 400 L235 408 Z" fill="#c8ee03" />
                  <path d="M47 198 L55 178 L63 198 Z" fill="#c8ee03" />

                  <circle r="5.5" fill="#020202">
                    <animateMotion
                      dur="5.4s"
                      repeatCount="indefinite"
                      rotate="auto"
                      path="M120 70 H1080 C1125 70 1145 90 1145 135 V335 C1145 380 1125 400 1080 400 H120 C75 400 55 380 55 335 V135 C55 90 75 70 120 70 Z"
                    />
                  </circle>
                </svg>

                <div className="pointer-events-none absolute inset-x-0 top-4 flex items-center justify-center">
                  <span className="inline-flex items-center rounded-full border border-black/15 bg-white/92 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/68">
                    1 → 2 → 3 → 1
                  </span>
                </div>

                <div className="relative z-10 grid gap-4 lg:grid-cols-3">
                  {scopeDetail.modes.map((row, index) => {
                    const Icon = modeIcon(row.mode);
                    return (
                      <motion.div
                        key={row.mode}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.28, delay: index * 0.08 }}
                        className="rounded-2xl border border-black/10 bg-white/90 p-4 shadow-[0_8px_24px_rgba(2,2,2,0.06)]"
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white text-black">
                            <Icon className="h-5 w-5" />
                          </span>
                          <Tag tone="scope">Paso {index + 1}</Tag>
                        </div>
                        <h3 className="text-base font-semibold text-black">{row.mode}</h3>
                        <p className="mt-2 text-sm leading-6 text-black/78">
                          {row.description}
                        </p>
                        <div className="mt-3 rounded-xl border border-black/10 bg-[rgba(200,238,3,0.12)] p-3">
                          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">
                            Cuándo aplica
                          </p>
                          <p className="mt-1 text-sm leading-6 text-black/78">
                            {row.appliesWhen}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center">
                  <span className="inline-flex items-center rounded-full border border-black/15 bg-white/92 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-black/68">
                    Ciclo continuo 24/7
                  </span>
                </div>
              </div>
            </div>
          </ContentCard>
        </section>

        <section className="grid gap-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Siren className="h-4 w-4 text-black" />
                <div>
                  <Eyebrow>Mapa De Escalamientos</Eyebrow>
                  <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                    Responsable, tiempos y manejo fuera de horario
                  </h2>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: "luisa", label: "Luisa" },
                  { key: "willy", label: "Willy" },
                  { key: "agent-shift", label: "Agente de turno" },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setEscalationFilter(item.key as EscalationFilter)}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                      escalationFilter === item.key
                        ? "border-black bg-black text-[#c8ee03]"
                        : "border-black/15 bg-white/85 text-black/70 hover:border-black/30 hover:text-black"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {escalationRows.map((row, index) => (
                <div
                  key={row.requestType}
                  className="rounded-2xl border border-black/10 bg-white/82 p-4"
                >
                  <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr_0.8fr_0.9fr] lg:items-start">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Tipo de solicitud
                      </p>
                      <p className="mt-1 text-base font-semibold text-black">
                        {row.requestType}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Responsable
                      </p>
                      <p className="mt-1 inline-flex items-center gap-2 text-sm text-black/82">
                        <UserRound className="h-4 w-4 text-black/60" />
                        {row.owner}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Tiempo estimado
                      </p>
                      <p className="mt-1 inline-flex items-center gap-2 text-sm text-black/82">
                        <Clock3 className="h-4 w-4 text-black/60" />
                        {row.eta}
                      </p>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/55">
                        Canal de escalamiento
                      </p>
                      <Tag
                        tone="decision"
                        className={
                          isEmailEscalationChannel(row.escalationChannel)
                            ? "!border-[#f2b38f] !bg-[#f8d9c9] !text-[#6b3f24]"
                            : "!border-[rgba(200,238,3,0.55)] !bg-[rgba(200,238,3,0.2)] !text-black"
                        }
                      >
                        {row.escalationChannel}
                      </Tag>
                    </div>
                  </div>
                  <div className="mt-3 h-1.5 rounded-full bg-black/7">
                    <div
                      className={`h-1.5 rounded-full ${
                        isEmailEscalationChannel(row.escalationChannel)
                          ? "w-[62%] bg-[linear-gradient(90deg,#020202,#f2b38f)]"
                          : isAcademyEscalationChannel(row.escalationChannel)
                            ? "w-[78%] bg-[linear-gradient(90deg,#020202,#9dcf2a)]"
                            : "w-[88%] bg-[linear-gradient(90deg,#020202,#c8ee03)]"
                      }`}
                    />
                  </div>
                  <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/50">
                    Escalamiento #{index + 1}
                  </p>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}
