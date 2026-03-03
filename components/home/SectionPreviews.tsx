import Link from "next/link";
import { PreviewVisual, previewThemeTone } from "@/components/home/PreviewVisuals";
import { ContentCard } from "@/components/shared/ContentCard";
import { NumberBadge } from "@/components/shared/NumberBadge";
import { SectionFrame } from "@/components/shared/SectionFrame";
import { Tag } from "@/components/shared/Tag";
import type { HomeContent } from "@/lib/types";

interface SectionPreviewsProps {
  content: HomeContent;
}

export function SectionPreviews({ content }: SectionPreviewsProps) {
  return (
    <SectionFrame
      id="previews"
      eyebrow="Bloques · Vista Visual"
      title="Previews diseñados para explicar sin saturar de texto"
      description="Cada módulo representa el tipo de información que verá el cliente cuando construyamos el bloque completo: tablas, mapas de flujo, matrices de reglas, dependencias y decisiones."
    >
      <div className="grid gap-5 xl:grid-cols-2">
        {content.sectionPreviews.map((preview) => {
          const indexItem = content.contentIndex.find((item) => item.slug === preview.slug);
          if (!indexItem) return null;

          return (
            <article
              key={preview.slug}
              id={indexItem.anchorId}
              className="scroll-mt-24 reveal"
              style={{ animationDelay: `${indexItem.id * 45}ms` }}
            >
              <ContentCard className="h-full p-4 sm:p-5">
                <div className="grid h-full gap-4 lg:grid-cols-[auto_1fr]">
                  <div className="flex items-start gap-3 lg:flex-col lg:items-start">
                    <NumberBadge value={indexItem.id} size="lg" />
                    <div className="flex flex-wrap gap-2">
                      <Tag tone={previewThemeTone(preview)}>{indexItem.title}</Tag>
                      <Tag tone="neutral">{preview.visualSpec}</Tag>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl leading-[0.92] text-[var(--color-ink)]">
                        {preview.headline}
                      </h3>
                      <p className="text-sm leading-6 text-[var(--color-muted)]">
                        {indexItem.summary}
                      </p>
                    </div>

                    <PreviewVisual spec={preview.visualSpec} />

                    <ul className="grid gap-2">
                      {preview.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="rounded-xl border border-[var(--color-line)] bg-white/55 px-3 py-2 text-sm leading-5 text-[var(--color-ink)]"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <Link
                        href={`#contenido`}
                        className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-paperAlt)]"
                      >
                        Volver al índice
                      </Link>
                      <Link
                        href={`/secciones/${preview.slug}`}
                        className="inline-flex items-center rounded-full bg-[var(--color-court)] px-3 py-1.5 text-xs font-medium text-white transition hover:bg-[var(--color-courtSoft)]"
                      >
                        Ruta futura del bloque
                      </Link>
                    </div>
                  </div>
                </div>
              </ContentCard>
            </article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
