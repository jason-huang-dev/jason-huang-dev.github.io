import { fluidSplatColors, type FluidLiteConfig } from "./fluidLiteConfig";
import type { FluidSplat } from "./useFluidPointerSplats";

export type WavefrontPoint = FluidSplat;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function rotatePoint(x: number, y: number, angle: number) {
  const dx = x - 0.5;
  const dy = y - 0.5;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: 0.5 + dx * cos - dy * sin,
    y: 0.5 + dx * sin + dy * cos,
  };
}

function mixColor(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
  amount: number,
): readonly [number, number, number] {
  return [
    a[0] * (1 - amount) + b[0] * amount,
    a[1] * (1 - amount) + b[1] * amount,
    a[2] * (1 - amount) + b[2] * amount,
  ];
}

function sCurvePoint(u: number, config: FluidLiteConfig) {
  const centered = u - 0.5;

  return {
    x: 0.5 + centered * config.wavefrontSLength,
    y:
      0.5 +
      Math.sin(centered * Math.PI * 2) * config.wavefrontSAmplitude,
  };
}

function laneColor(lane: "blue" | "gold", edge: number) {
  if (lane === "blue") {
    return mixColor(fluidSplatColors.electricBlue, fluidSplatColors.water, edge);
  }

  return mixColor(fluidSplatColors.gold, fluidSplatColors.silverWhite, edge);
}

export function createYinYangWavefrontPoints(
  time: number,
  config: FluidLiteConfig,
): WavefrontPoint[] {
  if (!config.wavefrontEnabled || config.wavefrontMode !== "yinYang") return [];

  const pointCount = Math.max(2, Math.round(config.wavefrontPointCount));
  const rotation = time * config.wavefrontSpeed * Math.PI * 2;
  const noisePhase = time * config.wavefrontNoiseSpeed * Math.PI * 2;
  const points: WavefrontPoint[] = [];

  for (let i = 0; i < pointCount; i += 1) {
    const u = pointCount === 1 ? 0.5 : i / (pointCount - 1);
    const prev = sCurvePoint(Math.max(0, u - 1 / (pointCount - 1)), config);
    const next = sCurvePoint(Math.min(1, u + 1 / (pointCount - 1)), config);
    const base = sCurvePoint(u, config);
    const tangent = {
      x: next.x - prev.x,
      y: next.y - prev.y,
    };
    const tangentLength = Math.hypot(tangent.x, tangent.y) || 1;
    const baseTangentX = tangent.x / tangentLength;
    const baseTangentY = tangent.y / tangentLength;
    const normalX = -baseTangentY;
    const normalY = baseTangentX;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const tangentX = baseTangentX * cos - baseTangentY * sin;
    const tangentY = baseTangentX * sin + baseTangentY * cos;
    const waveNoise =
      Math.sin(noisePhase + i * 1.97) * config.wavefrontNoiseAmount;

    (["blue", "gold"] as const).forEach((lane) => {
      const laneDirection = lane === "blue" ? 1 : -1;
      const laneOffset =
        laneDirection *
          config.wavefrontRibbonWidth *
          config.wavefrontColorSeparation +
        waveNoise;
      const rotated = rotatePoint(
        base.x + normalX * laneOffset,
        base.y + normalY * laneOffset,
        rotation,
      );
      const edge = lane === "blue" ? 0.34 : 0.28;
      const centerPull = {
        x: (0.5 - rotated.x) * config.wavefrontCenterPull,
        y: (0.5 - rotated.y) * config.wavefrontCenterPull,
      };
      const forceDirection = lane === "blue" ? 1 : -1;

      points.push({
        x: clamp01(rotated.x),
        y: clamp01(rotated.y),
        dx:
          (tangentX * forceDirection * config.wavefrontTangentStrength +
            centerPull.x) *
          0.018,
        dy:
          (tangentY * forceDirection * config.wavefrontTangentStrength +
            centerPull.y) *
          0.018,
        color: laneColor(lane, edge),
        radius: config.wavefrontRibbonWidth,
        force: config.effectScale * config.wavefrontDyeStrength,
      });
    });
  }

  return points;
}
