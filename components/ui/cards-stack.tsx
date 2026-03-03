"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CardStickyProps extends HTMLMotionProps<"div"> {
  index: number;
  incrementY?: number;
  incrementZ?: number;
  stickyEnabled?: boolean;
}

const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative w-full", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  );
});
ContainerScroll.displayName = "ContainerScroll";

const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 12,
      incrementZ = 10,
      stickyEnabled = true,
      children,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const y = index * incrementY;
    const z = index * incrementZ;

    return (
      <motion.div
        ref={ref}
        layout="position"
        style={{
          top: stickyEnabled ? y : undefined,
          z,
          backfaceVisibility: "hidden",
          ...style,
        }}
        className={cn(stickyEnabled ? "sticky" : "relative", className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

CardSticky.displayName = "CardSticky";

export { ContainerScroll, CardSticky };
