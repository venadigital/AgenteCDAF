import type { FlowSectionDetail } from "@/lib/types";

export const flujosDetail: FlowSectionDetail = {
  sectionLabel: "▌ SECCIÓN 04 · FLUJOS DE CONVERSACIÓN",
  title: "Los 8 flujos del agente",
  summary:
    "Cada flujo describe paso a paso cómo el agente conduce la conversación: qué pregunta, qué valida, qué mensajes envía y cuándo escala.",
  flows: [
    {
      key: "F2",
      title: "Flujo 2 · Reserva de Cancha (Juego Libre)",
      shortTitle: "Reserva de Cancha",
      category: "reserva",
      context:
        "Aplica cuando el cliente quiere reservar una cancha de tenis o pádel para jugar libremente, sin entrenador. El agente verifica disponibilidad en EasyCancha, informa precio y condiciones, y confirma la reserva.",
      tags: ["EasyCancha", "Juego libre", "Reserva"],
      typicalSignals: ["quiero reservar", "hay canchas disponibles"],
      steps: [
        {
          id: 1,
          title: "PASO 1: Identificar deporte",
          blocks: [
            {
              type: "text",
              paragraphs: [
                "Si el cliente no especifica, el agente pregunta: ¿Qué deporte te interesa? ¿Tenis o Pádel? 🎾",
              ],
            },
          ],
        },
        {
          id: 2,
          title: "PASO 2: Capturar datos de la reserva",
          blocks: [
            {
              type: "table",
              title: "Datos obligatorios",
              columns: ["Dato", "¿Obligatorio?", "Cómo lo obtiene el agente"],
              rows: [
                ["Deporte", "Sí", "Paso anterior o confirmación del cliente."],
                ["Fecha y hora", "Sí", "¿Para qué día y hora te interesa reservar?"],
                ["Duración", "Sí", "¿Por cuánto tiempo? 1 hora, 1,5 horas o 2 horas."],
                [
                  "N.° de jugadores",
                  "Sí",
                  "¿Cuántos jugadores serán? (determina sencillos/dobles en tenis)",
                ],
                [
                  "Correo / teléfono",
                  "Solo primera vez",
                  "Si el cliente es nuevo y no está registrado en EasyCancha.",
                ],
              ],
            },
          ],
        },
        {
          id: 3,
          title: "PASO 3: Verificar disponibilidad en EasyCancha",
          blocks: [
            {
              type: "decision",
              question: "¿Hay disponibilidad en el horario solicitado?",
              yesLabel: "Sí hay disponibilidad",
              yesOutcome: ["Continúa al Paso 4 — Precio y condiciones."],
              noLabel: "No hay disponibilidad",
              noOutcome: [
                "El agente ofrece hasta 3 alternativas de horario cercano.",
                "Si el cliente no acepta ninguna: fin del flujo sin reserva.",
                'Mensaje: "Lo siento, ese horario no está disponible. Estos son los más cercanos: [opciones]. ¿Alguno te funciona?"',
              ],
            },
          ],
        },
        {
          id: 4,
          title: "PASO 4: Informar precio y condiciones especiales",
          blocks: [
            {
              type: "table",
              title: "Condiciones y mensaje operativo",
              columns: ["Condición especial", "Qué comunica el agente"],
              rows: [
                [
                  "Cancha Pádel 4 (descubierta)",
                  "Ten en cuenta que esta cancha es descubierta. En caso de lluvia la reserva se cancela sin cobro. Te recomendamos confirmar el clima antes de asistir.",
                ],
                [
                  "Promo L–V 8:00–16:00 pádel",
                  "Hay una promo disponible: 1,5 horas al precio de 1 hora ($100.000). ¿La tomamos?",
                ],
                [
                  "Promo fin semana >13:00 pádel",
                  "La tarifa de tarde de fin de semana es $80.000 + una bebida incluida (cerveza o Gatorade).",
                ],
                [
                  "Política de cancelación (siempre)",
                  "Recuerda que para cancelar sin penalidad necesitas avisar con al menos 3 horas de anticipación.",
                ],
              ],
            },
            {
              type: "decision",
              question: "¿El cliente confirma la reserva?",
              yesLabel: "Sí confirma",
              yesOutcome: ["Continúa al Paso 5 — Registro."],
              noLabel: "No confirma",
              noOutcome: [
                'Fin del flujo. "De acuerdo, quedamos a disposición para cuando lo necesites. 🎾"',
              ],
            },
          ],
        },
        {
          id: 5,
          title: "PASO 5: Registrar la reserva en EasyCancha",
          blocks: [
            {
              type: "rule",
              tone: "info",
              text: "La reserva queda en estado 'Pago Pendiente'. El pago se realiza en recepción al llegar. El cliente puede pagar anticipado por transferencia o app EasyCancha.",
            },
          ],
        },
        {
          id: 6,
          title: "PASO 6: Enviar confirmación al cliente",
          blocks: [
            {
              type: "message",
              title: "Mensaje de confirmación — Cancha libre",
              lines: [
                "✅ ¡Tu reserva está confirmada!",
                "📅 Fecha: [DÍA, FECHA]",
                "🕐 Hora: [HORA INICIO – HORA FIN]",
                "🎾 Deporte: [TENIS / PÁDEL]",
                "📍 Servicio: Cancha libre",
                "💰 Precio: $[MONTO]",
                "💳 Estado de pago: Pago pendiente (se realiza en recepción)",
                "Recuerda que si necesitas cancelar, avísanos con al menos 3 horas de anticipación. ¡Hasta pronto!",
              ],
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Reserva creada y confirmada",
    },
    {
      key: "F5",
      title: "Flujo 5 · Reserva de Clase Particular con Entrenador",
      shortTitle: "Clase Particular",
      category: "reserva",
      context:
        "Aplica cuando el cliente quiere reservar una clase con un entrenador de tenis o pádel. El agente debe verificar SIMULTÁNEAMENTE la disponibilidad del profesor Y de la cancha (match obligatorio). Es el flujo más complejo y el más crítico para el ingreso del centro.",
      tags: ["Crítico", "Match profesor+cancha", "EasyCancha"],
      typicalSignals: [
        "clase con entrenador",
        "clases de pádel",
        "quiero clases de tenis",
      ],
      steps: [
        {
          id: 1,
          title: "PASO 1: Identificar deporte, personas y preferencia de entrenador",
          blocks: [
            {
              type: "table",
              title: "Datos a capturar",
              columns: ["Dato a capturar", "Opciones y reglas"],
              rows: [
                ["Deporte", "Tenis o Pádel. Si no lo especifica, el agente pregunta."],
                ["N.° de personas", "1, 2, 3 o 4 personas. Determina la tarifa de grupo."],
                [
                  "Preferencia de entrenador",
                  "Si no hay preferencia, el agente ofrece los disponibles. NUNCA ofrecer a Willy ni a Charly, Mauricio, Sebastián o Alejo (alto rendimiento).",
                ],
                [
                  "Fecha y hora",
                  "El agente verifica anticipación mínima: 2 horas para clases.",
                ],
                [
                  "Duración",
                  "1 hora estándar. Bloques de 2h a doble precio. Sin clases pádel domingos. Sábados solo hasta 13:00.",
                ],
              ],
            },
            {
              type: "rule",
              tone: "critical",
              text: "REGLA CRÍTICA: No ofrecer nunca clases con Willy (pádel) ni con Charly, Mauricio, Sebastián o Alejo (alto rendimiento). Dayron solo para horarios nocturnos.",
            },
          ],
        },
        {
          id: 2,
          title: "PASO 2: Verificar disponibilidad — MATCH: profesor + cancha simultáneos",
          blocks: [
            {
              type: "rule",
              tone: "info",
              text: "El agente consulta EasyCancha verificando que el entrenador esté disponible Y que haya cancha libre en ese mismo horario. EasyCancha realiza este mapeo internamente: presenta las combinaciones válidas de profesor + cancha. El agente trabaja con lo que la API devuelve.",
            },
            {
              type: "decision",
              question: "¿Hay match de disponibilidad (entrenador + cancha al mismo tiempo)?",
              yesLabel: "Sí hay match",
              yesOutcome: ["Continúa al Paso 3 — Precio y confirmación."],
              noLabel: "No hay match",
              noOutcome: [
                "El agente busca alternativas: otro horario con el mismo entrenador, o mismo horario con otro entrenador.",
                "Si no hay alternativa viable, ofrece la disponibilidad más cercana con el profesor pedido o con otro disponible.",
              ],
            },
          ],
        },
        {
          id: 3,
          title: "PASO 3: Comunicar precio, entrenador y condiciones",
          blocks: [
            {
              type: "table",
              title: "Tarifario por entrenador",
              columns: ["Entrenador", "Tarifa 1p", "2p", "3p", "4p"],
              rows: [
                ["PÁDEL — Joaquín / Leo (oferta estándar)", "$130.000", "$180.000", "$220.000", "$280.000"],
                [
                  "TENIS — Graciano / Jorge (alta experiencia)",
                  "$110.000",
                  "$140.000",
                  "$180.000",
                  "$220.000",
                ],
                ["TENIS — Cristian (experiencia media)", "$80.000", "$120.000", "$150.000", "—"],
                ["TENIS — Dayron (solo nocturno)", "$90.000", "Consultar", "Consultar", "—"],
              ],
            },
            {
              type: "rule",
              tone: "info",
              text: "Si el cliente pregunta por la diferencia de precio entre Cristian y Graciano/Jorge, el agente explica que corresponde a la diferencia de experiencia entre los entrenadores.",
            },
            {
              type: "decision",
              question: "¿El cliente confirma la reserva?",
              yesLabel: "Sí confirma",
              yesOutcome: ["Continúa al Paso 4 — Registro y confirmación."],
              noLabel: "No confirma",
              noOutcome: [
                'Fin del flujo. "Sin problema, quedo disponible para cuando necesites. ¡Hasta pronto! 🎾"',
              ],
            },
          ],
        },
        {
          id: 4,
          title: "PASO 4: Registrar y confirmar",
          blocks: [
            {
              type: "message",
              title: "Mensaje de confirmación — Clase particular",
              lines: [
                "✅ ¡Tu clase está confirmada!",
                "📅 Fecha: [DÍA, FECHA]",
                "🕐 Hora: [HORA INICIO – HORA FIN]",
                "🎾 Deporte: [TENIS / PÁDEL]",
                "👨‍🏫 Entrenador: [NOMBRE]",
                "👥 Personas: [N]",
                "💰 Precio total: $[MONTO]",
                "💳 Estado de pago: Pago pendiente (en recepción)",
                "Si necesitas cancelar, hazlo con mínimo 3 horas de anticipación para evitar el cobro de la clase. ¡Te esperamos!",
              ],
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Clase registrada y confirmada",
    },
    {
      key: "F4",
      title: "Flujo 4 · Gestión de Cancelaciones",
      shortTitle: "Cancelaciones",
      category: "reserva",
      context:
        "Aplica cuando el cliente notifica que no podrá asistir a una reserva. El agente determina si aplica penalidad según la política, libera el espacio en EasyCancha y confirma al cliente.",
      tags: ["Política 3 horas", "Penalidad", "EasyCancha"],
      typicalSignals: ["cancelar", "no puedo ir", "anular mi reserva"],
      steps: [
        {
          id: 1,
          title: "PASO 1: Identificar la reserva a cancelar",
          blocks: [
            {
              type: "text",
              paragraphs: [
                'El agente pregunta: "¿Cuál es tu correo electrónico y qué reserva deseas cancelar? (Deporte, fecha y hora)."',
                "Valida en EasyCancha las reservas asociadas al correo del usuario y confirma titularidad antes de cancelar.",
              ],
            },
          ],
        },
        {
          id: 2,
          title: "PASO 2: Calcular el tiempo de anticipación",
          blocks: [
            {
              type: "decision",
              question: "¿La cancelación se hace con 3 horas o más de anticipación?",
              yesLabel: "Sí — 3h o más de anticipación",
              yesOutcome: [
                "Sin penalidad. Cancela en EasyCancha.",
                'Confirma al cliente: "Hemos cancelado tu reserva de [deporte] del [fecha] a las [hora]. No hay cobro por cancelación. ¡Hasta la próxima! 🎾"',
              ],
              noLabel: "No — menos de 3h / no-show",
              noOutcome: [
                "Aplica penalidad según política.",
                'El agente informa y ESCALA al agente humano para gestión del cobro: "Tu cancelación fue recibida, pero se realizó con menos de 3 horas de anticipación. Un miembro del equipo te contactará."',
              ],
            },
            {
              type: "rule",
              tone: "critical",
              text: "REGLA CRÍTICA: La aplicación de la penalidad (cobro efectivo) es gestionada por el agente humano, no por el agente de IA. El agente solo informa y registra la cancelación.",
            },
          ],
        },
        {
          id: 3,
          title: "PASO 3: Casos especiales de cancelación sin penalidad",
          blocks: [
            {
              type: "table",
              title: "Casos especiales",
              columns: ["Caso especial", "Respuesta del agente"],
              rows: [
                [
                  "Lluvia en Cancha Pádel 4 (descubierta)",
                  "Lamentablemente la cancha 4 de pádel es descubierta y no es posible usarla en condiciones de lluvia. Tu reserva fue cancelada sin cobro. Puedes reagendar cuando gustes.",
                ],
                [
                  "El entrenador no puede asistir",
                  "Tu clase fue cancelada porque [entrenador] no puede asistir hoy. No hay cobro. ¿Quieres que te ayudemos a reprogramar?",
                ],
              ],
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Cancelación registrada y cliente informado",
    },
    {
      key: "F1",
      title: "Flujo 1 · Consulta de Precios e Información General",
      shortTitle: "Precios e Información",
      category: "consulta",
      context:
        "Aplica para consultas de tarifas, horarios o condiciones del servicio. No requiere integración con EasyCancha. El agente responde directamente con la información documentada.",
      tags: ["Tarifario", "Horarios", "Sin integración"],
      typicalSignals: ["cuánto cuesta", "tarifas", "precio", "promoción"],
      steps: [
        {
          id: 1,
          title: "PASO 1: Identificar el tipo de consulta y responder",
          blocks: [
            {
              type: "table",
              title: "Alquiler de canchas de pádel",
              columns: [
                "Duración",
                "L–V precio base",
                "Promo L–V 8:00–16:00",
                "Fin semana <13h",
                "Fin semana >13h",
              ],
              rows: [
                ["1 hora", "$100.000", "$100.000", "$100.000", "$80.000 + bebida"],
                ["1,5 horas", "$150.000", "$100.000 ✨", "$150.000", "Por confirmar"],
                ["2 horas", "$150.000", "$150.000", "$150.000", "Por confirmar"],
                ["Franja premium 7–8 AM", "$150.000", "—", "$150.000", "—"],
              ],
            },
            {
              type: "table",
              title: "Alquiler de canchas de tenis",
              columns: ["Modalidad", "Jugadores", "Precio L–V", "Fin semana >13h"],
              rows: [
                ["Sencillos", "2", "$70.000/hora", "$50.000/hora"],
                ["Dobles", "4", "$95.000/hora", "$95.000/hora"],
              ],
            },
            {
              type: "table",
              title: "Clases particulares de pádel",
              columns: ["Entrenador", "1 persona", "2 personas", "3 personas", "4 personas"],
              rows: [["Joaquín / Leo", "$130.000", "$180.000", "$220.000", "$280.000"]],
            },
            {
              type: "table",
              title: "Clases particulares de tenis",
              columns: ["Entrenador", "1 persona", "2 personas", "3 personas", "4 personas"],
              rows: [
                ["Graciano / Jorge (alta exp.)", "$110.000", "$140.000", "$180.000", "$220.000"],
                ["Cristian (exp. media)", "$80.000", "$120.000", "$150.000", "—"],
                ["Dayron (solo nocturno)", "$90.000", "Consultar", "Consultar", "Consultar"],
              ],
            },
            {
              type: "table",
              title: "Horarios de operación",
              columns: ["Día", "Apertura", "Cierre", "Último turno", "Notas"],
              rows: [
                [
                  "Lunes a Viernes",
                  "7:00 AM",
                  "9:30 PM",
                  "8:30–9:30 PM",
                  "Academia: bloqueos 3:00–6:30 PM en canchas de tenis y pádel.",
                ],
                [
                  "Sábados",
                  "7:00 AM",
                  "9:30 PM",
                  "8:30–9:30 PM",
                  "Academia tenis mañana. Sin academia pádel. Clases pádel solo hasta 13:00.",
                ],
                [
                  "Domingos y Festivos",
                  "8:00 AM",
                  "7:00 PM",
                  "6:00–7:00 PM",
                  "Sin clases de pádel. Sin academia. Horario reducido.",
                ],
              ],
            },
            {
              type: "rule",
              tone: "critical",
              text: "REGLA CRÍTICA: NUNCA confirmar precios de 1,5h o 2h de pádel en fin de semana después de las 13:00 — están pendientes de confirmación por gerencia.",
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Consulta resuelta",
    },
    {
      key: "F7",
      title: "Flujo 7 · Información de Torneos",
      shortTitle: "Torneos",
      category: "consulta",
      context:
        "Aplica cuando el cliente pregunta por torneos actuales, próximos o por cómo inscribirse. El agente brinda la información disponible y cuando no existe calendario formalizado, informa y ofrece ser contactado cuando haya novedades.",
      tags: ["Torneos", "Interés", "Escalamiento F8"],
      typicalSignals: ["torneos", "hay algún torneo", "inscribir torneo"],
      steps: [
        {
          id: 1,
          title: "Evaluar disponibilidad de torneo",
          blocks: [
            {
              type: "decision",
              question: "¿Hay un torneo activo o próximo con información confirmada?",
              yesLabel: "Sí hay torneo",
              yesOutcome: [
                "El agente proporciona: nombre, fecha, modalidad, precio de inscripción, deporte y cómo inscribirse.",
                "Ofrece registrar el interés si la inscripción no está aún abierta.",
              ],
              noLabel: "No hay torneo activo",
              noOutcome: [
                "En este momento no tenemos un torneo programado, pero solemos organizarlos con frecuencia. ¿Te gustaría que te avisemos cuando anunciemos el próximo?",
                "Si el cliente dice sí: registra nombre y deporte de interés y notifica al equipo para incluirlo en lista de difusión.",
              ],
            },
            {
              type: "rule",
              tone: "info",
              text: "El agente NO gestiona inscripciones formales a torneos. Si el cliente manifiesta interés en inscribirse, escala inmediatamente al equipo humano (Flujo 8) con el resumen del torneo y datos del cliente.",
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Información entregada o interés registrado",
    },
    {
      key: "F6",
      title: "Flujo 6 · Escalamiento — Consultas de Academia",
      shortTitle: "Escalamiento Academia",
      category: "escalamiento",
      context:
        "Aplica cuando el cliente pregunta por inscripción a academias deportivas para niños o jóvenes (4–16 años). Este proceso está FUERA del alcance del agente: la gestión la realiza exclusivamente Willy. El agente cualifica al prospecto y escala con un resumen estructurado.",
      tags: ["Academias", "Fuera de alcance", "Escalar a Willy"],
      typicalSignals: ["academia", "clases para niños", "mi hijo", "inscripción"],
      steps: [
        {
          id: 1,
          title: "PASO 1: Cualificar al prospecto con preguntas básicas",
          blocks: [
            {
              type: "rule",
              tone: "critical",
              text: "REGLA CRÍTICA: El agente NUNCA debe ofrecer disponibilidad de cupos, horarios ni precios de academia sin haber escalado a Willy. La disponibilidad es dinámica y solo Willy la conoce.",
            },
            {
              type: "table",
              title: "Preguntas de cualificación",
              columns: ["Pregunta del agente", "Por qué es necesaria"],
              rows: [
                [
                  "¿Cuántos años tiene el alumno?",
                  "Determina si aplica academia (4–16 años) o clase particular adulto.",
                ],
                [
                  "¿Qué deporte le interesa — tenis o pádel?",
                  "Willy necesita saber el deporte para evaluar disponibilidad.",
                ],
                [
                  "¿Tiene experiencia previa? ¿Cuánto tiempo lleva practicando?",
                  "Determina el nivel del grupo asignado.",
                ],
                [
                  "¿Qué días y horarios preferirías?",
                  "Willy verifica si esa disponibilidad coincide con los grupos activos.",
                ],
                [
                  "¿Con qué frecuencia semanal? ¿1, 2 o 3 veces por semana?",
                  "Determina cupo y grupo más adecuado.",
                ],
              ],
            },
            {
              type: "decision",
              question: "¿El alumno tiene más de 16 años o es adulto?",
              yesLabel: "Adulto (>16 años)",
              yesOutcome: [
                "No es academia. El agente redirige al Flujo 5 — Reserva de Clase Particular.",
                "Mensaje: Las academias son para niños y jóvenes de 4 a 16 años. Para adultos, tenemos clases particulares con entrenador. ¿Te cuento sobre esa opción?",
              ],
              noLabel: "Niño/joven (4–16 años)",
              noOutcome: ["Continúa el flujo de cualificación y escala a Willy."],
            },
          ],
        },
        {
          id: 2,
          title: "PASO 2: Informar y escalar a Willy",
          blocks: [
            {
              type: "message",
              title: "Mensaje al cliente",
              lines: [
                "¡Gracias por tu interés!",
                "Las academias del Centro Deportivo Alejandro Falla están sujetas a la disponibilidad de cupos de los diferentes grupos.",
                "Con la información que me compartiste, nuestro Coordinador Deportivo Willy te contactará directamente.",
                "Ten en cuenta que actualmente los cupos para principiantes están limitados, pero nos pondremos en contacto contigo a la brevedad.",
                "¿Me confirmas tu nombre completo y número de WhatsApp?",
              ],
            },
            {
              type: "message",
              title: "Resumen que el agente envía a Willy por email",
              lines: [
                "📋 NUEVO PROSPECTO ACADEMIA",
                "• Nombre contacto: [NOMBRE]",
                "• WhatsApp: [NÚMERO]",
                "• Alumno: [N] años",
                "• Deporte: [TENIS / PÁDEL]",
                "• Nivel: [PRINCIPIANTE / INTERMEDIO / etc.]",
                "• Días preferidos: [DÍAS]",
                "• Frecuencia: [1/2/3 veces por semana]",
              ],
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Prospecto cualificado y escalado a Willy",
    },
    {
      key: "F8",
      title: "Flujo 8 · Escalamiento Humano General",
      shortTitle: "Escalamiento Humano",
      category: "escalamiento",
      context:
        "Aplica cuando la conversación supera la capacidad del agente: quejas, errores en reservas, solicitudes de excepciones, saldo de paquetes o cualquier situación que requiera criterio humano. El agente no resuelve el problema — lo clasifica, lo documenta y lo transfiere con contexto completo.",
      tags: ["Transferencia", "Excepciones", "Humano"],
      typicalSignals: [
        "problema",
        "error",
        "quiero hablar con alguien",
        "no me cobraron bien",
      ],
      steps: [
        {
          id: 1,
          title: "PASO 1: Informar al cliente y solicitar datos si faltan",
          blocks: [
            {
              type: "table",
              title: "Situaciones que activan el escalamiento automático",
              columns: ["Situación", "Señales en la conversación"],
              rows: [
                [
                  "Queja o reclamo",
                  '"estoy molesto", "me cobraron mal", "no era lo que acordamos", "quiero hablar con alguien"',
                ],
                [
                  "Error en reserva existente",
                  '"mi reserva está mal", "hay un error en mi cita", "cambié de cancha"',
                ],
                [
                  "Consulta de saldo de paquetes",
                  '"cuántas clases me quedan", "mi saldo de clases", "mis clases restantes"',
                ],
                ["Solicitud de excepción", '"¿pueden hacer una excepción?", "¿me pueden dar descuento?", "caso especial"'],
                [
                  "Cancelación tardía con cobro",
                  "Detectado en Flujo 4 cuando hay menos de 3h de anticipación.",
                ],
                [
                  "Consulta fuera del conocimiento",
                  "Cualquier pregunta no cubierta por las reglas documentadas del agente.",
                ],
              ],
            },
            {
              type: "message",
              title: "Mensaje estándar de escalamiento",
              lines: [
                "Entiendo tu situación. Esta consulta la necesito escalar a uno de nuestros coordinadores para que te den la mejor atención.",
                "Te contactarán a la brevedad.",
                "¿Me confirmas tu nombre completo y que este número es el correcto para comunicarnos?",
              ],
            },
          ],
        },
        {
          id: 2,
          title: "PASO 2: Enviar resumen al agente humano correspondiente",
          blocks: [
            {
              type: "table",
              title: "Matriz de escalamiento",
              columns: ["Tipo de escalamiento", "Responsable", "Tiempo de respuesta"],
              rows: [
                [
                  "Saldo de paquetes de clases",
                  "Luisa (Coordinadora Administrativa)",
                  "Siguiente horario de atención",
                ],
                [
                  "Queja / reclamo",
                  "Luisa (mañana) / Tatiana (tarde)",
                  "Dentro del horario operativo o al inicio del siguiente turno",
                ],
                ["Cancelación tardía con cobro", "Agente de recepción de turno", "Lo antes posible"],
                ["Solicitud de excepción", "Luisa o gerencia (según nivel)", "Siguiente turno"],
              ],
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Cliente informado y caso transferido al equipo humano",
    },
    {
      key: "F3",
      title: "Flujo 3 · Re-agendamiento de Reserva",
      shortTitle: "Re-agendamiento",
      category: "reagenda",
      context:
        "Aplica cuando el cliente desea modificar la fecha u hora de una reserva ya existente. El agente identifica la reserva mediante el correo electrónico, verifica disponibilidad en el nuevo horario y ejecuta el cambio o ofrece alternativas.",
      tags: ["Cambio de horario", "EasyCancha", "Reserva existente"],
      typicalSignals: ["quiero cambiar mi reserva", "necesito reagendar"],
      steps: [
        {
          id: 1,
          title: "PASO 1: Identificar la reserva mediante correo electrónico",
          blocks: [
            {
              type: "text",
              paragraphs: [
                'El agente solicita el correo electrónico del usuario y lo utiliza para consultar sus reservas activas en EasyCancha. Pregunta: "¿Me puedes indicar tu correo electrónico registrado en EasyCancha para ubicar tu reserva?"',
                "Con el correo, obtiene la lista de reservas activas y le pide confirmar cuál desea modificar (deporte, fecha, hora).",
              ],
            },
          ],
        },
        {
          id: 2,
          title: "PASO 2: Capturar el nuevo horario deseado",
          blocks: [
            {
              type: "text",
              paragraphs: [
                'El agente pregunta: "¿Para qué nueva fecha y hora quieres mover tu reserva?"',
                "Aplican las mismas reglas de anticipación mínima (2 horas para canchas, 3 horas para clases).",
                "Si el nuevo horario no cumple la anticipación mínima, el agente informa y no procede.",
              ],
            },
          ],
        },
        {
          id: 3,
          title: "PASO 3: Verificar disponibilidad en EasyCancha para el nuevo horario",
          blocks: [
            {
              type: "decision",
              question: "¿Hay disponibilidad en el nuevo horario solicitado?",
              yesLabel: "Sí hay disponibilidad",
              yesOutcome: [
                "El agente cancela la reserva original en EasyCancha y crea la nueva reserva.",
                "Envía confirmación al cliente con el nuevo horario (mismo formato que en Flujos 2 y 5).",
              ],
              noLabel: "No hay disponibilidad",
              noOutcome: [
                "El agente ofrece hasta 3 alternativas de horario disponibles cercanas a la fecha solicitada.",
                "Si el cliente no acepta ninguna: la reserva original permanece sin cambios.",
                'Mensaje: "Tu reserva original de [deporte] el [fecha] a las [hora] se mantiene sin cambios. ¿Puedo ayudarte con algo más?"',
              ],
            },
          ],
        },
      ],
      finish: "🏁 FIN DEL FLUJO — Reserva re-agendada y cliente confirmado",
    },
  ],
};
