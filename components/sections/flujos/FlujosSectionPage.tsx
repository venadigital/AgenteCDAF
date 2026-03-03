"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState, startTransition } from "react";
import { ArrowLeft, ArrowRight, BrainCircuit, Network } from "lucide-react";
import { ContentCard } from "@/components/shared/ContentCard";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Tag } from "@/components/shared/Tag";
import HeroShutterText from "@/components/ui/hero-shutter-text";
import { FlowCircuitMap } from "@/components/sections/flujos/FlowCircuitMap";
import { FlowFullFlowPanel } from "@/components/sections/flujos/FlowFullFlowPanel";
import { FlowMindMapCanvas } from "@/components/sections/flujos/FlowMindMapCanvas";
import { FlowNodeDetailPanel } from "@/components/sections/flujos/FlowNodeDetailPanel";
import { flujosDetail } from "@/content/sections/flujos-detail";
import { createFlowMindMapDetail, FLOW_VISUAL_ORDER, getOrderedFlows } from "@/content/sections/flujos-map-layout";
import type { FlowCategory, FlowDefinition, FlowKey, FlowMapDetail, FlowMapSectionState } from "@/lib/types";

function isFlowKey(value: string | null): value is FlowKey {
  return value !== null && FLOW_VISUAL_ORDER.includes(value as FlowKey);
}

function findFlow(flows: FlowDefinition[], flowKey: FlowKey) {
  return flows.find((flow) => flow.key === flowKey) ?? flows[0];
}

function resolveNodeId(
  params: URLSearchParams,
  detail: FlowMapDetail,
) {
  const nodeFromUrl = params.get("node");
  if (nodeFromUrl && detail.nodes.some((node) => node.id === nodeFromUrl)) {
    return nodeFromUrl;
  }

  const stepFromLegacy = Number(params.get("step") ?? "NaN");
  if (Number.isFinite(stepFromLegacy) && stepFromLegacy > 0) {
    const legacyNode = `step-${stepFromLegacy}`;
    if (detail.nodes.some((node) => node.id === legacyNode)) {
      return legacyNode;
    }
  }

  return "start";
}

function parseStateFromParams(
  params: URLSearchParams,
  flows: FlowDefinition[],
  mapByFlow: Map<FlowKey, FlowMapDetail>,
): FlowMapSectionState {
  const flowFromUrl = isFlowKey(params.get("flow")) ? (params.get("flow") as FlowKey) : FLOW_VISUAL_ORDER[0];
  const selectedFlow = findFlow(flows, flowFromUrl);
  const detail = mapByFlow.get(selectedFlow.key) ?? createFlowMindMapDetail(selectedFlow);

  return {
    activeFlowKey: selectedFlow.key,
    activeNodeId: resolveNodeId(params, detail),
  };
}

function tagToneByCategory(category: FlowCategory): "flow" | "scope" | "decision" | "opportunity" {
  if (category === "reserva") return "flow";
  if (category === "consulta") return "scope";
  if (category === "escalamiento") return "decision";
  return "opportunity";
}

function categoryLabel(category: FlowCategory) {
  if (category === "reserva") return "Reserva";
  if (category === "consulta") return "Consulta";
  if (category === "escalamiento") return "Escalamiento";
  return "Reagendamiento";
}

