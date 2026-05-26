import { useEffect, type RefObject } from "react";

import { fluidSplatColors, type FluidLiteConfig } from "./fluidLiteConfig";

export type FluidSplat = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: readonly [number, number, number];
  radius?: number;
  force?: number;
};

export function isInsideEmblemSafeZone(
  x: number,
  y: number,
  radius: number,
): boolean {
  const dx = x - 0.5;
  const dy = y - 0.5;

  return Math.sqrt(dx * dx + dy * dy) < radius;
}

function clampVelocity(dx: number, dy: number, scale: number) {
  return {
    dx: Math.min(0.55, Math.max(-0.55, dx * scale)),
    dy: Math.min(0.55, Math.max(-0.55, dy * scale)),
  };
}

export function useFluidPointerSplats(
  targetRef: RefObject<HTMLElement>,
  options: {
    enabled: boolean;
    config: FluidLiteConfig;
    pushSplat: (splat: FluidSplat) => void;
  },
): void {
  const { config, enabled, pushSplat } = options;

  useEffect(() => {
    const node = targetRef.current;
    if (!node || !enabled) return undefined;

    let lastX = 0.5;
    let lastY = 0.5;
    let lastSplat = 0;

    const getPoint = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const y = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1);

      return {
        x: Math.min(1, Math.max(0, x)),
        y: Math.min(1, Math.max(0, y)),
      };
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const now = performance.now();
      if (
        config.maxSplatsPerSecond > 0 &&
        now - lastSplat < 1000 / config.maxSplatsPerSecond
      ) {
        return;
      }

      const point = getPoint(event);
      if (
        isInsideEmblemSafeZone(
          point.x,
          point.y,
          config.emblemSafeZoneRadius,
        )
      ) {
        lastX = point.x;
        lastY = point.y;
        return;
      }

      const dx = point.x - lastX;
      const dy = point.y - lastY;
      const movement = Math.hypot(dx, dy);

      if (movement < 0.012) return;

      lastX = point.x;
      lastY = point.y;
      lastSplat = now;
      const velocity = clampVelocity(dx, dy, config.velocityScale);

      pushSplat({
        x: point.x,
        y: point.y,
        dx: velocity.dx,
        dy: velocity.dy,
        color:
          movement > 0.035
            ? fluidSplatColors.electricBlue
            : fluidSplatColors.water,
        radius: config.splatRadius,
        force: 1,
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = getPoint(event);
      lastX = point.x;
      lastY = point.y;

      if (
        isInsideEmblemSafeZone(
          point.x,
          point.y,
          config.emblemSafeZoneRadius,
        )
      ) {
        return;
      }

      const velocity = clampVelocity(0.018, 0.012, config.velocityScale);

      pushSplat({
        x: point.x,
        y: point.y,
        dx: velocity.dx,
        dy: velocity.dy,
        color:
          event.pointerType === "mouse"
            ? fluidSplatColors.gold
            : fluidSplatColors.water,
        radius: config.clickSplatRadius,
        force: config.clickSplatForce / Math.max(config.splatForce, 1),
      });
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerdown", handlePointerDown);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [config, enabled, pushSplat, targetRef]);
}
