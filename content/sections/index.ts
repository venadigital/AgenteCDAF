import { decisionesSection } from "@/content/sections/decisiones";
import { diagnosticoSection } from "@/content/sections/diagnostico";
import { flujosSection } from "@/content/sections/flujos";
import { limitacionesSection } from "@/content/sections/limitaciones";
import { oportunidadesSection } from "@/content/sections/oportunidades";
import { promptSection } from "@/content/sections/prompt";
import { reglasSection } from "@/content/sections/reglas";
import { scopeSection } from "@/content/sections/scope";
import type { SectionPlaceholderContent, SectionSlug } from "@/lib/types";

export const sectionPlaceholders: SectionPlaceholderContent[] = [
  diagnosticoSection,
  oportunidadesSection,
  scopeSection,
  flujosSection,
  reglasSection,
  limitacionesSection,
  promptSection,
  decisionesSection,
];

export const sectionPlaceholderBySlug: Record<SectionSlug, SectionPlaceholderContent> =
  {
    diagnostico: diagnosticoSection,
    oportunidades: oportunidadesSection,
    scope: scopeSection,
    flujos: flujosSection,
    reglas: reglasSection,
    limitaciones: limitacionesSection,
    prompt: promptSection,
    decisiones: decisionesSection,
  };
