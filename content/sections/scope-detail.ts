export interface ScopeModeRow {
  mode: string;
  description: string;
  appliesWhen: string;
}

export interface ScopeIntentRow {
  id: number;
  signals: string[];
  assignedFlow: string;
}

export interface ScopeEscalationRow {
  requestType: string;
  owner: string;
  eta: string;
  escalationChannel: string;
}

export const scopeDetail = {
  sectionLabel: "▌ SECCIÓN 03 · SCOPE DEL AGENTE",
  title: "El agente: qué hace y qué no hace",
  summary:
    "Definición operativa del alcance del agente de WhatsApp, modos de operación, intenciones detectadas y reglas de escalamiento.",
  inScope: [
    "Reservas de canchas de tenis y pádel (vía EasyCancha)",
    "Reservas de clases particulares con entrenador",
    "Cancelación o modificación de reservas",
    "Consultas de precios y promociones vigentes",
    "Información general sobre torneos",
    "Información inicial sobre academias con escalamiento a Willy",
    "Escalamiento a humano para excepciones y quejas",
    "Atención fuera de horario (24/7) con notificación al equipo",
  ],
  outOfScope: [
    "Gestión de inscripciones a academias (solo Willy)",
    "Control y consulta de saldos de paquetes (solo Luisa)",
    "Registro de pagos o cobros directos",
    "Generación de informes gerenciales",
    "Gestión de bloqueos de canchas",
    "Comunicación interna entre el personal",
    "Administración del sistema EasyCancha",
  ],
  modes: [
    {
      mode: "Autónomo 24/7",
      description:
        "El agente resuelve la conversación completa sin intervención humana.",
      appliesWhen:
        "Reservas estándar · Precios · Cancelaciones en política · Info torneos · Info inicial academias",
    },
    {
      mode: "Escalamiento asistido",
      description:
        "Recopila información y transfiere al agente humano con resumen del contexto.",
      appliesWhen: "Academias · Excepciones de precio · Quejas · Clientes VIP",
    },
    {
      mode: "Fuera de horario",
      description:
        "Opera sin restricción. Escalamientos se notifican por email para siguiente turno.",
      appliesWhen:
        "Cualquier conversación fuera del horario operativo del centro",
    },
  ] satisfies ScopeModeRow[],
  intentMap: [
    {
      id: 1,
      signals: ["quiero reservar", "hay canchas disponibles"],
      assignedFlow: "Flujo 2: Reserva de Cancha",
    },
    {
      id: 2,
      signals: [
        "clase con entrenador",
        "clases de pádel",
        "quiero clases de tenis",
      ],
      assignedFlow: "Flujo 5: Reserva de Clase Particular",
    },
    {
      id: 3,
      signals: ["cancelar", "no puedo ir", "anular mi reserva"],
      assignedFlow: "Flujo 4: Cancelación",
    },
    {
      id: 4,
      signals: ["quiero cambiar mi reserva", "necesito reagendar"],
      assignedFlow: "Flujo 3: Re-agendamiento",
    },
    {
      id: 5,
      signals: ["cuánto cuesta", "tarifas", "precio", "promoción"],
      assignedFlow: "Flujo 1: Información de Precios",
    },
    {
      id: 6,
      signals: ["torneos", "hay algún torneo", "inscribir torneo"],
      assignedFlow: "Flujo 7: Información de Torneos",
    },
    {
      id: 7,
      signals: ["academia", "clases para niños", "mi hijo", "inscripción"],
      assignedFlow: "Flujo 6: Escalamiento Academia",
    },
    {
      id: 8,
      signals: [
        "problema",
        "error",
        "quiero hablar con alguien",
        "no me cobraron bien",
      ],
      assignedFlow: "Flujo 8: Escalamiento Humano",
    },
  ] satisfies ScopeIntentRow[],
  escalationMap: [
    {
      requestType: "Academia / inscripción",
      owner: "Willy",
      eta: "A la brevedad",
      escalationChannel: "WhatsApp Academias",
    },
    {
      requestType: "Saldo de paquetes de clases",
      owner: "Luisa",
      eta: "Dentro del horario",
      escalationChannel: "WhatsApp de reservas",
    },
    {
      requestType: "Queja / reclamo",
      owner: "Luisa",
      eta: "A la brevedad",
      escalationChannel: "Email CDAF",
    },
    {
      requestType: "Cancelación tardía con cobro",
      owner: "Agente de turno",
      eta: "Lo antes posible",
      escalationChannel: "WhatsApp de reservas",
    },
    {
      requestType: "Excepción de precio / política",
      owner: "Luisa",
      eta: "Dentro del horario",
      escalationChannel: "WhatsApp de reservas",
    },
    {
      requestType: "Inscripción a torneo",
      owner: "Willy",
      eta: "A la brevedad",
      escalationChannel: "WhatsApp Academias",
    },
    {
      requestType: "Precio pendiente de confirmar",
      owner: "Agente de turno",
      eta: "A la brevedad",
      escalationChannel: "WhatsApp de reservas",
    },
  ] satisfies ScopeEscalationRow[],
} as const;