export function FlujosSectionPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const flowMapTopRef = useRef<HTMLDivElement>(null);

  const orderedFlows = useMemo<FlowDefinition[]>(() => getOrderedFlows(flujosDetail.flows), []);

  const flowMapByKey = useMemo(() => {
    return new Map<FlowKey, FlowMapDetail>(
      orderedFlows.map((flow) => [flow.key, createFlowMindMapDetail(flow)]),
    );
  }, [orderedFlows]);

  const [mapState, setMapState] = useState<FlowMapSectionState>(() =>
    parseStateFromParams(new URLSearchParams(searchParams.toString()), orderedFlows, flowMapByKey),
  );

  const activeFlow = useMemo(() => {
    return findFlow(orderedFlows, mapState.activeFlowKey);
  }, [mapState.activeFlowKey, orderedFlows]);

  const activeMap = useMemo(() => {
    return flowMapByKey.get(activeFlow.key) ?? createFlowMindMapDetail(activeFlow);
  }, [activeFlow, flowMapByKey]);

  const safeNodeId = activeMap.nodes.some((node) => node.id === mapState.activeNodeId)
    ? mapState.activeNodeId
    : "start";

  const activeNode =
    activeMap.nodes.find((node) => node.id === safeNodeId) ??
    activeMap.nodes.find((node) => node.id === "start") ??
    activeMap.nodes[0];

  const activeFlowIndex = orderedFlows.findIndex((flow) => flow.key === activeFlow.key);
  const previousFlow = orderedFlows[(activeFlowIndex - 1 + orderedFlows.length) % orderedFlows.length];
  const nextFlow = orderedFlows[(activeFlowIndex + 1) % orderedFlows.length];

  const updateUrlState = (nextState: FlowMapSectionState) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("flow", nextState.activeFlowKey);
    params.set("node", nextState.activeNodeId);
    params.delete("step");
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleSelectFlow = (flowKey: FlowKey) => {
    const nextState: FlowMapSectionState = {
      activeFlowKey: flowKey,
      activeNodeId: "start",
    };

    startTransition(() => {
      setMapState(nextState);
    });

    updateUrlState(nextState);
  };

  const handleSelectNode = (nodeId: string) => {
    const nextState: FlowMapSectionState = {
      activeFlowKey: activeFlow.key,
      activeNodeId: nodeId,
    };

    setMapState(nextState);
    updateUrlState(nextState);
  };

  const scrollToFlowMap = useCallback(() => {
    const element = flowMapTopRef.current;
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const handleFlowPagerClick = (flowKey: FlowKey) => {
    handleSelectFlow(flowKey);
    requestAnimationFrame(() => {
      scrollToFlowMap();
    });
  };

  useEffect(() => {
    const parsed = parseStateFromParams(new URLSearchParams(searchParams.toString()), orderedFlows, flowMapByKey);

    if (parsed.activeFlowKey !== mapState.activeFlowKey || parsed.activeNodeId !== mapState.activeNodeId) {
      setMapState(parsed);
    }
  }, [searchParams, orderedFlows, flowMapByKey, mapState.activeFlowKey, mapState.activeNodeId]);

  useEffect(() => {
    if (!activeMap.nodes.some((node) => node.id === mapState.activeNodeId)) {
      const fallbackState = {
        activeFlowKey: activeFlow.key,
        activeNodeId: "start",
      };
      setMapState(fallbackState);
      updateUrlState(fallbackState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFlow.key, activeMap.nodes]);

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
                <Tag tone="decision">Bloque 04</Tag>
                <Tag tone="flow">Flujos</Tag>
              </div>

              <div className="space-y-3">
                <Eyebrow>{flujosDetail.sectionLabel}</Eyebrow>
                <h1 className="max-w-full font-display text-5xl leading-[0.9] tracking-tight text-black sm:text-6xl">
                  <HeroShutterText text={flujosDetail.title} className="max-w-full align-top" />
                </h1>
                <p className="max-w-4xl text-base leading-7 text-black/72 md:text-lg">{flujosDetail.summary}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="hidden lg:grid gap-6">
          <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex items-center gap-2">
              <BrainCircuit className="h-4 w-4 text-black" />
              <div>
                <Eyebrow>Nube de Intenciones</Eyebrow>
                <h2 className="mt-1 font-display text-4xl leading-[0.92] text-black">Disparadores de conversación</h2>
              </div>
            </div>

            <FlowCircuitMap flows={orderedFlows} activeFlowKey={activeFlow.key} onSelectFlow={handleSelectFlow} />
          </ContentCard>
        </section>

        <section className="lg:hidden">
          <ContentCard className="p-4 md:p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/58">Selecciona un flujo</p>
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {orderedFlows.map((flow) => {
                const active = flow.key === activeFlow.key;
                return (
                  <button
                    key={flow.key}
                    type="button"
                    onClick={() => handleSelectFlow(flow.key)}
                    aria-current={active ? "true" : undefined}
                    className={`shrink-0 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition ${
                      active
                        ? "border-black bg-black text-[#c8ee03]"
                        : "border-black/15 bg-white/85 text-black/70 hover:border-black/30 hover:text-black"
                    }`}
                  >
                    {flow.key} · {flow.shortTitle}
                  </button>
                );
              })}
            </div>
          </ContentCard>
        </section>

        <section className="space-y-6">
          <div ref={flowMapTopRef} id="flow-map-top" className="scroll-mt-24">
            <ContentCard className="p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex min-w-9 items-center justify-center rounded-full border border-black/18 bg-black px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white">
                    {activeFlow.key}
                  </span>
                  <Tag tone={tagToneByCategory(activeFlow.category)}>{categoryLabel(activeFlow.category)}</Tag>
                </div>
                <h3 className="font-display text-4xl leading-[0.92] text-black md:text-5xl">{activeFlow.shortTitle}</h3>
                <p className="mt-2 max-w-4xl text-sm leading-7 text-black/78 md:text-base">{activeFlow.context}</p>
              </div>
            </div>

            <FlowMindMapCanvas detail={activeMap} activeNodeId={safeNodeId} onSelectNode={handleSelectNode} />
          </ContentCard>
          </div>

          <ContentCard className="p-5 md:p-6">
            <div className="mb-3 flex items-center gap-2">
              <Network className="h-4 w-4 text-black" />
              <Eyebrow>Detalle del nodo activo</Eyebrow>
            </div>

            <FlowNodeDetailPanel flow={activeFlow} node={activeNode} />

            <div className="my-4 h-px bg-black/10" />

            <FlowFullFlowPanel flow={activeFlow} />

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleFlowPagerClick(previousFlow.key)}
                className="group relative overflow-hidden rounded-2xl border border-black/15 bg-white px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-black/35 hover:bg-[rgba(200,238,3,0.12)] hover:shadow-[0_10px_20px_rgba(2,2,2,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,238,3,0.75)]"
                aria-label={`Ir al flujo anterior ${previousFlow.key} ${previousFlow.shortTitle} y subir al mapa mental`}
              >
                <span className="pointer-events-none absolute right-3 top-3 text-black/35 transition duration-200 group-hover:text-black/70 group-hover:-translate-x-0.5">
                  <ArrowLeft className="h-4 w-4" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Flujo anterior</p>
                <p className="mt-1 text-sm font-semibold text-black transition duration-200 group-hover:text-black">
                  {previousFlow.key} · {previousFlow.shortTitle}
                </p>
                <p className="mt-1 text-xs text-black/55">Click para abrir y volver al mapa</p>
              </button>

              <button
                type="button"
                onClick={() => handleFlowPagerClick(nextFlow.key)}
                className="group relative overflow-hidden rounded-2xl border border-black/15 bg-white px-4 py-3 text-left transition duration-200 hover:-translate-y-0.5 hover:border-black/35 hover:bg-[rgba(200,238,3,0.12)] hover:shadow-[0_10px_20px_rgba(2,2,2,0.09)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,238,3,0.75)]"
                aria-label={`Ir al flujo siguiente ${nextFlow.key} ${nextFlow.shortTitle} y subir al mapa mental`}
              >
                <span className="pointer-events-none absolute right-3 top-3 text-black/35 transition duration-200 group-hover:text-black/70 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">Flujo siguiente</p>
                <p className="mt-1 text-sm font-semibold text-black transition duration-200 group-hover:text-black">
                  {nextFlow.key} · {nextFlow.shortTitle}
                </p>
                <p className="mt-1 text-xs text-black/55">Click para abrir y volver al mapa</p>
              </button>
            </div>
          </ContentCard>
        </section>
      </div>
    </main>
  );
}
