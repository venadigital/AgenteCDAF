import { ArrowLeft, ArrowRight } from "lucide-react";
import type { FlowStep } from "@/lib/types";

interface FlowStepperProps {
  steps: FlowStep[];
  currentStepIndex: number;
  onSelectStep: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

export function FlowStepper({
  steps,
  currentStepIndex,
  onSelectStep,
  onPrev,
  onNext,
}: FlowStepperProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/60">
          Paso {currentStepIndex + 1} de {steps.length}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onPrev}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-white text-black transition hover:border-black/35"
            aria-label="Paso anterior"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/20 bg-black text-[#c8ee03] transition hover:border-black/50"
            aria-label="Paso siguiente"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const active = index === currentStepIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onSelectStep(index)}
              aria-current={active ? "step" : undefined}
              className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition ${
                active
                  ? "border-black bg-black text-[#c8ee03]"
                  : "border-black/18 bg-white/90 text-black/70 hover:border-black/30 hover:text-black"
              }`}
            >
              {`Paso ${step.id}`}
            </button>
          );
        })}
      </div>
    </div>
  );
}
