"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { Minus, Move, Plus, RotateCcw } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import type { FlowMapDetail } from "@/lib/types";
import { FlowMindMapEdges } from "@/components/sections/flujos/FlowMindMapEdges";
import { FlowMindMapNode } from "@/components/sections/flujos/FlowMindMapNode";
import { usePanZoom } from "@/components/sections/flujos/usePanZoom";

interface FlowMindMapCanvasProps {
  detail: FlowMapDetail;
  activeNodeId: string;
  onSelectNode: (nodeId: string) => void;
}

function sortForNavigation(a: { y: number; x: number }, b: { y: number; x: number }) {
  if (Math.abs(a.y - b.y) > 10) return a.y - b.y;
  return a.x - b.x;
}

export function FlowMindMapCanvas({ detail, activeNodeId, onSelectNode }: FlowMindMapCanvasProps) {
  const shouldReduceMotion = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const {
    transformStyle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onWheel,
    zoomIn,
    zoomOut,
    reset,
    setView,
    state,
  } = usePanZoom({ minScale: 0.62, maxScale: 1.7, initialScale: 0.92 });

  const activeNode = useMemo(() => detail.nodes.find((node) => node.id === activeNodeId), [activeNodeId, detail.nodes]);

  const siblingNodes = useMemo(() => {
    const parentId = activeNode?.parentId;

    if (parentId) {
      return detail.nodes.filter((node) => node.parentId === parentId).sort(sortForNavigation);
    }

    return detail.nodes
      .filter((node) => !node.parentId && (node.kind === "start" || node.kind === "step" || node.kind === "finish"))
      .sort(sortForNavigation);
  }, [activeNode?.parentId, detail.nodes]);

  const handleSiblingNavigation = (direction: "next" | "prev") => {
    if (!siblingNodes.length) return;

    const currentIndex = siblingNodes.findIndex((node) => node.id === activeNodeId);
    const fallbackIndex = 0;
    const base = currentIndex === -1 ? fallbackIndex : currentIndex;

    const nextIndex =
      direction === "next"
        ? (base + 1) % siblingNodes.length
        : (base - 1 + siblingNodes.length) % siblingNodes.length;

    onSelectNode(siblingNodes[nextIndex].id);
  };

  const fitToViewport = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    const padding = 22;

    const scaleX = (viewportWidth - padding * 2) / detail.width;
    const scaleY = (viewportHeight - padding * 2) / detail.height;
    const scale = Math.min(scaleX, scaleY, 1);

    const x = (viewportWidth - detail.width * scale) / 2;
    const y = (viewportHeight - detail.height * scale) / 2;

    setView({ x, y, scale });
  }, [detail.height, detail.width, setView]);

  useEffect(() => {
    fitToViewport();
  }, [fitToViewport]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <p className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-black/58">
          <Move className="h-4 w-4 text-black/60" />
          Arrastra para moverte · rueda para zoom · clic para abrir detalle
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={zoomOut}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/18 bg-white text-black hover:border-black/30"
            aria-label="Alejar"
          >
            <Minus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={zoomIn}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/18 bg-black text-[#c8ee03] hover:border-black/40"
            aria-label="Acercar"
          >
            <Plus className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/18 bg-white text-black hover:border-black/30"
            aria-label="Resetear vista"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={fitToViewport}
            className="inline-flex h-8 items-center justify-center rounded-full border border-black/18 bg-white px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-black hover:border-black/30"
            aria-label="Ajustar vista al mapa"
          >
            Ajustar
          </button>
        </div>
      </div>

      <div
        ref={viewportRef}
        className="relative h-[760px] overflow-hidden rounded-2xl border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,252,234,0.78))] md:h-[860px]"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
        role="application"
        aria-label="Mapa mental del flujo activo"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(200,238,3,0.16),transparent_34%),radial-gradient(circle_at_88%_16%,rgba(2,2,2,0.06),transparent_36%)]" />

        <div
          className="absolute left-4 top-4 z-10 rounded-full border border-black/12 bg-white/92 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-black/62"
          aria-live="polite"
        >
          zoom {Math.round(state.scale * 100)}%
        </div>

        <div
          className="absolute inset-0 touch-none"
          style={{
            transformOrigin: "0 0",
            ...transformStyle,
            transition: shouldReduceMotion ? "none" : "transform 120ms ease-out",
          }}
        >
          <FlowMindMapEdges
            width={detail.width}
            height={detail.height}
            nodes={detail.nodes}
            edges={detail.edges}
            activeNodeId={activeNodeId}
          />

          {detail.nodes.map((node) => (
            <FlowMindMapNode
              key={node.id}
              node={node}
              active={node.id === activeNodeId}
              onSelect={onSelectNode}
              onArrowNavigate={handleSiblingNavigation}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
