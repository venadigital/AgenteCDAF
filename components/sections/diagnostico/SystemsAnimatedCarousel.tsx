"use client";

import {
  IconBrandWhatsapp,
  IconCalendarTime,
  IconDeviceLaptop,
  IconFileSpreadsheet,
  IconReceipt,
} from "@tabler/icons-react";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import type { DiagnosticoSystemRow } from "@/content/sections/diagnostico-detail";

interface SystemsAnimatedCarouselProps {
  rows: DiagnosticoSystemRow[];
}

function systemVisual(system: string) {
  if (system.includes("WhatsApp")) {
    return {
      icon: <IconBrandWhatsapp className="h-5 w-5" />,
      subtitle: "Canal de entrada",
      tone: "critical" as const,
    };
  }

  if (system.includes("EasyCancha")) {
    return {
      icon: <IconCalendarTime className="h-5 w-5" />,
      subtitle: "Plataforma de reservas",
      tone: "default" as const,
    };
  }

  if (system.includes("Sigo")) {
    return {
      icon: <IconReceipt className="h-5 w-5" />,
      subtitle: "Facturación",
      tone: "default" as const,
    };
  }

  if (system.includes("Excel Willy")) {
    return {
      icon: <IconDeviceLaptop className="h-5 w-5" />,
      subtitle: "Shadow IT",
      tone: "critical" as const,
    };
  }

  return {
    icon: <IconFileSpreadsheet className="h-5 w-5" />,
    subtitle: "Control manual",
    tone: "default" as const,
  };
}

export function SystemsAnimatedCarousel({ rows }: SystemsAnimatedCarouselProps) {
  const testimonials = rows.map((row) => {
    const visual = systemVisual(row.system);
    return {
      title: row.system,
      subtitle: visual.subtitle,
      usage: row.currentUse,
      limitation: row.criticalLimitation,
      icon: visual.icon,
      tone: visual.tone,
    };
  });

  return <AnimatedTestimonials testimonials={testimonials} autoplay={false} />;
}

