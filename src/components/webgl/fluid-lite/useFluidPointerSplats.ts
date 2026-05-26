import { useEffect, type RefObject } from "react";

import { fluidSplatColors } from "./fluidLiteConfig";

export type FluidSplat = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: [number, number, number];
  radius?: number;
  force?: number;
};

export function useFluidPointerSplats(
  targetRef: RefObject<HTMLElement>,
  options: {
    enabled: boolean;
    pushSplat: (splat: FluidSplat) => void;
  },
): void {
  useEffect(() => {
    const node = targetRef.current;
    if (!node || !options.enabled) return undefined;

    let lastX = 0.5;
    let lastY = 0.5;
    let lastSplat = 0;

    const getPoint = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) / Math.max(rect.width, 1),
        y: 1 - (event.clientY - rect.top) / Math.max(rect.height, 1),
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const now = performance.now();
      if (now - lastSplat < 1000 / 24) return;

      const point = getPoint(event);
      const dx = point.x - lastX;
      const dy = point.y - lastY;
      const movement = Math.hypot(dx, dy);

      if (movement < 0.006) return;

      lastX = point.x;
      lastY = point.y;
      lastSplat = now;

      options.pushSplat({
        x: point.x,
        y: point.y,
        dx,
        dy,
        color: movement > 0.035 ? fluidSplatColors.electricBlue : fluidSplatColors.water,
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = getPoint(event);
      lastX = point.x;
      lastY = point.y;

      options.pushSplat({
        x: point.x,
        y: point.y,
        dx: 0.018,
        dy: 0.012,
        color: event.pointerType === "mouse" ? fluidSplatColors.gold : fluidSplatColors.water,
        radius: 0.028,
        force: 1.4,
      });
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerdown", handlePointerDown);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [options, targetRef]);
}
