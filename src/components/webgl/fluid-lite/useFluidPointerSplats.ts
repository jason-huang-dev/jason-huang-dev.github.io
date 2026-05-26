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

function clampVelocity(dx: number, dy: number, scale: number) {
  return {
    dx: Math.min(0.55, Math.max(-0.55, dx * scale)),
    dy: Math.min(0.55, Math.max(-0.55, dy * scale)),
  };
}

function pickSplatColor(
  x: number,
  y: number,
  movement: number,
): readonly [number, number, number] {
  const centerBias = Math.sin((x - 0.5) * Math.PI * 2) + Math.cos((y - 0.5) * Math.PI);

  if (movement > 0.045) return fluidSplatColors.electricBlue;
  if (centerBias > 0.8) return fluidSplatColors.jade;
  if (centerBias < -0.72) return fluidSplatColors.gold;
  return fluidSplatColors.water;
}

export function createFluidSplats(input: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  config: FluidLiteConfig;
  click: boolean;
  movement: number;
}): FluidSplat[] {
  const lobeCount = input.click ? 7 : 4;
  const radiusBase = input.click
    ? input.config.clickSplatRadius
    : input.config.splatRadius;
  const forceBase = input.click
    ? input.config.clickSplatForce / Math.max(input.config.splatForce, 1)
    : 1;
  const radius =
    radiusBase * input.config.interactionRadiusScale * (input.click ? 0.56 : 0.5);
  const spread = input.click ? 0.052 : 0.032;
  const cx = input.x - 0.5;
  const cy = input.y - 0.5;
  const swirlFalloff = Math.max(0, 1 - Math.hypot(cx, cy) / 0.58);
  const tangent = {
    dx: cy * input.config.yinYangSwirlStrength * swirlFalloff,
    dy: -cx * input.config.yinYangSwirlStrength * swirlFalloff,
  };
  const velocity = {
    dx: input.dx + tangent.dx,
    dy: input.dy + tangent.dy,
  };
  const color = pickSplatColor(input.x, input.y, input.movement);
  const splats: FluidSplat[] = [];

  for (let i = 0; i < lobeCount; i += 1) {
    const angle = (i / lobeCount) * Math.PI * 2;
    const wobble = i % 2 === 0 ? 1 : 0.58;
    const lobeSpread = spread * wobble;

    splats.push({
      x: Math.min(1, Math.max(0, input.x + Math.cos(angle) * lobeSpread)),
      y: Math.min(1, Math.max(0, input.y + Math.sin(angle) * lobeSpread)),
      dx: velocity.dx + Math.cos(angle + Math.PI / 2) * 0.006,
      dy: velocity.dy + Math.sin(angle + Math.PI / 2) * 0.006,
      color: i % 5 === 0 && input.click ? fluidSplatColors.gold : color,
      radius: radius * (i % 2 === 0 ? 1 : 0.74),
      force:
        (input.config.effectScale * forceBase * (input.click ? 0.9 : 0.54)) /
        Math.max(lobeCount * 0.58, 1),
    });
  }

  return splats;
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
      const dx = point.x - lastX;
      const dy = point.y - lastY;
      const movement = Math.hypot(dx, dy);

      if (movement < 0.012) return;

      lastX = point.x;
      lastY = point.y;
      lastSplat = now;

      const velocity = clampVelocity(dx, dy, config.velocityScale);
      createFluidSplats({
        x: point.x,
        y: point.y,
        dx: velocity.dx,
        dy: velocity.dy,
        config,
        click: false,
        movement,
      }).forEach(pushSplat);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = getPoint(event);
      lastX = point.x;
      lastY = point.y;

      const velocity = clampVelocity(0.018, 0.012, config.velocityScale);
      createFluidSplats({
        x: point.x,
        y: point.y,
        dx: velocity.dx,
        dy: velocity.dy,
        config,
        click: true,
        movement: 0.06,
      }).forEach(pushSplat);
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerdown", handlePointerDown);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [config, enabled, pushSplat, targetRef]);
}
