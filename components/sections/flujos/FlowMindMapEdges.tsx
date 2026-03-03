import type { FlowMapEdge, FlowMapNode } from "@/lib/types";

interface FlowMindMapEdgesProps {
  width: number;
  height: number;
  nodes: FlowMapNode[];
  edges: FlowMapEdge[];
  activeNodeId: string;
}

export function FlowMindMapEdges({ width, height, nodes, edges, activeNodeId }: FlowMindMapEdgesProps) {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  const resolveHeight = (node: FlowMapNode) => node.height ?? 112;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      <defs>
        <filter id="flow-line-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {edges.map((edge) => {
        const from = byId.get(edge.from);
        const to = byId.get(edge.to);
        if (!from || !to) return null;

        const fromWidth = from.width ?? 280;
        const fromHeight = resolveHeight(from);
        const toWidth = to.width ?? 280;
        const toHeight = resolveHeight(to);

        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const vertical = Math.abs(dy) >= Math.abs(dx);

        let fromX = from.x;
        let fromY = from.y;
        let toX = to.x;
        let toY = to.y;

        if (vertical) {
          const signY = dy >= 0 ? 1 : -1;
          fromY = from.y + signY * (fromHeight / 2 - 6);
          toY = to.y - signY * (toHeight / 2 - 6);
        } else {
          const signX = dx >= 0 ? 1 : -1;
          fromX = from.x + signX * (fromWidth / 2 - 8);
          toX = to.x - signX * (toWidth / 2 - 8);
        }

        const controlStrength = vertical ? Math.max(38, Math.abs(dy) * 0.32) : Math.max(42, Math.abs(dx) * 0.28);
        const controlA = vertical
          ? `${fromX} ${fromY + (dy >= 0 ? controlStrength : -controlStrength)}`
          : `${fromX + (dx >= 0 ? controlStrength : -controlStrength)} ${fromY}`;
        const controlB = vertical
          ? `${toX} ${toY - (dy >= 0 ? controlStrength : -controlStrength)}`
          : `${toX - (dx >= 0 ? controlStrength : -controlStrength)} ${toY}`;

        const path = `M ${fromX} ${fromY} C ${controlA}, ${controlB}, ${toX} ${toY}`;
        const active = edge.from === activeNodeId || edge.to === activeNodeId;

        return (
          <g key={edge.id}>
            <path
              d={path}
              fill="none"
              stroke={active ? "rgba(200,238,3,0.96)" : "rgba(2,2,2,0.26)"}
              strokeWidth={active ? 2.8 : 1.8}
              strokeLinecap="round"
              filter={active ? "url(#flow-line-glow)" : undefined}
            />
            {edge.label ? (
              <text
                x={(fromX + toX) / 2}
                y={(fromY + toY) / 2 - 8}
                textAnchor="middle"
                className="font-mono text-[10px] uppercase tracking-[0.14em]"
                fill={active ? "rgba(2,2,2,0.84)" : "rgba(2,2,2,0.55)"}
              >
                {edge.label}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
