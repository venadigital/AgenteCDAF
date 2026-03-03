import { Tag } from "@/components/shared/Tag";
import { VisualPanel } from "@/components/shared/VisualPanel";
import type { SectionPreview, SectionTheme, VisualSpec } from "@/lib/types";

interface PreviewVisualProps {
  spec: VisualSpec;
}

function MiniTableVisual() {
  return (
    <VisualPanel>
      <div className="grid gap-2 text-xs text-[var(--color-ink)]">
        <div className="grid grid-cols-[1.1fr_1.2fr_1fr] gap-2 font-mono uppercase tracking-[0.14em] text-[10px] text-[var(--color-muted)]">
          <span>Área</span>
          <span>Hallazgo</span>
          <span>Severidad</span>
        </div>
        {[
          ["Cobertura", "Sin respuesta 24/7", "Crítica"],
          ["Academias", "Willy = punto único", "Crítica"],
          ["Operación", "Excel sin validación", "Alta"],
        ].map((row) => (
          <div
            key={row.join("-")}
            className="grid grid-cols-[1.1fr_1.2fr_1fr] gap-2 rounded-xl border border-[var(--color-line)] bg-white/70 p-2"
          >
            <span className="truncate">{row[0]}</span>
            <span className="truncate">{row[1]}</span>
            <Tag tone={row[2] === "Crítica" ? "risk" : "decision"}>{row[2]}</Tag>
          </div>
        ))}
      </div>
    </VisualPanel>
  );
}

