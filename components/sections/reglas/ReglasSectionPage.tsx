"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState, startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Scale, ShieldBan } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { NoNegotiablesPanel } from "@/components/sections/reglas/NoNegotiablesPanel";
import { RuleDetailPanel } from "@/components/sections/reglas/RuleDetailPanel";
import { RulesCategoryRail } from "@/components/sections/reglas/RulesCategoryRail";
import { RulesMatrixMap } from "@/components/sections/reglas/RulesMatrixMap";
import { reglasDetail } from "@/content/sections/reglas-detail";
import type { RuleCategory, RuleCategoryKey, RuleMatrixState } from "@/lib/types";

const DEFAULT_CATEGORY: RuleCategoryKey = "tiempo";

function isRuleCategory(value: string | null): value is RuleCategoryKey {
  return value === "tiempo" || value === "profesores" || value === "precios";
}

function firstRuleIdForCategory(category: RuleCategory) {
  return category.rules[0]?.id ?? "";
}

function parseMatrixState(params: URLSearchParams, categories: RuleCategory[]): RuleMatrixState {
  const categoryFromUrl = isRuleCategory(params.get("categoria"))
    ? (params.get("categoria") as RuleCategoryKey)
    : DEFAULT_CATEGORY;

  const activeCategory = categories.find((category) => category.key === categoryFromUrl) ?? categories[0];
  const ruleFromUrl = params.get("regla");

  const activeRuleId =
    ruleFromUrl && activeCategory.rules.some((rule) => rule.id === ruleFromUrl)
      ? ruleFromUrl
      : firstRuleIdForCategory(activeCategory);

  return {
    activeCategory: activeCategory.key,
    activeRuleId,
  };
}

function ReglasSectionContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const categories = useMemo(() => [...reglasDetail.categories], []);

  const [state, setState] = useState<RuleMatrixState>(() =>
    parseMatrixState(new URLSearchParams(searchParams.toString()), categories),
  );

  const activeCategory =
    categories.find((category) => category.key === state.activeCategory) ?? categories[0];
  const activeRule =
    activeCategory.rules.find((rule) => rule.id === state.activeRuleId) ?? activeCategory.rules[0];

  const updateUrl = (nextState: RuleMatrixState) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("categoria", nextState.activeCategory);
    params.set("regla", nextState.activeRuleId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (nextCategory: RuleCategoryKey) => {
    const category = categories.find((item) => item.key === nextCategory) ?? categories[0];
    const nextState: RuleMatrixState = {
      activeCategory: category.key,
      activeRuleId: firstRuleIdForCategory(category),
    };

    startTransition(() => {
      setState(nextState);
    });

    updateUrl(nextState);
  };

  const handleRuleChange = (ruleId: string) => {
    if (!activeCategory.rules.some((rule) => rule.id === ruleId)) {
      return;
    }

    const nextState: RuleMatrixState = {
      activeCategory: activeCategory.key,
      activeRuleId: ruleId,
    };

    setState(nextState);
    updateUrl(nextState);
  };

  useEffect(() => {
    const parsed = parseMatrixState(new URLSearchParams(searchParams.toString()), categories);

    if (
      parsed.activeCategory !== state.activeCategory ||
      parsed.activeRuleId !== state.activeRuleId
    ) {
      setState(parsed);
    }
  }, [categories, searchParams, state.activeCategory, state.activeRuleId]);

  useEffect(() => {
    if (!activeCategory.rules.some((rule) => rule.id === state.activeRuleId)) {
      const fallback: RuleMatrixState = {
        activeCategory: activeCategory.key,
        activeRuleId: firstRuleIdForCategory(activeCategory),
      };
      setState(fallback);
      updateUrl(fallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory.key]);

  return (
    <main className="relative min-h-screen px-4 py-6 md:px-6 md:py-8">
      <div className="page-grid pointer-events-none fixed inset-0 -z-10 opacity-70" />
      <div className="hero-glow pointer-events-none fixed inset-x-0 top-0 -z-10 h-[35vh]" />

      <div className="mx-auto max-w-[1600px] space-y-6">
        <section className="overflow-hidden rounded-[28px] border border-black/15 bg-white/82 shadow-[var(--shadow-card)] backdrop-blur">
          <div className="relative px-5 py-6 md:px-8 md:py-8">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute inset-y-0 right-0 w-[24%] bg-[linear-gradient(90deg,transparent,rgba(2,2,2,0.05))]" />
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(200,238,3,0.35),transparent_70%)] blur-md" />
              <div className="absolute inset-x-8 top-[44%] h-px bg-black/8" />
            </div>

            <div className="relative space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/80 px-3 py-2 text-sm text-black transition hover:border-black/25"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Volver al home
                </Link>
                <Tag tone="decision">Bloque 05</Tag>
                <Tag tone="rules">Reglas</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{reglasDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText text={reglasDetail.title} className="max-w-full align-top" />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">{reglasDetail.summary}</p>
                <p className="max-w-4xl text-sm leading-6 text-black/68 md:text-base">{reglasDetail.intro}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <Scale className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Matriz visual de reglas</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Categorías y controles</h2>
              </div>
            </div>

            <RulesCategoryRail
              categories={categories}
              activeCategory={activeCategory.key}
              onChange={handleCategoryChange}
            />

            <p className="mt-3 text-sm leading-6 text-black/72">{activeCategory.summary}</p>

            <div className="mt-4">
              <RulesMatrixMap
                rules={activeCategory.rules}
                activeRuleId={activeRule.id}
                onRuleChange={handleRuleChange}
              />
            </div>
          </ContentCard>

          <RuleDetailPanel
            category={activeCategory}
            rule={activeRule}
          />
        </section>

        <NoNegotiablesPanel
          title={reglasDetail.noNegotiablesTitle}
          items={reglasDetail.noNegotiables}
        />

        <section>
          <ContentCard className="p-5 md:p-6">
            <div className="flex items-center gap-2">
              <ShieldBan className="h-4 w-4 text-black" />
              <Eyebrow>Regla de control global</Eyebrow>
            </div>
            <p className="mt-2 text-sm leading-6 text-black/78">
              El agente no interpreta estas reglas; las ejecuta. Cuando una condición requiere validación humana o aprobación de gerencia, la conversación debe escalarse antes de confirmar al cliente.
            </p>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}

export function ReglasSectionPage() {
  return (
    <Suspense fallback={null}>
      <ReglasSectionContent />
    </Suspense>
  );
}
