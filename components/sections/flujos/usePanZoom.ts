"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, WheelEvent as ReactWheelEvent } from "react";

interface PanZoomState {
  x: number;
  y: number;
  scale: number;
}

interface UsePanZoomOptions {
  minScale?: number;
  maxScale?: number;
  initialScale?: number;
  initialX?: number;
  initialY?: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function usePanZoom(options: UsePanZoomOptions = {}) {
  const {
    minScale = 0.72,
    maxScale = 1.8,
    initialScale = 1,
    initialX = 0,
    initialY = 0,
  } = options;

  const [state, setState] = useState<PanZoomState>({
    x: initialX,
    y: initialY,
    scale: initialScale,
  });
  const dragRef = useRef<{ active: boolean; startX: number; startY: number; x: number; y: number }>({
    active: false,
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
  });

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      active: true,
      startX: event.clientX,
      startY: event.clientY,
      x: state.x,
      y: state.y,
    };
  }, [state.x, state.y]);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;

    setState((prev) => ({
      ...prev,
      x: dragRef.current.x + dx,
      y: dragRef.current.y + dy,
    }));
  }, []);

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current.active) {
      dragRef.current.active = false;
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        // no-op
      }
    }
  }, []);

  const onWheel = useCallback(
    (event: ReactWheelEvent<HTMLDivElement>) => {
      event.preventDefault();

      const delta = -event.deltaY;
      const zoomIntensity = 0.0012;
      const nextScale = clamp(state.scale + delta * zoomIntensity, minScale, maxScale);
      if (nextScale === state.scale) return;

      const containerRect = event.currentTarget.getBoundingClientRect();
      const cursorX = event.clientX - containerRect.left;
      const cursorY = event.clientY - containerRect.top;

      setState((prev) => {
        const scaleRatio = nextScale / prev.scale;
        const nextX = cursorX - (cursorX - prev.x) * scaleRatio;
        const nextY = cursorY - (cursorY - prev.y) * scaleRatio;

        return {
          x: nextX,
          y: nextY,
          scale: nextScale,
        };
      });
    },
    [maxScale, minScale, state.scale],
  );

  const zoomIn = useCallback(() => {
    setState((prev) => ({ ...prev, scale: clamp(prev.scale + 0.12, minScale, maxScale) }));
  }, [maxScale, minScale]);

  const zoomOut = useCallback(() => {
    setState((prev) => ({ ...prev, scale: clamp(prev.scale - 0.12, minScale, maxScale) }));
  }, [maxScale, minScale]);

  const reset = useCallback(() => {
    setState({ x: initialX, y: initialY, scale: initialScale });
  }, [initialScale, initialX, initialY]);

  const setView = useCallback((next: PanZoomState) => {
    setState({
      x: next.x,
      y: next.y,
      scale: clamp(next.scale, minScale, maxScale),
    });
  }, [maxScale, minScale]);

  const transformStyle = useMemo(
    () => ({ transform: `translate(${state.x}px, ${state.y}px) scale(${state.scale})` }),
    [state.scale, state.x, state.y],
  );

  return {
    state,
    transformStyle,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onWheel,
    zoomIn,
    zoomOut,
    reset,
    setView,
  };
}
