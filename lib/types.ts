export type SectionSlug =
  | "diagnostico"
  | "oportunidades"
  | "scope"
  | "flujos"
  | "reglas"
  | "limitaciones"
  | "prompt"
  | "decisiones";

export type SectionTheme =
  | "risk"
  | "opportunity"
  | "scope"
  | "flow"
  | "rules"
  | "tech"
  | "prompt"
  | "decision";

export type SectionStatus = "planned" | "in-progress" | "ready";

export type VisualSpec =
  | "mini-table"
  | "priority-bars"
  | "scope-split"
  | "flow-map"
  | "rule-grid"
  | "dependency-list"
  | "agent-card"
  | "decision-list";

export interface DocumentMeta {
  projectTitle: string;
  projectSubtitle: string;
  issuer: string;
  dateLabel: string;
  version: string;
}

export interface HeroContent {
  intro: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface SectionIndexItem {
  id: number;
  slug: SectionSlug;
  title: string;
  summary: string;
  theme: SectionTheme;
  status: SectionStatus;
  anchorId: string;
}

export interface SectionPreview {
  slug: SectionSlug;
  headline: string;
  highlights: string[];
  visualSpec: VisualSpec;
}

export interface RoadmapItem {
  slug: SectionSlug;
  label: string;
  order: number;
  status: SectionStatus;
}

export interface HomeContent {
  meta: DocumentMeta;
  hero: HeroContent;
  contentIndex: SectionIndexItem[];
  sectionPreviews: SectionPreview[];
  roadmap: RoadmapItem[];
}

export interface ThemeTokens {
  colors: {
    paper: string;
    paperAlt: string;
    court: string;
    courtSoft: string;
    ink: string;
    clay: string;
    accent: string;
    line: string;
    muted: string;
  };
  radii: {
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  shadows: {
    card: string;
    glow: string;
  };
}

export interface SectionPlaceholderContent {
  slug: SectionSlug;
  title: string;
  summary: string;
  status: SectionStatus;
  nextBuildFocus: string;
}

export type FlowKey = "F1" | "F2" | "F3" | "F4" | "F5" | "F6" | "F7" | "F8";

export type FlowCategory = "reserva" | "consulta" | "escalamiento" | "reagenda";

export type FlowRuleTone = "critical" | "info";

export interface FlowTextBlock {
  type: "text";
  title?: string;
  paragraphs: string[];
}

export interface FlowRuleBlock {
  type: "rule";
  tone: FlowRuleTone;
  text: string;
}

export interface FlowDecisionBlock {
  type: "decision";
  question: string;
  yesLabel?: string;
  yesOutcome: string[];
  noLabel?: string;
  noOutcome: string[];
}

export interface FlowTableBlock {
  type: "table";
  title: string;
  columns: string[];
  rows: string[][];
}

export interface FlowMessageBlock {
  type: "message";
  title: string;
  lines: string[];
}

export interface FlowFinishBlock {
  type: "finish";
  text: string;
}

export type FlowStepBlock =
  | FlowTextBlock
  | FlowRuleBlock
  | FlowDecisionBlock
  | FlowTableBlock
  | FlowMessageBlock
  | FlowFinishBlock;

export type FlowBlockType = FlowStepBlock["type"];

export interface FlowStep {
  id: number;
  title: string;
  blocks: FlowStepBlock[];
}

export interface FlowDefinition {
  key: FlowKey;
  title: string;
  shortTitle: string;
  category: FlowCategory;
  context: string;
  tags: string[];
  typicalSignals: string[];
  steps: FlowStep[];
  finish: string;
}

export interface FlowSectionDetail {
  sectionLabel: string;
  title: string;
  summary: string;
  flows: FlowDefinition[];
}

export type FlowNodeKind =
  | "start"
  | "step"
  | "decision"
  | "rule"
  | "table"
  | "message"
  | "finish";

export interface FlowMapNode {
  id: string;
  flowKey: FlowKey;
  kind: FlowNodeKind;
  title: string;
  subtitle?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  parentId?: string;
  stepId?: number;
  blockIndex?: number;
}

export interface FlowMapEdge {
  id: string;
  from: string;
  to: string;
  label?: string;
}

export interface FlowMapLayout {
  width: number;
  height: number;
  nodes: FlowMapNode[];
  edges: FlowMapEdge[];
}

export interface FlowMapDetail extends FlowMapLayout {
  flowKey: FlowKey;
}

export interface FlowMapSectionState {
  activeFlowKey: FlowKey;
  activeNodeId: string;
}

export type RuleCategoryKey = "tiempo" | "profesores" | "precios";

export type RuleSeverity = "critical" | "high" | "medium";

export interface BusinessRule {
  id: string;
  category: RuleCategoryKey;
  condition: string;
  rule: string;
  consequence: string;
  severity: RuleSeverity;
  controlTag: "bloqueante" | "validacion-humana" | "no-negociable";
}

export interface RuleCategory {
  key: RuleCategoryKey;
  title: string;
  sectionRef: string;
  summary: string;
  rules: BusinessRule[];
}

export interface RulesNoNegotiableItem {
  id: string;
  text: string;
}

export interface RuleQuickTableRow {
  id: string;
  rule: string;
  value: string;
  consequence: string;
}

export interface RulesSectionDetail {
  sectionLabel: string;
  title: string;
  summary: string;
  intro: string;
  categories: RuleCategory[];
  noNegotiablesTitle: string;
  noNegotiables: RulesNoNegotiableItem[];
  timeQuickTable: RuleQuickTableRow[];
}

export interface RuleMatrixState {
  activeCategory: RuleCategoryKey;
  activeRuleId: string;
}
