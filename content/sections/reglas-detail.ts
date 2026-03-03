import type { RulesSectionDetail } from "@/lib/types";

export const reglasDetail: RulesSectionDetail = {
  sectionLabel: "▌ SECCIÓN 05 · REGLAS DE NEGOCIO DEL AGENTE",
  title: "Reglas que el agente nunca puede ignorar",
  summary:
    "Matriz operativa de reglas críticas con impacto directo en disponibilidad, cumplimiento y precio. El agente debe aplicarlas sin excepción.",
  intro:
    "El agente aplica consistentemente todas las reglas de negocio documentadas en el As-Is. Estas reglas tienen mayor impacto operativo y no deben reinterpretarse.",
  categories: [
    {
      key: "tiempo",
      title: "5.1 Reglas de tiempo y anticipación",
      sectionRef: "5.1",
      summary:
        "Define límites de anticipación, tolerancias y restricciones horarias obligatorias para reservar canchas y clases.",
      rules: [
        {
          id: "R-5-1-1",
          category: "tiempo",
          condition: "Anticipación mínima — canchas",
          rule: "2 horas",
          consequence:
            "El agente NO procesa la reserva. Informa al cliente y ofrece horarios disponibles.",
          severity: "high",
          controlTag: "bloqueante",
        },
        {
          id: "R-5-1-2",
          category: "tiempo",
          condition: "Anticipación mínima — clases",
          rule: "3 horas",
          consequence:
            "El agente NO procesa la reserva. Informa y ofrece alternativas.",
          severity: "high",
          controlTag: "bloqueante",
        },
        {
          id: "R-5-1-3",
          category: "tiempo",
          condition: "Anticipación máxima de reserva",
          rule: "30 días",
          consequence:
            "No se aceptan reservas con más de 30 días de anticipación. Excepción: requiere aprobación de gerencia (escalar).",
          severity: "medium",
          controlTag: "validacion-humana",
        },
        {
          id: "R-5-1-4",
          category: "tiempo",
          condition: "Tolerancia de no-show",
          rule: "15 minutos",
          consequence:
            "Pasados 15 min sin llegada, el agente humano puede liberar la cancha.",
          severity: "medium",
          controlTag: "validacion-humana",
        },
        {
          id: "R-5-1-5",
          category: "tiempo",
          condition: "Sin clases de pádel — domingos",
          rule: "Restricción absoluta",
          consequence:
            "El agente informa que no hay clases de pádel los domingos y ofrece otros días.",
          severity: "critical",
          controlTag: "no-negociable",
        },
        {
          id: "R-5-1-6",
          category: "tiempo",
          condition: "Clases de pádel — sábados",
          rule: "Solo hasta las 13:00",
          consequence:
            "El agente no confirma clases de pádel los sábados después de las 13:00.",
          severity: "high",
          controlTag: "bloqueante",
        },
      ],
    },
    {
      key: "profesores",
      title: "5.2 Reglas sobre profesores y disponibilidad",
      sectionRef: "5.2",
      summary:
        "Restringe qué entrenadores se pueden ofrecer y obliga validación simultánea de profesor + cancha.",
      rules: [
        {
          id: "R-5-2-1",
          category: "profesores",
          condition: "MATCH obligatorio: profesor + cancha",
          rule:
            "El agente NUNCA confirma una clase si solo hay disponibilidad del profesor o solo disponibilidad de cancha.",
          consequence:
            "Ambas deben coincidir en el mismo horario para confirmar la clase.",
          severity: "critical",
          controlTag: "bloqueante",
        },
        {
          id: "R-5-2-2",
          category: "profesores",
          condition: "No ofrecer clases con Willy (pádel)",
          rule:
            "Willy no se ofrece proactivamente como entrenador.",
          consequence:
            "Solo puede aparecer en EasyCancha en horarios puntuales.",
          severity: "high",
          controlTag: "no-negociable",
        },
        {
          id: "R-5-2-3",
          category: "profesores",
          condition: "No ofrecer alto rendimiento",
          rule:
            "Charly, Mauricio, Sebastián y Alejo son exclusivos de alto rendimiento.",
          consequence:
            "No se mencionan ni ofrecen a clientes estándar.",
          severity: "critical",
          controlTag: "no-negociable",
        },
        {
          id: "R-5-2-4",
          category: "profesores",
          condition: "Dayron — solo nocturno",
          rule:
            "No se ofrece para horarios diurnos sin confirmación previa de disponibilidad.",
          consequence:
            "Si el cliente solicita horario diurno, debe proponerse otra opción o escalar validación.",
          severity: "high",
          controlTag: "bloqueante",
        },
        {
          id: "R-5-2-5",
          category: "profesores",
          condition: "Reserva a nombre del usuario real",
          rule:
            "La reserva debe quedar a nombre de quien va a usar el servicio, no de un tercero.",
          consequence:
            "Excepción: casos familiares puntuales, con validación del agente humano.",
          severity: "medium",
          controlTag: "validacion-humana",
        },
      ],
    },
    {
      key: "precios",
      title: "5.3 Reglas de precios — lo que el agente NUNCA debe hacer",
      sectionRef: "5.3",
      summary:
        "Prohibiciones absolutas de precio para evitar desalineación comercial y errores de promesa al cliente.",
      rules: [
        {
          id: "R-5-3-2",
          category: "precios",
          condition: "Paquetes de clases",
          rule:
            "Nunca informar que los paquetes de clases tienen descuento de precio.",
          consequence:
            "El beneficio es solo la garantía de horario, no un descuento monetario.",
          severity: "critical",
          controlTag: "no-negociable",
        },
        {
          id: "R-5-3-3",
          category: "precios",
          condition: "Descuentos adicionales",
          rule:
            "Nunca ofrecer descuentos adicionales a los de las promociones formales documentadas.",
          consequence:
            "Cualquier excepción requiere aprobación de gerencia.",
          severity: "critical",
          controlTag: "no-negociable",
        },
        {
          id: "R-5-3-4",
          category: "precios",
          condition: "Tarifas pendientes de gerencia",
          rule:
            "Nunca confirmar el precio de 1,5h o 2h de pádel en fin de semana tarde (>13:00).",
          consequence:
            "Esos valores están pendientes de confirmación por gerencia.",
          severity: "critical",
          controlTag: "no-negociable",
        },
      ],
    },
  ],
  noNegotiablesTitle: "Prohibiciones absolutas de precio",
  noNegotiables: [
    {
      id: "NN-2",
      text: "Nunca informar que los paquetes de clases tienen descuento de precio.",
    },
    {
      id: "NN-3",
      text: "Nunca ofrecer descuentos adicionales por fuera de promociones formales documentadas.",
    },
    {
      id: "NN-4",
      text: "Nunca confirmar precio de 1,5h o 2h de pádel fin de semana tarde (>13:00) sin confirmación de gerencia.",
    },
  ],
  timeQuickTable: [
    {
      id: "QT-1",
      rule: "Anticipación mínima — canchas",
      value: "2 horas",
      consequence:
        "El agente NO procesa la reserva. Informa al cliente y ofrece horarios disponibles.",
    },
    {
      id: "QT-2",
      rule: "Anticipación mínima — clases",
      value: "3 horas",
      consequence: "El agente NO procesa la reserva. Informa y ofrece alternativas.",
    },
    {
      id: "QT-3",
      rule: "Anticipación máxima de reserva",
      value: "30 días",
      consequence:
        "Más de 30 días requiere aprobación de gerencia (escalar).",
    },
    {
      id: "QT-4",
      rule: "Tolerancia de no-show",
      value: "15 minutos",
      consequence:
        "Pasados 15 min sin llegada, el agente humano puede liberar la cancha.",
    },
    {
      id: "QT-5",
      rule: "Sin clases de pádel — domingos",
      value: "Restricción absoluta",
      consequence: "No hay clases de pádel los domingos; ofrecer otros días.",
    },
    {
      id: "QT-6",
      rule: "Clases de pádel — sábados",
      value: "Solo hasta las 13:00",
      consequence:
        "No confirmar clases de pádel después de las 13:00.",
    },
  ],
} as const;
