import Image from "next/image";
import { Eyebrow } from "@/components/shared/Eyebrow";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import type { HomeContent } from "@/lib/types";

interface HeroSectionProps {
  content: HomeContent;
  embedded?: boolean;
}

export function HeroSection({ content, embedded = false }: HeroSectionProps) {
  return (
    <header
      id="inicio"
      className={`relative overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,.98),rgba(200,238,3,.08),rgba(245,245,240,.96))] p-5 md:p-8 ${
        embedded
          ? "rounded-t-[28px]"
          : "rounded-[28px] border border-[var(--color-line)] shadow-[var(--shadow-card)] backdrop-blur"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-y-0 right-0 w-[18%] bg-[linear-gradient(90deg,transparent,rgba(2,2,2,0.05))]" />
        <div className="absolute left-0 top-0 h-1 w-56 bg-[var(--color-court)]" />
        <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_62%)] blur-sm" />
        <div className="absolute bottom-8 left-1/2 h-px w-[68%] -translate-x-1/2 bg-black/12" />
        <div className="absolute inset-y-0 right-[14%] w-px bg-black/10" />
        <div className="absolute inset-x-6 top-[32%] h-px bg-black/10" />
      </div>

      <div className="relative">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-4 md:gap-5">
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(200,238,3,0.2),transparent_70%)] blur-md" />
              <div className="relative h-20 w-20 md:h-28 md:w-28">
                <Image
                  src="/brand/logo-cdaf.png"
                  alt="Logo Centro Deportivo Alejandro Falla"
                  fill
                  className="object-contain drop-shadow-[0_8px_18px_rgba(2,2,2,0.18)]"
                  sizes="(min-width: 768px) 112px, 80px"
                  priority
                />
              </div>
            </div>
            <div className="space-y-1">
              <Eyebrow>
                {content.meta.issuer} · {content.meta.dateLabel}
              </Eyebrow>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/55">
                Centro Deportivo Alejandro Falla
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className="max-w-full font-display text-[clamp(2.35rem,4.45vw,4.45rem)] leading-[0.9] tracking-tight text-[var(--color-ink)] lg:whitespace-nowrap">
              <HeroShutterText
                text={content.meta.projectTitle}
                className="max-w-full align-top lg:whitespace-nowrap"
              />
            </h1>
            <div className="max-w-2xl text-base leading-6 text-black/70 sm:text-lg">
              <PointerHighlight
                containerClassName="max-w-fit pr-6 pb-2"
                rectangleClassName="rounded-md border-[var(--color-accent)] bg-[rgba(200,238,3,0.06)]"
                pointerClassName="h-4 w-4 text-[#c8ee03]"
              >
                <span className="relative z-[1] px-1">
                  {content.meta.projectSubtitle}
                </span>
              </PointerHighlight>
            </div>
            {content.hero.intro ? (
              <p className="max-w-2xl text-sm leading-6 text-[var(--color-muted)] sm:text-base">
                {content.hero.intro}
              </p>
            ) : null}
          </div>

        </div>
      </div>
    </header>
  );
}
