import Link from "next/link";
import type { CSSProperties } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  CircleDollarSign,
  Database,
  ListTree,
  Users2,
} from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { NumberBadge } from "@/components/shared/NumberBadge";
import { Tag } from "@/components/shared/Tag";
import { diagnosticoDetail } from "@/content/sections/diagnostico-detail";
import { TarifasPanel } from "@/components/sections/diagnostico/TarifasPanel";
import { SystemsAnimatedCarousel } from "@/components/sections/diagnostico/SystemsAnimatedCarousel";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { RiskImpactChart } from "@/components/sections/diagnostico/RiskImpactChart";

export function DiagnosticoSectionPage() {
  return (
    <main className="relative min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="page-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div className="hero-glow pointer-events-none fixed inset-x-0 top-0 -z-10 h-[35vh]" />

      <div className="mx-auto max-w-[1600px] space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-black/15 bg-white/82 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="relative px-5 py-6 md:px-8 md:py-8">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute inset-y-0 right-0 w-[22%] bg-[linear-gradient(90deg,transparent,rgba(2,2,2,0.05))]" />
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(200,238,3,0.35),transparent_70%)] blur-md" />
              <div className="absolute inset-x-8 top-[44%] h-px bg-black/8" />
            </div>

            <div className="relative grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-3 py-2 text-sm text-black transition hover:border-black/25"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Volver al home
                  </Link>
                  <Tag tone="decision">Bloque 01</Tag>
                  <Tag tone="risk">Diagnóstico As-Is</Tag>
                </div>

                <div className="space-y-3">
                  <Eyebrow>{diagnosticoDetail.sectionLabel}</Eyebrow>
                  <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                    <HeroShutterText
                      text={diagnosticoDetail.title}
                      className="max-w-full align-top"
                    />
                  </h1>
                  <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">
                    {diagnosticoDetail.summary}
                  </p>
                </div>

              </div>

              <ContentCard className="p-4 md:p-5">
                <div className="mb-4 flex items-center gap-2">
                  <ListTree className="h-4 w-4 text-black" />
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-black/60">
                    Índice del Bloque 1
                  </p>
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      id: "equipo-operativo",
                      title: "Equipo Operativo",
                      icon: Users2,
                    },
                    {
                      id: "sistemas-en-uso",
                      title: "Sistemas En Uso",
                      icon: Database,
                    },
                    {
                      id: "tarifas-actuales",
                      title: "Tarifas Actuales",
                      icon: CircleDollarSign,
                    },
                    {
                      id: "brechas-riesgos",
                      title: "Brechas y Riesgos Identificados",
                      icon: AlertTriangle,
                    },
                  ].map((item, idx) => (
                    <Link
                      key={item.id}
                      href={`#${item.id}`}
                      style={{ "--shutter-delay": `${idx * 100}ms` } as CSSProperties}
                      className="shutter-index-item group relative block overflow-hidden rounded-2xl border border-black/10 bg-white/80 p-3 transition hover:border-black/20 hover:bg-white"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white text-black shadow-[0_4px_14px_rgba(2,2,2,0.06)]">
                            <item.icon className="h-[18px] w-[18px] text-black" />
                          </span>
                          <p className="text-sm font-semibold text-black md:text-base">
                            {item.title}
                          </p>
                        </div>
                        <span className="text-lg leading-none text-[#c8ee03] transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </ContentCard>
            </div>
          </div>
        </section>

        <section
          id="equipo-operativo"
          className="scroll-mt-24 grid gap-6 2xl:grid-cols-[1.1fr_0.9fr]"
        >
          <ContentCard className="p-5 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <Eyebrow>Equipo Operativo</Eyebrow>
                <h2 className="mt-2 font-display text-4xl leading-[0.92] text-black">
                  Quién sostiene la operación hoy
                </h2>
              </div>
              <Tag tone="risk">Dependencia humana alta</Tag>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              {diagnosticoDetail.teamRows.map((row, index) => {
                const isCritical =
                  row.primaryFunction.includes("PUNTO NEURÁLGICO") ||
                  row.primaryFunction.includes("SHADOW IT CRÍTICO");
                return (
                  <div
                    key={row.role}
                    className={`group/team relative overflow-hidden rounded-2xl border p-4 transition duration-300 ${
                      isCritical
                        ? "border-black/20 bg-[linear-gradient(135deg,rgba(200,238,3,0.1),rgba(255,255,255,0.92))] hover:border-black/30"
                        : "border-black/10 bg-white/80 hover:border-black/20"
                    }`}
                  >
                    <div
                      className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover/team:opacity-100 ${
                        index < 2
                          ? "bg-gradient-to-t from-black/5 via-[#c8ee03]/8 to-transparent"
                          : "bg-gradient-to-b from-black/5 via-[#c8ee03]/8 to-transparent"
                      }`}
                    />

                    <div className="relative z-10 mb-3 flex items-start justify-between gap-2">
                      <div className="transition duration-300 group-hover/team:-translate-y-0.5">
                        <NumberBadge value={index + 1} size="sm" />
                      </div>
                      {isCritical ? (
                        <Tag
                          tone="decision"
                          className="!border-[#f2b38f] !bg-[#f8d9c9] !text-[#6b3f24]"
                        >
                          Crítico
                        </Tag>
                      ) : (
                        <Tag tone="neutral">Operación</Tag>
                      )}
                    </div>
                    <div className="relative z-10">
                      <div className="relative mb-1 pl-4">
                        <div
                          className={`absolute left-0 top-1 h-5 w-1 rounded-tr-full rounded-br-full transition-all duration-300 group-hover/team:h-7 ${
                            isCritical ? "bg-[#f2b38f]" : "bg-black/18 group-hover/team:bg-[#c8ee03]"
                          }`}
                        />
                        <h3 className="text-base font-semibold leading-6 text-black transition duration-300 group-hover/team:translate-x-1">
                          {row.role}
                        </h3>
                      </div>
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-black/65 transition duration-300 group-hover/team:translate-x-1">
                        {row.names}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-black/75 transition duration-300 group-hover/team:translate-x-1">
                        {row.primaryFunction}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ContentCard>

          <ContentCard id="sistemas-en-uso" className="scroll-mt-24 p-5 md:p-6">
            <div className="mb-5 flex items-center gap-2">
              <Users2 className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Sistemas En Uso</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Sin integración entre ellos
                </h2>
              </div>
            </div>

            <SystemsAnimatedCarousel rows={diagnosticoDetail.systemsRows} />
          </ContentCard>
        </section>

        <section id="tarifas-actuales" className="scroll-mt-24 grid gap-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-5">
              <div>
                <Eyebrow>Tarifas Actuales</Eyebrow>
                <h2 className="mt-2 font-display text-4xl leading-[0.92] text-black">
                  Tarifario operativo con promociones, restricciones y valores pendientes
                </h2>
                <p className="mt-3 max-w-4xl text-sm leading-6 text-black/70 md:text-base">
                  Se incluyen todos los valores levantados para canchas y clases de tenis/pádel, con notas operativas que impactan directamente la respuesta del agente.
                </p>
              </div>
            </div>

            <TarifasPanel rows={[...diagnosticoDetail.tarifasRows]} />
          </ContentCard>
        </section>

        <section id="brechas-riesgos" className="scroll-mt-24 grid gap-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-5 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Brechas y Riesgos Identificados</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">
                  Riesgos que hoy impactan ingreso y continuidad
                </h2>
              </div>
            </div>
            <RiskImpactChart rows={diagnosticoDetail.riskRows} />
          </ContentCard>
        </section>

        <section
          id="discrepancias-entrevistas"
          className="scroll-mt-24 grid gap-6"
        >
          <ContentCard className="p-5 md:p-6">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <Eyebrow>Discrepancias Entre Entrevistas</Eyebrow>
                <h2 className="mt-2 font-display text-4xl leading-[0.92] text-black">
                  Requieren decisión de gerencia
                </h2>
              </div>
              <Tag tone="decision">Impacta configuración del agente</Tag>
            </div>

            <div className="space-y-4">
              {diagnosticoDetail.discrepanciesRows.map((row, index) => (
                <div
                  key={row.topic}
                  className="rounded-2xl border border-black/10 bg-white/82 p-4"
                >
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <NumberBadge value={index + 1} size="sm" />
                      <h3 className="text-base font-semibold leading-6 text-black">
                        {row.topic}
                      </h3>
                    </div>
                    {row.criticalForAgent ? (
                      <Tag tone="decision">Crítico para el agente</Tag>
                    ) : (
                      <Tag tone="neutral">Alineación requerida</Tag>
                    )}
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="rounded-xl border border-black/10 bg-white/70 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm">👩</span>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/60">
                          Luisa dice
                        </p>
                      </div>
                      <p className="text-sm leading-6 text-black/75">{row.luisa}</p>
                    </div>
                    <div className="rounded-xl border border-black/10 bg-white/70 p-3">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm">👨</span>
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/60">
                          Willy dice
                        </p>
                      </div>
                      <p className="text-sm leading-6 text-black/75">{row.willy}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}
