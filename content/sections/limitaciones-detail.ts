export type DependencyState = "pending" | "decision" | "ready";

export interface TechnicalDependency {
  id: string;
  component: string;
  currentStatus: string;
  state: DependencyState;
  impact: string;
}

export const limitacionesDetail = {
  sectionLabel: "▌ SECCIÓN 06 · LIMITACIONES TÉCNICAS Y CONDICIONES DE OPERACIÓN",
  title: "Limitaciones técnicas y condiciones de operación",
  summary: "Dependencias y condiciones de operación.",
  dependencies: [
    {
      id: "LT-1",
      component: "API de EasyCancha",
      currentStatus: "⁉️ Contacto Mauricio para entender el funcionamiento de la API",
      state: "pending",
      impact:
        "El agente la utiliza para verificar disponibilidad en tiempo real, crear, modificar y cancelar reservas. La identificación del usuario se hace por correo electrónico registrado en EasyCancha.",
    },
    {
      id: "LT-2",
      component: "WhatsApp Business API",
      currentStatus: "⏳ Pendiente de configuración",
      state: "pending",
      impact:
        "Necesario para operar como agente 24/7 en número único del centro. Sin esta API el agente no puede desplegarse.",
    },
    {
      id: "LT-3",
      component: "Canal único de atención",
      currentStatus: "⏳ Pendiente de decisión gerencial",
      state: "decision",
      impact:
        "Se requiere consolidar todas las atenciones en un solo número antes de activar el agente. Los números actuales seguirán generando mensajes dispersos.",
    },
    {
      id: "LT-4",
      component: "Base de conocimiento (KB)",
      currentStatus: "✅ Construida sobre este PDR",
      state: "ready",
      impact:
        "El agente se entrena con las reglas, precios y flujos documentados aquí. Cambios en precios o políticas requieren actualización de la KB.",
    },
  ] satisfies TechnicalDependency[],
  unknownAnswerRule:
    "El agente opera bajo el principio de que es mejor escalar que improvisar. Ante cualquier consulta que no esté cubierta por las reglas documentadas, el agente aplica el Flujo 7 de Escalamiento Humano y transfiere la conversación al equipo con el contexto completo.",
  offHoursFlow: [
    "El agente opera las 24 horas.",
    "Los escalamientos generados fuera del horario operativo son registrados y enviados como notificación al canal interno del equipo.",
  ],
  offHoursMessageTitle: "💬  Mensaje fuera de horario",
  offHoursMessage:
    "Hemos recibido tu mensaje y nuestro equipo te contactará al inicio del siguiente horario de atención (desde las [HORA_APERTURA]). ¡Gracias por tu paciencia! 🙏",
} as const;

