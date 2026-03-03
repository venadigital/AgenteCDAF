import { SectionFrame } from "@/components/shared/SectionFrame";
import { Tag } from "@/components/shared/Tag";
import type { HomeContent } from "@/lib/types";

interface RoadmapProps {
  content: HomeContent;
}

function statusMeta(status: HomeContent["roadmap"][number]["status"]) {
  if (status === "in-progress") {
    return {
      tone: "opportunity" as const,
      label: "Bloque actual",
      fill: "bg-[var(--color-court)]",
    };
  }

  if (status === "ready") {
    return {
      tone: "scope" as const,
      label: "Listo",
      fill: "bg-[var(--color-accent)]",
    };
  }

  return {
    tone: "neutral" as const,
    label: "Próximo",
    fill: "bg-black/10",
  };
}

export function Roadmap({ content }: RoadmapProps) {
  return (
    <SectionFrame
      id="roadmap"
      eyebrow="Secuencia de Construcción"
      title="Orden de desarrollo por bloques"
      description="Comenzamos por la portada (home) y luego avanzamos sección por sección. Este orden conserva coherencia narrativa con el documento matriz y facilita validación con el cliente."
    >
      <div className="rounded-[22px] border border-[var(--color-line)] bg-white/72 p-4 shadow-[var(--shadow-card)] backdrop-blur sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
              Estado actual
            </p>
            <p className="font-display text-3xl leading-none text-[var(--color-ink)]">
              Home / Portada
            </p>
          </div>
          <Tag tone="opportunity">Bloque 0 · En ejecución</Tag>
        </div>

        <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {content.roadmap.map((item) => {
            const meta = statusMeta(item.status);
            return (
              <li
                key={item.slug}
                className="rounded-2xl border border-[var(--color-line)] bg-white/70 p-3"
              >
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-display text-2xl leading-none text-[var(--color-ink)]">
                    {String(item.order).padStart(2, "0")}
                  </span>
                  <Tag tone={meta.tone}>{meta.label}</Tag>
                </div>
                <p className="text-sm font-medium text-[var(--color-ink)]">{item.label}</p>
                <div className="mt-3 h-1.5 rounded-full bg-black/6">
                  <div
                    className={`h-1.5 rounded-full ${meta.fill}`}
                    style={{
                      width:
                        item.status === "in-progress"
                          ? "62%"
                          : item.status === "ready"
                            ? "100%"
                            : "20%",
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </SectionFrame>
  );
}
