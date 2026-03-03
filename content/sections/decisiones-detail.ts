export interface DecisionItem {
  id: string;
  question: string;
  context: string;
  options?: string[];
}

export interface DecisionGroup {
  key: "A" | "B" | "C" | "D";
  title: string;
  decisions: DecisionItem[];
}

export const decisionesDetail = {
  sectionLabel: "▌ SECCIÓN 08 · DECISIONES PENDIENTES DE GERENCIA",
  title: "Decisiones pendientes de gerencia",
  summary:
    "Preguntas abiertas para Alejandro y Carolina. Estos puntos surgieron del análisis del As-Is. Son decisiones de negocio pendientes que afectan directamente la configuración del agente. Sin estas respuestas, el agente no puede operar correctamente en esos escenarios.",
  groups: [
    {
      key: "A",
      title: "Grupo A · Precios y Tarifas",
      decisions: [
        {
          id: "DECISIÓN 1",
          question:
            "¿Cuál es el precio de 1,5h y 2h de pádel los fines de semana después de las 13:00? ¿Aplica también la bebida incluida?",
          context:
            "Solo está confirmado el precio de 1 hora ($80.000 + bebida). El agente escala siempre estos valores. Con la decisión, puede resolverlo autónomamente.",
        },
        {
          id: "DECISIÓN 2",
          question:
            "¿Willy puede ser ofrecido como entrenador de pádel por el agente en algún caso?",
          context:
            "El As-Is indica que no se ofrece proactivamente, pero puede aparecer en EasyCancha. ¿Lo incluye o siempre lo excluye de la oferta?",
        },
        {
          id: "DECISIÓN 3",
          question:
            "Precio de clases de pádel con 2 horas — ¿se ofrece de forma estándar o solo si el cliente lo pide?",
          context:
            "El As-Is confirma que 2h = doble precio, pero son poco frecuentes. Define si el agente lo incluye en el menú o solo lo menciona si el cliente lo solicita.",
        },
      ],
    },
    {
      key: "B",
      title: "Grupo B · Flujo de Academias",
      decisions: [
        {
          id: "DECISIÓN 4",
          question: "¿El agente envía el PDF de academias antes de escalar a Willy?",
          context:
            "Esta es la decisión más importante para configurar el Flujo 6.",
          options: [
            "PDF primero y luego Willy.",
            "Cualificar con preguntas y derivar a Willy sin PDF.",
            "Cualificar con preguntas y, si confirma interés, enviar PDF y luego derivar.",
          ],
        },
        {
          id: "DECISIÓN 5",
          question:
            "Cuando un prospecto de academia pregunta '¿cuánto cuesta?', ¿qué debe responder el agente?",
          context: "Definir la respuesta estándar del agente antes del escalamiento.",
          options: [
            "Dar los precios exactos.",
            "Decir que Willy los comunica directamente.",
            "Enviar el PDF con los precios.",
          ],
        },
        {
          id: "DECISIÓN 6",
          question:
            "¿En cuánto tiempo máximo debe Willy contactar a un prospecto escalado? ¿El agente debe hacer seguimiento?",
          context:
            "Sin tiempo de respuesta definido ni mensaje de seguimiento. Define si el agente tiene rol activo post-escalamiento.",
        },
      ],
    },
    {
      key: "C",
      title: "Grupo C · Política de Cancelación",
      decisions: [
        {
          id: "DECISIÓN 7",
          question:
            "¿Se estandariza el cobro de penalidades de cancelación tardía desde el agente?",
          context:
            "La práctica real es que casi nunca se cobra.",
          options: [
            "El agente informa y el humano decide si cobrar.",
            "El agente gestiona el cobro directamente (requiere integración de pagos).",
          ],
        },
        {
          id: "DECISIÓN 8",
          question:
            "Cuando el centro cancela una reserva, ¿el agente debe ofrecer activamente reagendar?",
          context:
            "Definir comportamiento estándar del agente ante cancelación originada por el centro.",
          options: [
            "Solo informar la cancelación.",
            "Ofrecer nuevo horario disponible en ese momento.",
            "Escalar al equipo humano para la reprogramación.",
          ],
        },
      ],
    },
    {
      key: "D",
      title: "Grupo D · Operación y Configuración",
      decisions: [
        {
          id: "DECISIÓN 9",
          question: "¿Qué número de WhatsApp usará el agente? ¿Se consolida en uno solo?",
          context:
            "El agente requiere WhatsApp Business API en un único número. Esta es la primera decisión técnica que debe tomarse antes de cualquier implementación.",
        },
        {
          id: "DECISIÓN 10",
          question:
            "¿El agente puede informar sobre la existencia y beneficios de los paquetes de clases?",
          context:
            "Definir el nivel de autonomía comercial del agente en este frente.",
          options: [
            "El agente escala a Luisa directamente.",
            "Informa que la compra se hace en recepción.",
            "No menciona paquetes hasta que el cliente pregunta.",
          ],
        },
        {
          id: "DECISIÓN 11",
          question:
            "¿Cómo se notifica al equipo cuando el agente genera un escalamiento fuera del horario operativo?",
          context:
            "Sin este mecanismo, los escalamientos nocturnos se pueden perder igual que los mensajes actuales.",
          options: [
            "Mensaje al grupo de WhatsApp interno.",
            "Notificación en plataforma de gestión.",
            "Correo electrónico a la coordinadora.",
          ],
        },
      ],
    },
  ] satisfies DecisionGroup[],
  footer:
    "Centro Deportivo Alejandro Falla · Agente WhatsApp · PDR v1.0 | Vena Digital · Febrero 2026 · Para validación con gerencia",
} as const;