function PriorityBarsVisual() {
  const bars = [
    { label: "P1", count: 5, width: "84%", tone: "opportunity" as const },
    { label: "P2", count: 4, width: "64%", tone: "rules" as const },
    { label: "P3", count: 3, width: "46%", tone: "scope" as const },
  ];
  return (
    <VisualPanel>
      <div className="space-y-3">
        {bars.map((bar) => (
          <div key={bar.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
            <Tag tone={bar.tone}>{bar.label}</Tag>
            <div className="h-3 rounded-full bg-black/6">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-[var(--color-court)] to-[var(--color-accent)]"
                style={{ width: bar.width }}
              />
            </div>
            <span className="font-mono text-xs text-[var(--color-muted)]">{bar.count}</span>
          </div>
        ))}
        <div className="rounded-xl border border-dashed border-[var(--color-line)] p-3 text-xs text-[var(--color-muted)]">
          12 oportunidades ancladas al diagnóstico, con foco inmediato en continuidad operativa e ingresos.
        </div>
      </div>
    </VisualPanel>
  );
}

function ScopeSplitVisual() {
  return (
    <VisualPanel>
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl border border-[var(--color-line)] bg-white/75 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Tag tone="scope">Dentro</Tag>
            <span className="text-xs text-[var(--color-muted)]">Autonomía</span>
          </div>
          <ul className="space-y-2 text-xs leading-5 text-[var(--color-ink)]">
            <li>Reservas y cancelaciones</li>
            <li>Precios y promociones</li>
            <li>Información inicial de academias</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-[var(--color-line)] bg-white/75 p-3">
          <div className="mb-2 flex items-center gap-2">
            <Tag tone="decision">Escala</Tag>
            <span className="text-xs text-[var(--color-muted)]">Humano</span>
          </div>
          <ul className="space-y-2 text-xs leading-5 text-[var(--color-ink)]">
            <li>Excepciones y quejas</li>
            <li>Datos no confirmados</li>
            <li>Casos fuera de política</li>
          </ul>
        </div>
      </div>
    </VisualPanel>
  );
}

function FlowMapVisual() {
  return (
    <VisualPanel>
      <div className="relative flex min-h-36 items-center justify-center">
        <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-[var(--color-line)]" />
        <div className="grid w-full grid-cols-4 gap-2">
          {["Intención", "Validación", "Precio", "Reserva"].map((step, index) => (
            <div key={step} className="relative">
              <div className="mx-auto mb-2 h-8 w-8 rounded-full border border-[var(--color-line)] bg-white/90 text-center font-display text-lg leading-8">
                {index + 1}
              </div>
              <div className="rounded-xl border border-[var(--color-line)] bg-white/75 p-2 text-center text-[11px] leading-4 text-[var(--color-ink)]">
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </VisualPanel>
  );
}

function RuleGridVisual() {
  return (
    <VisualPanel>
      <div className="grid gap-2 sm:grid-cols-2">
        {[
          ["Anticipación mínima", "2 horas", "rules"],
          ["Dayron", "Solo nocturno", "tech"],
          ["Promos pádel", "Por franja", "opportunity"],
          ["Escalamiento", "Valores no confirmados", "decision"],
        ].map(([label, value, tone]) => (
          <div
            key={label}
            className="rounded-xl border border-[var(--color-line)] bg-white/75 p-3"
          >
            <p className="text-[11px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
              {label}
            </p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-[var(--color-ink)]">{value}</p>
              <Tag tone={tone as SectionTheme}>{String(tone)}</Tag>
            </div>
          </div>
        ))}
      </div>
    </VisualPanel>
  );
}

function DependencyListVisual() {
  const deps = [
    ["EasyCancha API", "Por validar", "tech"],
    ["WhatsApp Business API", "Requerida", "scope"],
    ["Horarios humanos", "Condiciona escalamiento", "decision"],
  ] as const;

  return (
    <VisualPanel>
      <div className="space-y-2">
        {deps.map(([name, status, tone]) => (
          <div
            key={name}
            className="flex items-center justify-between gap-3 rounded-xl border border-[var(--color-line)] bg-white/75 p-3"
          >
            <div>
              <p className="text-sm font-medium text-[var(--color-ink)]">{name}</p>
              <p className="text-xs text-[var(--color-muted)]">{status}</p>
            </div>
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                tone === "decision"
                  ? "bg-[var(--color-court)]"
                  : tone === "scope"
                    ? "bg-[var(--color-accent)]"
                    : "bg-[var(--color-court)]"
              }`}
            />
          </div>
        ))}
      </div>
    </VisualPanel>
  );
}

function AgentCardVisual() {
  return (
    <VisualPanel className="bg-gradient-to-br from-white/80 to-[rgba(200,238,3,0.14)]">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-court)] text-sm text-white">
              🤖
            </div>
            <div>
              <p className="font-display text-xl leading-none text-[var(--color-ink)]">
                Luisa
              </p>
              <p className="text-xs text-[var(--color-muted)]">
                Asistente virtual WhatsApp 24/7
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Tag tone="prompt">8 flujos</Tag>
            <Tag tone="prompt">+30 reglas</Tag>
            <Tag tone="prompt">7 escalamientos</Tag>
          </div>
        </div>
        <div className="rounded-2xl border border-[var(--color-line)] bg-white/80 p-3 text-right">
          <p className="font-display text-3xl leading-none text-[var(--color-court)]">
            24/7
          </p>
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted)]">
            Disponibilidad
          </p>
        </div>
      </div>
    </VisualPanel>
  );
}

function DecisionListVisual() {
  return (
    <VisualPanel>
      <div className="space-y-2">
        {[
          "Tarifa pádel 1,5h y 2h fin de semana >13:00",
          "Oferta de Willy como entrenador por el agente",
          "2h de clase como estándar o bajo solicitud",
        ].map((item, index) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-xl border border-[var(--color-line)] bg-white/75 p-3"
          >
            <Tag tone="decision">D{index + 1}</Tag>
            <p className="text-xs leading-5 text-[var(--color-ink)]">{item}</p>
          </div>
        ))}
      </div>
    </VisualPanel>
  );
}

export function PreviewVisual({ spec }: PreviewVisualProps) {
  switch (spec) {
    case "mini-table":
      return <MiniTableVisual />;
    case "priority-bars":
      return <PriorityBarsVisual />;
    case "scope-split":
      return <ScopeSplitVisual />;
    case "flow-map":
      return <FlowMapVisual />;
    case "rule-grid":
      return <RuleGridVisual />;
    case "dependency-list":
      return <DependencyListVisual />;
    case "agent-card":
      return <AgentCardVisual />;
    case "decision-list":
      return <DecisionListVisual />;
    default:
      return null;
  }
}

export function previewThemeTone(preview: SectionPreview): SectionTheme {
  const map: Record<SectionPreview["slug"], SectionTheme> = {
    diagnostico: "risk",
    oportunidades: "opportunity",
    scope: "scope",
    flujos: "flow",
    reglas: "rules",
    limitaciones: "tech",
    prompt: "prompt",
    decisiones: "decision",
  };
  return map[preview.slug];
}
