import { Check, Circle, FileText, GitBranch, MessageSquareQuote, Play, Table2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FlowMapNode } from "@/lib/types";

interface FlowMindMapNodeProps {
  node: FlowMapNode;
  active: boolean;
  onSelect: (id: string) => void;
  onArrowNavigate: (direction: "next" | "prev") => void;
}

function iconByKind(kind: FlowMapNode["kind"]) {
  if (kind === "start") return Play;
  if (kind === "decision") return GitBranch;
  if (kind === "table") return Table2;
  if (kind === "message") return MessageSquareQuote;
  if (kind === "rule") return Circle;
  if (kind === "finish") return Check;
  return FileText;
}

function nodeTone(kind: FlowMapNode["kind"], active: boolean) {
  if (active) {
    return "border-[rgba(200,238,3,0.8)] bg-[rgba(200,238,3,0.2)] text-black shadow-[0_12px_30px_rgba(2,2,2,0.16)]";
  }

  if (kind === "decision") return "border-[#efb08c] bg-[#fff5ee] text-[#704630]";
  if (kind === "rule") return "border-black/20 bg-white text-black/85";
  if (kind === "table") return "border-black/20 bg-white text-black/85";
  if (kind === "message") return "border-[rgba(200,238,3,0.4)] bg-[rgba(200,238,3,0.12)] text-black/86";
  if (kind === "start") return "border-black/22 bg-white text-black";
  if (kind === "finish") return "border-[rgba(200,238,3,0.5)] bg-[rgba(200,238,3,0.18)] text-black";
  return "border-black/20 bg-white text-black/88";
}

export function FlowMindMapNode({ node, active, onSelect, onArrowNavigate }: FlowMindMapNodeProps) {
  const Icon = iconByKind(node.kind);
  const nodeHeight = node.height ?? (node.kind === "start" || node.kind === "finish" ? 118 : 112);
  const titleClass = node.kind === "step" || node.kind === "decision" ? "text-[18px] leading-[1.2]" : "text-[30px] leading-[1.05]";
  const subtitleClampClass =
    node.kind === "start" || node.kind === "finish" ? "[-webkit-line-clamp:4]" : "[-webkit-line-clamp:3]";

  return (
    <button
      type="button"
      onClick={() => onSelect(node.id)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "ArrowDown") {
          event.preventDefault();
          onArrowNavigate("next");
        }

        if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
          event.preventDefault();
          onArrowNavigate("prev");
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(node.id);
        }
      }}
      aria-current={active ? "true" : undefined}
      className={cn(
        "absolute overflow-hidden rounded-2xl border px-4 py-3 text-left transition duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(200,238,3,0.7)]",
        active ? "z-[3]" : "z-[2]",
        nodeTone(node.kind, active),
      )}
      style={{
        left: node.x,
        top: node.y,
        width: node.width ?? 260,
        height: nodeHeight,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex items-center gap-2.5">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/15 bg-white text-black">
          <Icon className="h-4 w-4" />
        </span>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-black/60">{node.kind}</p>
      </div>
      <p className={cn("mt-2 font-semibold tracking-tight", titleClass)}>{node.title}</p>
      {node.subtitle ? (
        <p className={cn("mt-2 overflow-hidden text-sm leading-6 text-black/74 [display:-webkit-box] [-webkit-box-orient:vertical]", subtitleClampClass)}>
          {node.subtitle}
        </p>
      ) : null}
    </button>
  );
}
