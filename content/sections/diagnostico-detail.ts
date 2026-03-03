export type RiesgoSeverity = "CRÍTICO" | "ALTA";

export interface DiagnosticoTeamRow {
  role: string;
  names: string;
  primaryFunction: string;
}

export interface DiagnosticoSystemRow {
  system: string;
  currentUse: string;
  criticalLimitation: string;
}

export interface DiagnosticoTarifaRow {
  service: string;
  condition: string;
  price: string;
  notes: string;
  category:
    | "cancha-padel"
    | "cancha-tenis"
    | "clase-padel"
    | "clase-tenis";
  sport: "padel" | "tenis";
  priceMax: number | null;
}

export interface DiagnosticoRiskRow {
  severity: RiesgoSeverity;
  title: string;
  description: string;
}

export interface DiagnosticoDiscrepancyRow {
  topic: string;
  criticalForAgent?: boolean;
  luisa: string;
  willy: string;
}

export const diagnosticoDetail = {
  sectionLabel: "▌ SECCIÓN 01 · DIAGNÓSTICO",
  title: "Así opera el centro hoy",
  summary:
    "Levantamiento basado en entrevistas con Luisa (Coordinadora Administrativa) y Willy (Coordinador Deportivo). Todo ocurre de forma manual, sin integración entre sistemas.",
  teamRows: [
    {
      role: "Coordinadora Administrativa",
      names: "Luisa",
      primaryFunction:
        "Gestión manual de reservas, conciliación de paquetes, informes para gerencia. PUNTO NEURÁLGICO.",
    },
    {
      role: "Coordinador Deportivo",
      names: "Willy",
      primaryFunction:
        "Academias, bloqueos, torneos. Excel local = única fuente de verdad. SHADOW IT CRÍTICO.",
    },
    {
      role: "Recepción / Atención",
      names: "Tatiana · Mari · Juan Camilo",
      primaryFunction:
        "Atención directa en WhatsApp y presencial. Registran reservas en EasyCancha.",
    },
    {
      role: "Profesores Pádel",
      names: "Leo · Joaquín",
      primaryFunction:
        "Clases particulares. Registran sesiones en Excel compartido",
    },
    {
      role: "Profesores Tenis",
      names: "Graciano · Jorge · Cristian · Dayron",
      primaryFunction:
        "Clases particulares. Registran sesiones en Excel compartido Tarifas diferenciadas por experiencia. Dayron exclusivo nocturno.",
    },
    {
      role: "Área Contable",
      names: "Mary",
      primaryFunction: "Conciliación periódica de pagos en EasyCancha.",
    },
    {
      role: "Gerencia",
      names: "Alejandro · Carolina",
      primaryFunction:
        "Informes. Políticas, precios y aprobación de excepciones.",
    },
  ] satisfies DiagnosticoTeamRow[],
  systemsRows: [
    {
      system: "EasyCancha",
      currentUse:
        "Plataforma oficial de reservas. Verde=libre, Gris=bloqueado, Azul=pagado.",
      criticalLimitation: "Sin API documentada. Sin plan de contingencia ante caídas.",
    },
    {
      system: "Excel · Google Drive",
      currentUse:
        "Control de paquetes. Entrenadores registran manualmente cada clase.",
      criticalLimitation: "Alta tasa de error. Sin validaciones automáticas.",
    },
    {
      system: "Excel Willy (local)",
      currentUse:
        "Fuente de verdad para academias: cupos, grupos, horarios, inscripciones, consentimientos.",
      criticalLimitation: "Shadow IT: si Willy no está, nadie accede. Sin respaldo.",
    },
    {
      system: "Sigo",
      currentUse: "Facturación de clases, cafetería y servicios.",
      criticalLimitation: "Conciliación manual diaria.",
    },
    {
      system: "WhatsApp (3 números)",
      currentUse: "Canal principal de atención.",
      criticalLimitation:
        "Sin centralización. Mensajes se pierden fuera de horario.",
    },
  ] satisfies DiagnosticoSystemRow[],
  tarifasRows: [
    {
      service: "🏓 Pádel · 1h",
      condition: "L–V cualquier horario",
      price: "$100.000",
      notes: "Precio base",
      category: "cancha-padel",
      sport: "padel",
      priceMax: 100000,
    },
    {
      service: "🏓 Pádel · 1,5h",
      condition: "L–V 8:00–16:00",
      price: "$100.000 ✨ PROMO",
      notes: "1,5h al precio de 1h",
      category: "cancha-padel",
      sport: "padel",
      priceMax: 100000,
    },
    {
      service: "🏓 Pádel · 1,5h",
      condition: "L–V 16:00–20:30",
      price: "$150.000",
      notes: "Precio base",
      category: "cancha-padel",
      sport: "padel",
      priceMax: 150000,
    },
    {
      service: "🏓 Pádel · 1h",
      condition: "Fin semana <13:00",
      price: "$100.000",
      notes: "Precio base",
      category: "cancha-padel",
      sport: "padel",
      priceMax: 100000,
    },
    {
      service: "🏓 Pádel · 1h",
      condition: "Fin semana >13:00",
      price: "$80.000 + bebida",
      notes: "Incluye cerveza o Gatorade",
      category: "cancha-padel",
      sport: "padel",
      priceMax: 80000,
    },
    {
      service: "🏓 Pádel · 1,5h / 2h",
      condition: "Fin semana >13:00",
      price: "⚠ POR CONFIRMAR",
      notes: "Requiere decisión de gerencia",
      category: "cancha-padel",
      sport: "padel",
      priceMax: null,
    },
    {
      service: "🎾 Tenis · Sencillos",
      condition: "L–V y Fin semana <13:00",
      price: "$70.000/h",
      notes: "2 jugadores",
      category: "cancha-tenis",
      sport: "tenis",
      priceMax: 70000,
    },
    {
      service: "🎾 Tenis · Sencillos",
      condition: "Fin semana >13:00",
      price: "$50.000/h",
      notes: "Precio reducido",
      category: "cancha-tenis",
      sport: "tenis",
      priceMax: 50000,
    },
    {
      service: "🎾 Tenis · Dobles",
      condition: "Cualquier día",
      price: "$95.000/h",
      notes: "4 jugadores",
      category: "cancha-tenis",
      sport: "tenis",
      priceMax: 95000,
    },
    {
      service: "🏓 Clase pádel · Joaquín / Leo",
      condition: "1 persona",
      price: "$130.000/h",
      notes: "Sin domingos. Sin sáb >13:00",
      category: "clase-padel",
      sport: "padel",
      priceMax: 130000,
    },
    {
      service: "🏓 Clase pádel · Joaquín / Leo",
      condition: "2 / 3 / 4 personas",
      price: "$180K / $220K / $280K",
      notes: "Incluye cancha + canasto bolas",
      category: "clase-padel",
      sport: "padel",
      priceMax: 280000,
    },
    {
      service: "🏓 Clase pádel · Willy",
      condition: "1 / 2 / 3 / 4 personas",
      price: "$100K / $140K / $180K / $220K",
      notes: "Solo si cliente lo pide o EasyCancha lo muestra",
      category: "clase-padel",
      sport: "padel",
      priceMax: 220000,
    },
    {
      service: "🎾 Clase tenis · Graciano / Jorge",
      condition: "1 / 2 / 3 / 4 personas",
      price: "$110K / $140K / $180K / $220K",
      notes: "Alta experiencia",
      category: "clase-tenis",
      sport: "tenis",
      priceMax: 220000,
    },
    {
      service: "🎾 Clase tenis · Cristian",
      condition: "1 / 2 / 3 personas",
      price: "$80K / $120K / $150K",
      notes: "Experiencia media",
      category: "clase-tenis",
      sport: "tenis",
      priceMax: 150000,
    },
    {
      service: "🎾 Clase tenis · Dayron",
      condition: "1 persona",
      price: "$90.000/h",
      notes: "Solo nocturno",
      category: "clase-tenis",
      sport: "tenis",
      priceMax: 90000,
    },
  ] satisfies DiagnosticoTarifaRow[],
  riskRows: [
    {
      severity: "CRÍTICO",
      title: "Sin respuesta 24/7",
      description:
        "Entre 9 y 10 horas diarias sin cobertura. Mensajes fuera de horario = reservas perdidas directamente.",
    },
    {
      severity: "CRÍTICO",
      title: "Willy = punto único de fallo",
      description:
        "Toda la academia vive en su Excel local. Sin él, nadie puede responder ninguna consulta de padre.",
    },
    {
      severity: "CRÍTICO",
      title: "Excel de entrenadores no confiable",
      description:
        "Entrenadores olvidan registrar clases. Saldos inflados. El centro pierde ingresos sin saberlo.",
    },
    {
      severity: "CRÍTICO",
      title: "Canchas bloqueadas sin uso",
      description:
        "Profesores cancelan sin avisar. Cancha bloqueada en EasyCancha = ingreso potencial perdido.",
    },
    {
      severity: "ALTA",
      title: "Sin integración EasyCancha",
      description:
        "Luisa concilia manualmente 3 fuentes: 30–60 min diarios. Sin ella, no hay informe.",
    },
    {
      severity: "ALTA",
      title: "Política de cancelación sin ejecución",
      description:
        "No-shows frecuentes. La penalidad existe en papel pero rara vez se cobra.",
    },
  ] satisfies DiagnosticoRiskRow[],
  discrepanciesRows: [
    {
      topic: "Uso del PDF de academias como filtro",
      criticalForAgent: true,
      luisa:
        "El PDF siempre se envía ANTES de dar el contacto de Willy. Es el filtro principal y un control preventivo establecido.",
      willy:
        "Enviar el PDF prematuramente expone precios a prospectos no cualificados y a la competencia. Prefiere preguntar primero.",
    },
    {
      topic: "Eficacia de bloqueos en EasyCancha",
      luisa:
        "EasyCancha muestra los bloqueos en tiempo real. Es el control principal de disponibilidad.",
      willy:
        "Los bloqueos frecuentemente no están actualizados por cancelaciones no reportadas. La fuente de verdad real es su Excel.",
    },
    {
      topic: "Canales de comunicación con clientes de academia",
      luisa:
        "El contacto designado oficial de Willy es el canal correcto. No se debe dar el número personal.",
      willy:
        "En la práctica, su WhatsApp personal es el más usado. 'El que más prostituido está.' Sin trazabilidad ni descanso.",
    },
  ] satisfies DiagnosticoDiscrepancyRow[],
} as const;

