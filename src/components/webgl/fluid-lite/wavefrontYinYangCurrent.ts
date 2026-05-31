import { fluidSplatColors, type FluidLiteConfig } from "./fluidLiteConfig";
import type { FluidSplat } from "./useFluidPointerSplats";
import {
  clamp01,
  sampleYinYangSeam,
} from "./yinYangCurrentGeometry";

export type WavefrontPoint = FluidSplat;

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

function laneColor(lane: "blue" | "gold", edge: number) {
  if (lane === "blue") {
    return mixColor(fluidSplatColors.electricBlue, fluidSplatColors.water, edge).map(
      (channel) => channel * 1.12,
    ) as [number, number, number];
  }

  return mixColor(fluidSplatColors.gold, fluidSplatColors.silverWhite, edge).map(
    (channel) => channel * 1.12,
  ) as [number, number, number];
}

export function createYinYangWavefrontPoints(
  time: number,
  config: FluidLiteConfig,
): WavefrontPoint[] {
  if (!config.wavefrontEnabled || config.wavefrontMode !== "yinYang") return [];

  const pointCount = Math.max(2, Math.round(config.wavefrontPointCount));
  const tiltRadians =
    (config.yinYangCurrentTiltDeg * Math.PI) / 180 +
    time * config.autoCurrentRotationSpeed * Math.PI * 2;
  const drift = Math.sin(time * config.wavefrontSpeed * Math.PI * 2) * 0.018;
  const noisePhase = time * config.wavefrontNoiseSpeed * Math.PI * 2;
  const points: WavefrontPoint[] = [];

  for (let i = 0; i < pointCount; i += 1) {
    const u = pointCount === 1 ? 0.5 : i / (pointCount - 1);
    const seam = sampleYinYangSeam(u, {
      amplitude: config.yinYangCurrentSeamAmplitude || config.wavefrontSAmplitude,
      length: config.yinYangCurrentSeamLength || config.wavefrontSLength,
      tiltRadians,
      fieldScale: config.yinYangCurrentFieldScale,
    });
    const waveNoise =
      Math.sin(noisePhase + i * 1.97) * config.wavefrontNoiseAmount;

    (["blue", "gold"] as const).forEach((lane) => {
      const laneDirection = lane === "blue" ? 1 : -1;
      const laneOffset =
        laneDirection *
          Math.max(config.wavefrontRibbonWidth, config.yinYangCurrentLaneOffset * 0.42) *
          config.wavefrontColorSeparation +
        waveNoise +
        laneDirection * drift;
      const x = seam.x + seam.normalX * laneOffset;
      const y = seam.y + seam.normalY * laneOffset;
      const edge = lane === "blue" ? 0.1 : 0.06;
      const centerPull = {
        x: (0.5 - x) * config.wavefrontCenterPull,
        y: (0.5 - y) * config.wavefrontCenterPull,
      };
      const forceDirection = lane === "blue" ? 1 : -1;

      points.push({
        x: clamp01(x),
        y: clamp01(y),
        dx:
          (seam.tangentX * forceDirection * config.wavefrontTangentStrength +
            centerPull.x) *
          0.018 *
          config.yinYangCurrentWavefrontOpacity,
        dy:
          (seam.tangentY * forceDirection * config.wavefrontTangentStrength +
            centerPull.y) *
          0.018 *
          config.yinYangCurrentWavefrontOpacity,
        color: laneColor(lane, edge),
        radius: config.wavefrontRibbonWidth * 0.72,
        force:
          config.effectScale *
          config.wavefrontDyeStrength *
          config.yinYangCurrentWavefrontOpacity *
          0.5,
      });
    });
  }

  return points;
}
