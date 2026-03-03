"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface AnchorNavItem {
  href: string;
  label: string;
}

interface AnchorNavProps {
  items: AnchorNavItem[];
}

export function AnchorNav({ items }: AnchorNavProps) {
  const [activeHref, setActiveHref] = useState<string>(items[0]?.href ?? "");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const item of items) {
      const target = document.querySelector(item.href);
      if (!target) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setActiveHref(item.href);
            }
          }
        },
        {
          rootMargin: "-30% 0px -55% 0px",
          threshold: 0.15,
        },
      );

      observer.observe(target);
      observers.push(observer);
    }

    return () => {
      for (const observer of observers) observer.disconnect();
    };
  }, [items]);

  return (
    <nav
      aria-label="Navegación de la portada"
      className="sticky top-4 z-20 hidden rounded-2xl border border-[var(--color-line)] bg-white/70 p-3 shadow-[var(--shadow-card)] backdrop-blur md:block"
    >
      <ul className="grid gap-1">
        {items.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block rounded-xl px-3 py-2 text-sm transition ${
                  isActive
                    ? "bg-[var(--color-court)] text-white"
                    : "text-[var(--color-muted)] hover:bg-white hover:text-[var(--color-ink)]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
