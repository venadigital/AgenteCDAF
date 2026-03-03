"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CalendarClock,
  ClipboardList,
  Cpu,
  MessageSquareQuote,
  Route,
  ShieldAlert,
  TerminalSquare,
  Wrench,
} from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { promptDetail } from "@/content/sections/prompt-detail";

function DataTable({ columns, rows }: { columns: readonly string[]; rows: readonly (readonly string[])[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black/12 bg-white/80">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                scope="col"
                className="border-b border-black/12 bg-black/[0.04] px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] text-black/62"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="odd:bg-white even:bg-black/[0.015]">
              {row.map((cell, colIndex) => (
                <td key={`cell-${rowIndex}-${colIndex}`} className="border-b border-black/8 px-3 py-2 align-top text-black/82">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const sectionAnchors = [
  { id: "identidad-rol", label: "Identidad" },
  { id: "info-centro", label: "Centro" },
  { id: "servicios-precios", label: "Servicios" },
  { id: "herramientas", label: "Herramientas" },
  { id: "intenciones", label: "Intenciones" },
  { id: "flujos", label: "Flujos" },
  { id: "reglas-criticas", label: "Reglas" },
  { id: "comunicacion", label: "Comunicación" },
  { id: "situaciones", label: "Situaciones" },
  { id: "recordatorios", label: "Recordatorios" },
];

type FlowItem = (typeof promptDetail.flows)[number];
type FlowKey = FlowItem["key"];

export function PromptSectionPage() {
  const [activeFlowKey, setActiveFlowKey] = useState<FlowKey>(promptDetail.flows[0]?.key ?? "Flujo 1");

  const activeFlow = useMemo(
    () => promptDetail.flows.find((flow) => flow.key === activeFlowKey) ?? promptDetail.flows[0],
    [activeFlowKey],
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
                <Tag tone="decision">Bloque 07</Tag>
                <Tag tone="prompt">Prompt</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{promptDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText text={promptDetail.title} className="max-w-full align-top" />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">{promptDetail.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="sticky top-[72px] z-20 overflow-x-auto rounded-2xl border border-black/12 bg-white/85 p-2 backdrop-blur">
          <div className="flex min-w-max gap-2">
            {sectionAnchors.map((anchor) => (
              <button
                key={anchor.id}
                type="button"
                onClick={() => {
                  document.getElementById(anchor.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="rounded-full border border-black/12 bg-white px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-black/72 transition hover:border-black/30 hover:text-black"
              >
                {anchor.label}
              </button>
            ))}
          </div>
        </section>

        <section id="identidad-rol">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Bot className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Identidad y Rol</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Luisa · Asistente Virtual CDAF</h2>
              </div>
            </div>
            <div className="rounded-2xl border border-black/12 bg-white/85 p-4">
              <p className="text-sm leading-7 text-black/84">{promptDetail.identityRole}</p>
            </div>
          </ContentCard>
        </section>

        <section id="info-centro" className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <ClipboardList className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Información del Centro Deportivo</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Datos de contacto</h2>
              </div>
            </div>

            <div className="space-y-2">
              {promptDetail.contactData.map((row) => (
                <div key={row.label} className="rounded-xl border border-black/10 bg-white/80 p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">{row.label}</p>
                  <p className="mt-1 text-sm leading-6 text-black/82">{row.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-black/10 bg-[rgba(200,238,3,0.12)] p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Zona horaria</p>
              <p className="mt-1 text-sm leading-6 text-black/84">{promptDetail.timezone}</p>
            </div>
          </ContentCard>

          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Horarios de Operación</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Ventanas activas del centro</h2>
              </div>
            </div>
            <DataTable columns={promptDetail.operationSchedule.columns} rows={promptDetail.operationSchedule.rows} />
          </ContentCard>
        </section>

        <section id="servicios-precios" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <Eyebrow>Servicios, precios y condiciones</Eyebrow>
            <h2 className="mt-2 font-display text-4xl leading-[0.92] text-black">Alquiler de canchas de pádel</h2>
            <div className="mt-4">
              <DataTable columns={promptDetail.services.padelRental.columns} rows={promptDetail.services.padelRental.rows} />
            </div>
            <div className="mt-4 space-y-2">
              {promptDetail.services.padelRental.criticalNotes.map((note) => (
                <div key={note} className="rounded-xl border border-[#f0b59a] bg-[#ffece2] p-3 text-sm leading-6 text-black/84">
                  {note}
                </div>
              ))}
            </div>
          </ContentCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <ContentCard className="p-5 md:p-6">
              <h3 className="font-display text-3xl leading-[0.95] text-black">Alquiler de canchas de tenis</h3>
              <div className="mt-4">
                <DataTable columns={promptDetail.services.tennisRental.columns} rows={promptDetail.services.tennisRental.rows} />
              </div>
            </ContentCard>

            <ContentCard className="p-5 md:p-6">
              <h3 className="font-display text-3xl leading-[0.95] text-black">Clases particulares de pádel</h3>
              <div className="mt-4">
                <DataTable columns={promptDetail.services.padelClasses.columns} rows={promptDetail.services.padelClasses.rows} />
              </div>
              <ul className="mt-4 space-y-2">
                {promptDetail.services.padelClasses.notes.map((note) => (
                  <li key={note} className="rounded-xl border border-[#f0b59a] bg-[#fff0e8] p-3 text-sm leading-6 text-black/82">
                    ❌ {note}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </div>

          <ContentCard className="p-5 md:p-6">
            <h3 className="font-display text-3xl leading-[0.95] text-black">Clases particulares de tenis</h3>
            <div className="mt-4">
              <DataTable columns={promptDetail.services.tennisClasses.columns} rows={promptDetail.services.tennisClasses.rows} />
            </div>
            <ul className="mt-4 space-y-2">
              {promptDetail.services.tennisClasses.notes.map((note) => (
                <li key={note} className="rounded-xl border border-black/10 bg-white/85 p-3 text-sm leading-6 text-black/82">
                  {note.includes("NO") ? "❌ " : "ℹ️ "}
                  {note}
                </li>
              ))}
            </ul>
          </ContentCard>
        </section>

        <section id="herramientas" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Herramientas disponibles</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">EasyCancha y Gmail</h2>
              </div>
            </div>

            <div className="space-y-3">
              {promptDetail.tools.easyCancha.map((tool) => (
                <div key={tool.action} className="rounded-2xl border border-black/12 bg-white/85 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">EasyCancha · {tool.action}</p>
                  <p className="mt-2 text-sm leading-6 text-black/82"><strong>Uso:</strong> {tool.use}</p>
                  <p className="mt-1 text-sm leading-6 text-black/82"><strong>Cuándo usarla:</strong> {tool.when}</p>
                  <p className="mt-1 text-sm leading-6 text-black/82"><strong>Contexto:</strong> {tool.context}</p>
                </div>
              ))}
            </div>
          </ContentCard>

          <ContentCard className="p-5 md:p-6">
            <h3 className="font-display text-3xl leading-[0.95] text-black">Gmail · Escalamiento Humano</h3>
            <div className="mt-4 rounded-xl border border-black/10 bg-white/85 p-4 text-sm leading-6 text-black/82">
              <p><strong>Uso:</strong> {promptDetail.tools.gmailEscalation.use}</p>
              <p className="mt-2"><strong>Cuándo usarla:</strong> {promptDetail.tools.gmailEscalation.when}</p>
              <p className="mt-2"><strong>Contexto:</strong> {promptDetail.tools.gmailEscalation.context}</p>
            </div>
            <div className="mt-4">
              <DataTable
                columns={promptDetail.tools.gmailEscalation.recipientsTable.columns}
                rows={promptDetail.tools.gmailEscalation.recipientsTable.rows}
              />
            </div>
          </ContentCard>
        </section>

        <section id="intenciones">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Route className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Clasificación de Intenciones</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Enrutamiento al flujo correcto</h2>
              </div>
            </div>
            <DataTable columns={promptDetail.intentClassification.columns} rows={promptDetail.intentClassification.rows} />
          </ContentCard>
        </section>

        <section id="flujos" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <TerminalSquare className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Flujos de Conversación</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">8 flujos operativos codificados</h2>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-2">
              {promptDetail.flows.map((flow) => (
                <button
                  key={flow.key}
                  type="button"
                  onClick={() => setActiveFlowKey(flow.key)}
                  className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                    activeFlow?.key === flow.key
                      ? "border-black bg-black text-[#c8ee03]"
                      : "border-black/15 bg-white/80 text-black/72 hover:border-black/30 hover:text-black"
                  }`}
                >
                  {flow.key}
                </button>
              ))}
            </div>

            {activeFlow && (
              <div className="rounded-2xl border border-black/12 bg-white/88 p-4">
                <h3 className="font-display text-3xl leading-[0.95] text-black">{activeFlow.title}</h3>
                <p className="mt-2 text-sm leading-6 text-black/82">{activeFlow.applies}</p>
                <pre className="mt-4 overflow-x-auto rounded-xl border border-black/10 bg-black/[0.04] p-4 font-mono text-[12px] leading-6 text-black/82 whitespace-pre-wrap">
                  {activeFlow.script}
                </pre>
              </div>
            )}
          </ContentCard>
        </section>

        <section id="reglas-criticas" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Reglas de Negocio Críticas</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Condiciones no negociables</h2>
              </div>
            </div>

            <h3 className="font-display text-3xl leading-[0.95] text-black">Tiempos y Anticipación</h3>
            <div className="mt-4">
              <DataTable columns={promptDetail.criticalRules.timeTable.columns} rows={promptDetail.criticalRules.timeTable.rows} />
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Precios — lo que el agente NUNCA debe hacer</p>
                {promptDetail.criticalRules.pricesDont.map((item) => (
                  <div key={item} className="rounded-xl border border-[#f0b59a] bg-[#ffece2] p-3 text-sm leading-6 text-black/84">❌ {item}</div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Profesores — restricciones de oferta</p>
                {promptDetail.criticalRules.teacherRestrictions.map((item) => (
                  <div key={item} className="rounded-xl border border-black/10 bg-white/84 p-3 text-sm leading-6 text-black/82">{item}</div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-2">
              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Identificación del cliente</p>
                {promptDetail.criticalRules.clientIdentification.map((item) => (
                  <div key={item} className="rounded-xl border border-black/10 bg-white/84 p-3 text-sm leading-6 text-black/82">{item}</div>
                ))}
              </div>

              <div className="space-y-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Fuera del alcance del agente</p>
                {promptDetail.criticalRules.outOfScope.map((item) => (
                  <div key={item} className="rounded-xl border border-[#efc48f] bg-[#fff2db] p-3 text-sm leading-6 text-black/84">❌ {item}</div>
                ))}
              </div>
            </div>
          </ContentCard>
        </section>

        <section id="comunicacion" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <MessageSquareQuote className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Directrices de Comunicación</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Tono, formato y ejemplos</h2>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Tono y estilo</p>
                <div className="space-y-2">
                  {promptDetail.communication.toneStyle.map((item) => (
                    <div key={item} className="rounded-xl border border-black/10 bg-white/84 p-3 text-sm leading-6 text-black/82">{item}</div>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Formato de mensajes</p>
                <div className="space-y-2">
                  {promptDetail.communication.formatRules.map((item) => (
                    <div key={item} className="rounded-xl border border-black/10 bg-white/84 p-3 text-sm leading-6 text-black/82">{item}</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">Ejemplos de tono</p>
              {promptDetail.communication.examples.map((example) => (
                <div key={example.title} className="rounded-xl border border-black/12 bg-white/86 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">{example.title}</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/84">{example.text}</pre>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>

        <section id="situaciones" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Cpu className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Manejo de Situaciones Especiales</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Cuándo escalar inmediatamente</h2>
              </div>
            </div>

            <div className="space-y-2">
              {promptDetail.specialSituations.immediateEscalation.map((item, idx) => (
                <div key={item} className="rounded-xl border border-[#efc48f] bg-[#fff2db] p-3 text-sm leading-6 text-black/84">
                  {idx + 1}. {item}
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[#b8cd80] bg-[rgba(200,238,3,0.18)] p-3 text-sm leading-6 text-black/84">
              {promptDetail.specialSituations.principle}
            </div>

            <div className="mt-4 grid gap-3">
              {promptDetail.specialSituations.commonMessages.map((item) => (
                <div key={item.title} className="rounded-xl border border-black/10 bg-white/84 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/56">{item.title}</p>
                  <pre className="mt-2 whitespace-pre-wrap text-sm leading-6 text-black/84">{item.text}</pre>
                </div>
              ))}
            </div>
          </ContentCard>
        </section>

        <section id="recordatorios" className="space-y-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Recordatorios Operativos</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Checklist de ejecución</h2>
              </div>
            </div>
            <div className="space-y-2">
              {promptDetail.operationalReminders.map((item, idx) => (
                <div key={item} className="rounded-xl border border-black/10 bg-white/84 p-3 text-sm leading-6 text-black/82">
                  {idx + 1}. {item}
                </div>
              ))}
            </div>
          </ContentCard>

          <div className="grid gap-6 xl:grid-cols-2">
            <ContentCard className="p-5 md:p-6">
              <Eyebrow>Datos del cliente actual</Eyebrow>
              <h3 className="mt-1 font-display text-3xl leading-[0.95] text-black">Variables de contexto</h3>
              <div className="mt-4 space-y-2">
                {promptDetail.currentClientData.map((item) => (
                  <div key={item} className="rounded-xl border border-black/10 bg-white/85 p-3 font-mono text-[12px] leading-6 text-black/82">
                    - {item}
                  </div>
                ))}
              </div>
            </ContentCard>

            <ContentCard className="p-5 md:p-6">
              <Eyebrow>Inicio de conversación</Eyebrow>
              <h3 className="mt-1 font-display text-3xl leading-[0.95] text-black">Primer mensaje del agente</h3>
              <div className="mt-4 space-y-2">
                {promptDetail.conversationStart.map((item, idx) => (
                  <div key={item} className="rounded-xl border border-black/10 bg-white/85 p-3 text-sm leading-6 text-black/82">
                    {idx + 1}. {item}
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>
        </section>
      </div>
    </main>
  );
}
