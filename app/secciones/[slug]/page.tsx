import Link from "next/link";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DiagnosticoSectionPage } from "@/components/sections/diagnostico/DiagnosticoSectionPage";
import { DecisionesSectionPage } from "@/components/sections/decisiones/DecisionesSectionPage";
import { FlujosSectionPage } from "@/components/sections/flujos/FlujosSectionPage";
import { LimitacionesSectionPage } from "@/components/sections/limitaciones/LimitacionesSectionPage";
import { OportunidadesSectionPage } from "@/components/sections/oportunidades/OportunidadesSectionPage";
import { PromptSectionPage } from "@/components/sections/prompt/PromptSectionPage";
import { ReglasSectionPage } from "@/components/sections/reglas/ReglasSectionPage";
import { ScopeSectionPage } from "@/components/sections/scope/ScopeSectionPage";
import { sectionPlaceholderBySlug } from "@/content/sections";
import type { SectionSlug } from "@/lib/types";

export const dynamic = "force-dynamic";

interface SectionPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function SectionPlaceholderPage({
  params,
}: SectionPageProps) {
  const resolved = await params;
  const slug = resolved.slug as SectionSlug;
  const section = sectionPlaceholderBySlug[slug];

  if (!section) {
    notFound();
  }

  if (slug === "diagnostico") {
    return <DiagnosticoSectionPage />;
  }

  if (slug === "oportunidades") {
    return <OportunidadesSectionPage />;
  }

  if (slug === "scope") {
    return <ScopeSectionPage />;
  }

  if (slug === "flujos") {
    return (
      <Suspense fallback={null}>
        <FlujosSectionPage />
      </Suspense>
    );
  }

  if (slug === "reglas") {
    return <ReglasSectionPage />;
  }

  if (slug === "limitaciones") {
    return <LimitacionesSectionPage />;
  }

  if (slug === "prompt") {
    return <PromptSectionPage />;
  }

  if (slug === "decisiones") {
    return <DecisionesSectionPage />;
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 md:py-10">
      <div className="mx-auto max-w-5xl rounded-[28px] border border-[var(--color-line)] bg-white/72 p-6 shadow-[var(--shadow-card)] backdrop-blur sm:p-8">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
          Ruta Placeholder · Próxima fase
        </p>
        <h1 className="mt-3 font-display text-5xl leading-[0.9] text-[var(--color-ink)] sm:text-6xl">
          {section.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--color-muted)]">
          {section.summary}
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-line)] bg-white/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Estado
            </p>
            <p className="mt-2 text-lg font-medium text-[var(--color-ink)]">
              {section.status === "in-progress" ? "En progreso" : "Planeado"}
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--color-line)] bg-white/70 p-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--color-muted)]">
              Siguiente foco de construcción
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-ink)]">
              {section.nextBuildFocus}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-[var(--color-court)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--color-courtSoft)]"
          >
            Volver al home
          </Link>
          <Link
            href={`/#preview-${section.slug}`}
            className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--color-paperAlt)]"
          >
            Volver al índice del home
          </Link>
        </div>
      </div>
    </main>
  );
}
