"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HeroShutterTextProps {
  text: string;
  className?: string;
  retriggerOnHover?: boolean;
}

export default function HeroShutterText({
  text,
  className = "",
  retriggerOnHover = true,
}: HeroShutterTextProps) {
  const [count, setCount] = useState(0);
  const characters = useMemo(() => text.split(""), [text]);

  return (
    <span
      className={cn("relative inline-block align-top overflow-visible", className)}
      onPointerEnter={() => {
        if (retriggerOnHover) setCount((c) => c + 1);
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={count}
          className="inline-flex max-w-full flex-nowrap items-start whitespace-nowrap"
        >
          {characters.map((char, i) => (
            <span
              key={`${char}-${i}`}
              className="relative inline-block overflow-hidden leading-none"
              aria-hidden="true"
            >
              <motion.span
                initial={{ opacity: 0, filter: "blur(10px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: i * 0.02 + 0.18, duration: 0.55 }}
                className="relative z-[1] inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 0.95, 0] }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.02,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-0 z-10 text-[var(--color-accent)]"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: "-100%", opacity: [0, 0.75, 0] }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.02 + 0.06,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-0 z-10 text-black/70"
                style={{
                  clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>

              <motion.span
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "100%", opacity: [0, 0.95, 0] }}
                transition={{
                  duration: 0.45,
                  delay: i * 0.02 + 0.12,
                  ease: "easeInOut",
                }}
                className="pointer-events-none absolute inset-0 z-10 text-[var(--color-accent)]"
                style={{
                  clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
