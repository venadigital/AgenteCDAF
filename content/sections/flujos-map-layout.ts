import type {
  FlowDefinition,
  FlowMapDetail,
  FlowMapEdge,
  FlowMapNode,
  FlowKey,
} from "@/lib/types";

export const FLOW_VISUAL_ORDER: FlowKey[] = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8"];

export const flowCloudSlots: Record<FlowKey, { x: number; y: number; drift: number }> = {
  F1: { x: 15, y: 27, drift: 8 },
  F2: { x: 34, y: 23, drift: 11 },
  F3: { x: 53, y: 29, drift: 9 },
  F4: { x: 71, y: 23, drift: 10 },
  F5: { x: 28, y: 67, drift: 12 },
  F6: { x: 49, y: 74, drift: 8 },
  F7: { x: 67, y: 67, drift: 10 },
  F8: { x: 84, y: 53, drift: 9 },
};

export const flowKeywordByKey: Record<FlowKey, string> = {
  F1: "tarifas",
  F2: "reserva cancha",
  F3: "reagendar",
  F4: "cancelar",
  F5: "clase particular",
  F6: "academia",
  F7: "torneos",
  F8: "escalar humano",
};

export const categoryCloudAnchors = {
  reserva: { x: 38, y: 14 },
  consulta: { x: 36, y: 86 },
  escalamiento: { x: 76, y: 62 },
  reagenda: { x: 68, y: 13 },
} as const;

function cleanStepTitle(raw: string) {
  return raw.replace(/^PASO\s+\d+\s*:\s*/i, "").trim();
}

function snippet(value: string, max = 72) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function sortableFlowList(flows: FlowDefinition[]) {
  const byKey = new Map(flows.map((flow) => [flow.key, flow]));
  return FLOW_VISUAL_ORDER.map((key) => byKey.get(key)).filter(
    (flow): flow is FlowDefinition => Boolean(flow),
  );
}

function summarizeStep(step: FlowDefinition["steps"][number]) {
  const counts = {
    text: 0,
    table: 0,
    decision: 0,
    rule: 0,
    message: 0,
  };

  step.blocks.forEach((block) => {
    if (block.type === "text") counts.text += 1;
    if (block.type === "table") counts.table += 1;
    if (block.type === "decision") counts.decision += 1;
    if (block.type === "rule") counts.rule += 1;
    if (block.type === "message") counts.message += 1;
  });

  const parts: string[] = [];
  if (counts.text > 0) parts.push(`${counts.text} instrucción`);
  if (counts.table > 0) parts.push(`${counts.table} tabla${counts.table > 1 ? "s" : ""}`);
  if (counts.decision > 0) parts.push(`${counts.decision} decisión`);
  if (counts.rule > 0) parts.push(`${counts.rule} regla${counts.rule > 1 ? "s" : ""}`);
  if (counts.message > 0) parts.push(`${counts.message} mensaje`);

  return parts.length > 0 ? parts.join(" · ") : "Detalle operativo";
}

function estimateHeight(kind: FlowMapNode["kind"], subtitle: string) {
  const baseByKind: Record<FlowMapNode["kind"], number> = {
    start: 126,
    step: 108,
    decision: 112,
    rule: 108,
    table: 108,
    message: 108,
    finish: 116,
  };

  const charsPerLine = kind === "start" || kind === "finish" ? 56 : 44;
  const lineCount = Math.max(1, Math.ceil(subtitle.length / charsPerLine));
  const clampedLines = Math.min(kind === "start" || kind === "finish" ? 4 : 3, lineCount);
  return baseByKind[kind] + (clampedLines - 1) * 18;
}

export function createFlowMindMapDetail(flow: FlowDefinition): FlowMapDetail {
  const nodes: FlowMapNode[] = [];
  const edges: FlowMapEdge[] = [];
  const mapWidth = 1380;
  const topY = 130;
  const baseStepY = 350;
  const rowGap = 250;
  const columns = [270, 690, 1110];
  const stepWidth = 400;

  const startSubtitle = snippet(flow.context, 168);
  nodes.push({
    id: "start",
    flowKey: flow.key,
    kind: "start",
    title: "Inicio",
    subtitle: startSubtitle,
    x: mapWidth / 2,
    y: topY,
    width: 560,
    height: estimateHeight("start", startSubtitle),
  });

  flow.steps.forEach((step, stepIndex) => {
    const row = Math.floor(stepIndex / columns.length);
    const col = stepIndex % columns.length;
    const snakeCol = row % 2 === 0 ? col : columns.length - 1 - col;
    const x = columns[snakeCol];
    const y = baseStepY + row * rowGap;
    const stepNodeId = `step-${step.id}`;
    const hasDecision = step.blocks.some((block) => block.type === "decision");
    const kind: FlowMapNode["kind"] = hasDecision ? "decision" : "step";
    const stepSubtitle = `${snippet(cleanStepTitle(step.title), 78)} · ${summarizeStep(step)}`;

    nodes.push({
      id: stepNodeId,
      flowKey: flow.key,
      kind,
      title: `Paso ${step.id}`,
      subtitle: stepSubtitle,
      x,
      y,
      width: stepWidth,
      height: estimateHeight(kind, stepSubtitle),
      stepId: step.id,
    });

    if (stepIndex === 0) {
      edges.push({
        id: `${flow.key}-start-${step.id}`,
        from: "start",
        to: stepNodeId,
      });
      return;
    }

    const prevStep = flow.steps[stepIndex - 1];
    edges.push({
      id: `${flow.key}-step-${prevStep.id}-${step.id}`,
      from: `step-${prevStep.id}`,
      to: stepNodeId,
    });
  });

  const rowCount = Math.max(1, Math.ceil(flow.steps.length / columns.length));
  const finishY = baseStepY + rowCount * rowGap + 40;
  const finishSubtitle = snippet(flow.finish, 170);

  nodes.push({
    id: "finish",
    flowKey: flow.key,
    kind: "finish",
    title: "Fin del flujo",
    subtitle: finishSubtitle,
    x: mapWidth / 2,
    y: finishY,
    width: 520,
    height: estimateHeight("finish", finishSubtitle),
  });

  if (flow.steps.length > 0) {
    const lastStep = flow.steps[flow.steps.length - 1];
    edges.push({
      id: `${flow.key}-last-${lastStep.id}-finish`,
      from: `step-${lastStep.id}`,
      to: "finish",
    });
  } else {
    edges.push({ id: `${flow.key}-start-finish`, from: "start", to: "finish" });
  }

  return {
    flowKey: flow.key,
    width: mapWidth,
    height: finishY + 220,
    nodes,
    edges,
  };
}

export function getOrderedFlows(flows: FlowDefinition[]) {
  return sortableFlowList(flows);
}
