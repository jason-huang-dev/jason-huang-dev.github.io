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

export function getHeroFluidInteractionRegion(
  x: number,
  y: number,
  config: FluidLiteConfig,
): "emblem-core" | "ring" | "basin" {
  const dx = x - 0.5;
  const dy = y - 0.5;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (
    config.emblemSafeZoneEnabled &&
    distance < config.emblemCoreSafeZoneRadius
  ) {
    return "emblem-core";
  }

  if (
    config.centralRingInteractive &&
    distance >= config.ringInteractionInnerRadius &&
    distance <= config.ringInteractionOuterRadius
  ) {
    return "ring";
  }

  return "basin";
}

function clampVelocity(dx: number, dy: number, scale: number) {
  return {
    dx: Math.min(0.55, Math.max(-0.55, dx * scale)),
    dy: Math.min(0.55, Math.max(-0.55, dy * scale)),
  };
}

export function createMultiLobeSplats(input: {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: readonly [number, number, number];
  radius: number;
  force: number;
  lobeCount: number;
  spread: number;
}): FluidSplat[] {
  const splats: FluidSplat[] = [];

  for (let i = 0; i < input.lobeCount; i += 1) {
    const angle = (i / input.lobeCount) * Math.PI * 2;
    const wobble = i % 2 === 0 ? 1 : 0.62;
    splats.push({
      x: Math.min(1, Math.max(0, input.x + Math.cos(angle) * input.spread * wobble)),
      y: Math.min(1, Math.max(0, input.y + Math.sin(angle) * input.spread * wobble)),
      dx: input.dx + Math.cos(angle) * input.spread * 0.16,
      dy: input.dy + Math.sin(angle) * input.spread * 0.16,
      color: input.color,
      radius: input.radius,
      force: input.force / Math.max(input.lobeCount * 0.58, 1),
    });
  }

  return splats;
}

export function createRingPulseSplats(input: {
  x: number;
  y: number;
  config: FluidLiteConfig;
  color: readonly [number, number, number];
}): FluidSplat[] {
  const splats: FluidSplat[] = [];
  const dx = input.x - 0.5;
  const dy = input.y - 0.5;
  const baseAngle = Math.atan2(dy, dx);
  const ringRadius = Math.min(
    input.config.ringInteractionOuterRadius,
    Math.max(input.config.ringInteractionInnerRadius, Math.hypot(dx, dy)),
  );

  for (let i = 0; i < 8; i += 1) {
    const angle = baseAngle + (i / 8) * Math.PI * 2;
    const x = 0.5 + Math.cos(angle) * ringRadius;
    const y = 0.5 + Math.sin(angle) * ringRadius;
    const tangent = angle + Math.PI / 2;
    splats.push({
      x: Math.min(1, Math.max(0, x)),
      y: Math.min(1, Math.max(0, y)),
      dx: Math.cos(angle) * 0.012 + Math.cos(tangent) * 0.008,
      dy: Math.sin(angle) * 0.012 + Math.sin(tangent) * 0.008,
      color: i % 3 === 0 ? fluidSplatColors.gold : input.color,
      radius: input.config.ringPulseRadius * input.config.interactionRadiusScale,
      force:
        (input.config.ringPulseForce / Math.max(input.config.splatForce, 1)) *
        input.config.effectScale *
        0.7,
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
      const region = getHeroFluidInteractionRegion(point.x, point.y, config);
      if (region === "emblem-core") {
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

      const splats =
        region === "ring"
          ? createRingPulseSplats({
              x: point.x,
              y: point.y,
              config,
              color: fluidSplatColors.water,
            })
          : createMultiLobeSplats({
              x: point.x,
              y: point.y,
              dx: velocity.dx,
              dy: velocity.dy,
              color:
                movement > 0.035
                  ? fluidSplatColors.electricBlue
                  : fluidSplatColors.water,
              radius: config.splatRadius * config.interactionRadiusScale * 0.48,
              force: config.effectScale,
              lobeCount: config.interactionRadiusScale >= 5 ? 3 : 1,
              spread: config.interactionRadiusScale >= 5 ? 0.028 : 0,
            });

      splats.forEach(pushSplat);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const point = getPoint(event);
      lastX = point.x;
      lastY = point.y;

      const region = getHeroFluidInteractionRegion(point.x, point.y, config);
      if (region === "emblem-core") {
        return;
      }

      const velocity = clampVelocity(0.018, 0.012, config.velocityScale);

      const splats =
        region === "ring"
          ? createRingPulseSplats({
              x: point.x,
              y: point.y,
              config,
              color: fluidSplatColors.jade,
            })
          : createMultiLobeSplats({
              x: point.x,
              y: point.y,
              dx: velocity.dx,
              dy: velocity.dy,
              color:
                event.pointerType === "mouse"
                  ? fluidSplatColors.gold
                  : fluidSplatColors.water,
              radius: config.clickSplatRadius * config.interactionRadiusScale * 0.52,
              force:
                (config.clickSplatForce / Math.max(config.splatForce, 1)) *
                config.effectScale,
              lobeCount: config.interactionRadiusScale >= 5 ? 5 : 1,
              spread: config.interactionRadiusScale >= 5 ? 0.045 : 0,
            });

      splats.forEach(pushSplat);
    };

    node.addEventListener("pointermove", handlePointerMove);
    node.addEventListener("pointerdown", handlePointerDown);

    return () => {
      node.removeEventListener("pointermove", handlePointerMove);
      node.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [config, enabled, pushSplat, targetRef]);
}
