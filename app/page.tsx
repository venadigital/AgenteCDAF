import { ContentIndex } from "@/components/home/ContentIndex";
import { HeroSection } from "@/components/home/HeroSection";
import { homeContent } from "@/content/home";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      <div className="page-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div className="hero-glow pointer-events-none fixed inset-x-0 top-0 -z-10 h-[40vh]" />

      <div className="mx-auto w-full max-w-[1600px] px-4 py-4 md:px-6 md:py-6 xl:px-10">
        <div className="space-y-12 md:space-y-14">
          <section
            aria-label="Portada y contenido"
            className="overflow-hidden rounded-[28px] border border-black/15 bg-white/78 shadow-[var(--shadow-card)] backdrop-blur"
          >
            <HeroSection content={homeContent} embedded />
            <div className="border-t border-black/14 px-5 py-5 md:px-8 md:py-8">
              <ContentIndex content={homeContent} />
            </div>
          </section>

          <footer className="rounded-[22px] border border-black/20 bg-[var(--color-court)] px-5 py-4 shadow-[var(--shadow-card)] backdrop-blur">
            <div className="flex flex-col gap-2 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
              <p>
                {homeContent.meta.issuer} · {homeContent.meta.dateLabel} ·{" "}
                {homeContent.meta.version}
              </p>
              <p>Branding en placeholders · listo para reemplazo por assets finales</p>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
