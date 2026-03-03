import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { NumberBadge } from "@/components/shared/NumberBadge";
import type { HomeContent } from "@/lib/types";

interface ContentIndexProps {
  content: HomeContent;
}

export function ContentIndex({ content }: ContentIndexProps) {
  return (
    <section id="contenido" className="scroll-mt-24" aria-label="Mapa de contenido">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {content.contentIndex.map((item) => (
          <Link key={item.slug} href={`/secciones/${item.slug}`} className="group block">
            <ContentCard className="h-full p-4 transition duration-200 group-hover:-translate-y-1 group-hover:shadow-[var(--shadow-glow)]">
              <div className="flex h-full flex-col gap-4">
                <div
                  className="h-1.5 w-16 rounded-full bg-[var(--color-court)]"
                  aria-hidden="true"
                />
                <div className="flex items-start gap-3">
                  <NumberBadge value={item.id} />
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-2xl leading-[0.95] text-[var(--color-ink)]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-5 text-[var(--color-muted)]">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-black/8 pt-3 text-xs">
                  <span className="font-mono uppercase tracking-[0.14em] text-[var(--color-court)]">
                    Abrir bloque
                  </span>
                  <span className="inline-flex items-center justify-center text-[#c8ee03] transition group-hover:translate-x-1">
                    <ArrowUpRight
                      className="h-5 w-5 stroke-[2.5] drop-shadow-[0_1px_0_rgba(2,2,2,0.2)]"
                      aria-hidden="true"
                    />
                  </span>
                </div>
              </div>
            </ContentCard>
          </Link>
        ))}
      </div>
    </section>
  );
}
