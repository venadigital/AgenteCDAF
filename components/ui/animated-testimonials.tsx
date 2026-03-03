"use client";

import { IconArrowLeft, IconArrowRight, IconLock } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type AnimatedTestimonialItem = {
  title: string;
  subtitle: string;
  usage: string;
  limitation: string;
  icon: React.ReactNode;
  tone?: "default" | "critical";
};

export function AnimatedTestimonials({
  testimonials,
  autoplay = false,
  className,
}: {
  testimonials: AnimatedTestimonialItem[];
  autoplay?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const isActive = (index: number) => index === active;

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5000);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  if (!testimonials.length) {
    return null;
  }

  const randomRotateY = () => Math.floor(Math.random() * 15) - 7;
  const secondaryIndex =
    testimonials.length > 1 ? (active + 1) % testimonials.length : active;
  const secondary = testimonials[secondaryIndex];

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-none rounded-2xl border border-black/10 bg-white/70 px-4 py-5 md:px-6 md:py-6",
        className,
      )}
    >
      <div className="grid gap-8 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div className="relative h-[280px] w-full sm:h-[320px]">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => {
              const activeCard = isActive(index);
              return (
              <motion.div
                key={`${testimonial.title}-${index}`}
                initial={{
                  opacity: 0,
                  scale: 0.92,
                  z: -80,
                  rotate: randomRotateY(),
                }}
                animate={{
                  opacity: activeCard ? 1 : 0.16,
                  scale: activeCard ? 1 : 0.9,
                  z: activeCard ? 0 : -80,
                  rotate: activeCard ? 0 : randomRotateY(),
                  zIndex: activeCard ? 20 : testimonials.length + 2 - index,
                  y: activeCard ? [0, -14, 0] : index * 4,
                  filter: activeCard ? "blur(0px)" : "blur(2px) saturate(0.7)",
                }}
                exit={{
                  opacity: 0,
                  scale: 0.92,
                  z: 90,
                  rotate: randomRotateY(),
                }}
                transition={{
                  duration: 0.42,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-bottom"
              >
                <div
                  className={cn(
                    "relative flex h-full w-full flex-col justify-between overflow-hidden rounded-3xl border p-5",
                    testimonial.tone === "critical"
                      ? "border-[#f2b38f] bg-[linear-gradient(145deg,#fff8f3,#fde6d7)]"
                      : "border-black/15 bg-[linear-gradient(145deg,#ffffff,#eef8c9)]",
                  )}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-45">
                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(200,238,3,0.45),transparent_70%)] blur-lg" />
                  </div>

                  <div className="relative z-10 flex items-center justify-between gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/15 bg-white text-black shadow-[0_8px_24px_rgba(2,2,2,0.1)]">
                      {testimonial.icon}
                    </span>
                    <span className="rounded-full border border-black/12 bg-white/88 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/70">
                      {testimonial.subtitle}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <h3 className="font-display text-3xl leading-[0.95] text-black">
                      {testimonial.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-black/75">
                      {testimonial.usage}
                    </p>
                  </div>

                  <div className="relative z-10 rounded-xl border border-black/10 bg-white/92 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/60">
                      Limitación crítica
                    </p>
                    <p className="mt-1 text-sm leading-6 text-black/78">
                      {testimonial.limitation}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
            })}
          </AnimatePresence>
        </div>

        <div className="flex h-full flex-col justify-between gap-6 py-1">
          <motion.div
            key={secondaryIndex}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="rounded-2xl border border-black/10 bg-[linear-gradient(140deg,rgba(255,255,255,0.95),rgba(246,250,232,0.85))] p-4 md:p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/55">
                Próximo sistema
              </p>
              <span className="inline-flex items-center gap-1 rounded-full border border-black/12 bg-white/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/65">
                <IconLock className="h-3.5 w-3.5" />
                Preview
              </span>
            </div>
            <h3 className="mt-3 font-display text-[clamp(2.1rem,3.6vw,3.2rem)] leading-[0.92] text-black">
              {secondary.title}
            </h3>
            <p className="mt-2 text-sm text-black/60">{secondary.subtitle}</p>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-black/10 bg-white/86 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
                  Uso actual
                </p>
                <div className="mt-2 space-y-2">
                  <div className="h-3 w-[92%] rounded-full bg-black/10 blur-[0.8px]" />
                  <div className="h-3 w-[84%] rounded-full bg-black/10 blur-[0.8px]" />
                  <div className="h-3 w-[68%] rounded-full bg-black/10 blur-[0.8px]" />
                </div>
              </div>
              <div className="rounded-xl border border-[#f2b38f]/55 bg-[#fff7f1]/95 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#7b4b2d]">
                  Riesgo / limitación
                </p>
                <div className="mt-2 space-y-2">
                  <div className="h-3 w-[88%] rounded-full bg-[#d9ab8d]/35 blur-[0.8px]" />
                  <div className="h-3 w-[78%] rounded-full bg-[#d9ab8d]/35 blur-[0.8px]" />
                </div>
              </div>
            </div>

            <p className="mt-4 text-xs leading-5 text-black/62">
              Este contenido se revela completo al avanzar con{" "}
              <span className="font-semibold text-black">Siguiente</span>.
            </p>
          </motion.div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Sistema anterior"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-[#c8ee03]"
            >
              <IconArrowLeft className="h-5 w-5 transition-transform duration-300 hover:-rotate-12" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Sistema siguiente"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-[#c8ee03]"
            >
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 hover:rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
