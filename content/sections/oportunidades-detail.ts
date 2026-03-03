export type OpportunityPriority = "P1" | "P2" | "P3";

export interface OportunidadRow {
  id: string;
  priority: OpportunityPriority;
  stream: string;
  title: string;
  window: string;
  currentSituation: string;
  solutionImpact: string;
  impactScore: number;
  effortScore: number;
}

export interface PriorityDefinition {
  priority: OpportunityPriority;
  label: string;
  countDeclared: number;
  definition: string;
}

export const oportunidadesDetail = {
  sectionLabel: "▌ SECCIÓN 02 · OPORTUNIDADES",
  title: "Oportunidades de mejora",
  summary:
    "Mapa de oportunidades ancladas al diagnóstico para reducir pérdidas, aumentar velocidad operativa y habilitar crecimiento.",
  totals: {
    declared: 12,
    urgentDeclared: 5,
    documented: 8,
    missingIds: ["O5", "O8", "O9", "O12"],
  },
  priorityDefinitions: [
    {
      priority: "P1",
      label: "Crítica",
      countDeclared: 5,
      definition:
        "Pérdida de ingresos activa hoy o riesgo de continuidad operativa.",
    },
    {
      priority: "P2",
      label: "Alta",
      countDeclared: 4,
      definition: "Ineficiencias estructurales que escalan con el crecimiento.",
    },
    {
      priority: "P3",
      label: "Estratégica",
      countDeclared: 3,
      definition: "Diferencian al centro o abren nuevas líneas de ingreso.",
    },
  ] satisfies PriorityDefinition[],
  rows: [
    {
      id: "O1",
      priority: "P1",
      stream: "Comunicación",
      title: "Atención 24/7 con agente conversacional",
      window: "0–6 sem",
      currentSituation:
        "9–10 horas diarias sin cobertura. El mercado opera con consultas activas hasta las 11 PM. Mensajes sin respuesta = reservas perdidas.",
      solutionImpact:
        "Ventana 14h → 24h/7 días. Consultas sin respuesta: 30–40% → <5%. Tiempo de respuesta: variable → <30 seg. Carga Luisa: 100% → 20–30% (solo excepciones).",
      impactScore: 97,
      effortScore: 26,
    },
    {
      id: "O2",
      priority: "P1",
      stream: "Academias",
      title: "Centralización del conocimiento de academias",
      window: "0–2 sem",
      currentSituation:
        "Todo en el Excel local de Willy. Nadie puede responder si él no está. Riesgo legal con consentimientos en papel.",
      solutionImpact:
        "Fase 1: Google Sheets compartido (0–2 sem). Fase 2: digitalizar consentimientos (1–3 meses). Fase 3: sincronización con CRM (3–6 meses).",
      impactScore: 94,
      effortScore: 18,
    },
    {
      id: "O3",
      priority: "P1",
      stream: "Operaciones",
      title: "Protocolo formal de ausencias de profesores",
      window: "1–2 sem",
      currentSituation:
        "Cancelaciones sin aviso generan canchas bloqueadas sin uso y pérdida de ingreso por hora disponible.",
      solutionImpact:
        "Ausencia planificada: 8 días de anticipación. Ausencia urgente: antes del inicio del día.",
      impactScore: 89,
      effortScore: 14,
    },
    {
      id: "O4",
      priority: "P1",
      stream: "Administración",
      title: "Control digital de paquetes de clases",
      window: "2–6 sem",
      currentSituation:
        "Entrenadores olvidan registrar clases. Saldos inflados, consumo no pagado y conciliación reactiva.",
      solutionImpact:
        "Google Form al terminar sesión. Alerta automática si no se registra en 2h. Conciliación de Luisa: de reactiva a semanal.",
      impactScore: 87,
      effortScore: 28,
    },
    {
      id: "O6",
      priority: "P2",
      stream: "Administración",
      title: "Dashboard gerencial automático",
      window: "2–4 meses",
      currentSituation:
        "Luisa invierte 30–60 min diarios construyendo el informe manual. Sin ella, no existe. Datos con hasta 24h de retraso.",
      solutionImpact:
        "Dashboard automático (Looker Studio / Power BI): ocupación en tiempo real, ingresos del día, comparativo semanal e indicadores por profesor.",
      impactScore: 76,
      effortScore: 66,
    },
    {
      id: "O7",
      priority: "P2",
      stream: "Comunicación",
      title: "Unificación de canales de comunicación",
      window: "1–2 meses",
      currentSituation:
        "Múltiples números sin control ni trazabilidad, con agotamiento operativo del coordinador.",
      solutionImpact:
        "WhatsApp Business API con bandeja compartida (Responds.io / Kommo). Un único número con distribución interna.",
      impactScore: 74,
      effortScore: 52,
    },
    {
      id: "O10",
      priority: "P3",
      stream: "Crecimiento",
      title: "Calendario anual de torneos formalizado",
      window: "4–8 sem",
      currentSituation:
        "No existe calendario 2026 y la competencia mantiene torneos consistentes.",
      solutionImpact:
        "Mínimo 1 torneo bimestral (meta: 6/año). Inscripción digital con pago anticipado.",
      impactScore: 64,
      effortScore: 38,
    },
    {
      id: "O11",
      priority: "P3",
      stream: "Academias",
      title: "Lista de espera activa para academia",
      window: "1–2 sem",
      currentSituation:
        "No hay cupos para principiantes y tampoco un mecanismo para capturar interés de demanda.",
      solutionImpact:
        "Google Form de cualificación + Google Sheet como CRM básico. El agente dirige al formulario en lugar de cerrar la conversación.",
      impactScore: 62,
      effortScore: 16,
    },
  ] satisfies OportunidadRow[],
} as const;
