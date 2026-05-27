import { fluidSplatColors, type FluidLiteConfig } from "./fluidLiteConfig";
import type { FluidSplat } from "./useFluidPointerSplats";

export type CurrentDisruption = {
  x: number;
  y: number;
  startedAt: number;
  strength: number;
};

export type AutoCurrentSplat = FluidSplat;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
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

function localAttenuation(input: {
  x: number;
  y: number;
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}) {
  const { config, disruption, time, x, y } = input;

  if (!disruption || config.userDisruptionRecoverySeconds <= 0) return 1;

  const age = Math.max(0, time - disruption.startedAt);
  const recovery = Math.exp(-age / config.userDisruptionRecoverySeconds);
  const disruptionAmount = disruption.strength * recovery;
  const distance = Math.hypot(x - disruption.x, y - disruption.y);
  const localFalloff = Math.exp(-(distance * distance) / 0.028);
  const attenuation = 1 - Math.min(0.72, disruptionAmount * localFalloff);

  return Math.max(0.28, attenuation);
}

function createLobeSplats(input: {
  x: number;
  y: number;
  tangentAngle: number;
  direction: 1 | -1;
  color: readonly [number, number, number];
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { color, config, direction, disruption, tangentAngle, time, x, y } =
    input;
  const attenuation = localAttenuation({ x, y, time, config, disruption });
  const centerDx = (0.5 - x) * config.autoCurrentCenterPull;
  const centerDy = (0.5 - y) * config.autoCurrentCenterPull;
  const tangentDx = Math.cos(tangentAngle) * direction;
  const tangentDy = Math.sin(tangentAngle) * direction;
  const phase = time * Math.PI * 2 * config.autoCurrentRecoverySpeed;

  return [-1, 0, 1].map((offset) => {
    const spreadAngle = tangentAngle + Math.PI / 2;
    const lobeX =
      x + Math.cos(spreadAngle) * config.autoCurrentLobeSpread * offset;
    const lobeY =
      y + Math.sin(spreadAngle) * config.autoCurrentLobeSpread * offset;
    const wave = 1 + Math.sin(phase + offset * 1.7) * 0.12;

    return {
      x: clamp01(lobeX),
      y: clamp01(lobeY),
      dx:
        (tangentDx * config.autoCurrentStrength + centerDx) *
        attenuation *
        wave *
        0.022,
      dy:
        (tangentDy * config.autoCurrentStrength + centerDy) *
        attenuation *
        wave *
        0.022,
      color,
      radius: config.autoCurrentLobeRadius * (offset === 0 ? 1.25 : 0.86),
      force: config.effectScale * config.autoCurrentDyeRate * attenuation,
    };
  });
}

function createDisruptionTurbulence(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { config, disruption, time } = input;

  if (!disruption || config.userDisruptionRecoverySeconds <= 0) return [];

  const age = Math.max(0, time - disruption.startedAt);
  const amount =
    disruption.strength * Math.exp(-age / config.userDisruptionRecoverySeconds);

  if (amount < 0.04) return [];

  const angle = time * 5.1 + disruption.x * 6.7;

  return [
    {
      x: clamp01(disruption.x + Math.cos(angle) * 0.028),
      y: clamp01(disruption.y + Math.sin(angle * 0.83) * 0.028),
      dx: Math.cos(angle + Math.PI / 2) * amount * 0.016,
      dy: Math.sin(angle + Math.PI / 2) * amount * 0.016,
      color: amount > 0.45 ? fluidSplatColors.electricBlue : fluidSplatColors.water,
      radius: config.autoCurrentLobeRadius * 1.15,
      force: config.effectScale * config.autoCurrentDyeRate * amount * 0.72,
    },
  ];
}

function createBridgeSplats(input: {
  angle: number;
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { angle, config, disruption, time } = input;
  const bridgeCount = Math.max(0, Math.round(config.autoCurrentBridgeCount));
  const tangentAngle = angle + Math.PI / 2;
  const blueWhite = mixColor(fluidSplatColors.water, fluidSplatColors.silverWhite, 0.26);
  const goldWhite = mixColor(fluidSplatColors.gold, fluidSplatColors.silverWhite, 0.46);

  return Array.from({ length: bridgeCount }, (_, index) => {
    const progress = bridgeCount === 1 ? 0.5 : index / (bridgeCount - 1);
    const sCurve = (progress - 0.5) * 2;
    const bend =
      Math.sin(progress * Math.PI) *
      config.autoCurrentLobeSpread *
      config.autoCurrentBridgeStrength;
    const x =
      0.5 +
      Math.cos(angle) *
        sCurve *
        config.autoCurrentRadius *
        config.autoCurrentHalfSeparation *
        0.5 +
      Math.cos(tangentAngle) * bend;
    const y =
      0.5 +
      Math.sin(angle) *
        sCurve *
        config.autoCurrentRadius *
        config.autoCurrentHalfSeparation *
        0.5 +
      Math.sin(tangentAngle) * bend;
    const color = progress < 0.5 ? blueWhite : goldWhite;
    const attenuation = localAttenuation({ x, y, time, config, disruption });
    const direction = index < bridgeCount / 2 ? 1 : -1;

    return {
      x: clamp01(x),
      y: clamp01(y),
      dx:
        Math.cos(tangentAngle) *
        direction *
        config.autoCurrentStrength *
        config.autoCurrentBridgeStrength *
        0.01 *
        attenuation,
      dy:
        Math.sin(tangentAngle) *
        direction *
        config.autoCurrentStrength *
        config.autoCurrentBridgeStrength *
        0.01 *
        attenuation,
      color,
      radius: config.autoCurrentLobeRadius * 0.78,
      force:
        config.effectScale *
        config.autoCurrentDyeRate *
        config.autoCurrentBridgeStrength *
        0.62 *
        attenuation,
    };
  });
}

export function createAutoYinYangCurrentSplats(input: {
  time: number;
  config: FluidLiteConfig;
  disruption?: CurrentDisruption | null;
}): AutoCurrentSplat[] {
  const { config, disruption, time } = input;

  if (!config.autoCurrentEnabled) return [];

  const angle = time * config.autoCurrentRotationSpeed * Math.PI * 2;
  const lobeRadius = config.autoCurrentRadius * config.autoCurrentHalfSeparation;
  const yinColor = mixColor(fluidSplatColors.electricBlue, fluidSplatColors.water, 0.42);
  const yangColor = mixColor(fluidSplatColors.gold, fluidSplatColors.silverWhite, 0.28);
  const yin = {
    x: 0.5 + Math.cos(angle) * lobeRadius,
    y: 0.5 + Math.sin(angle) * lobeRadius,
  };
  const yang = {
    x: 0.5 - Math.cos(angle) * lobeRadius,
    y: 0.5 - Math.sin(angle) * lobeRadius,
  };

  return [
    ...createLobeSplats({
      ...yin,
      tangentAngle: angle + Math.PI / 2,
      direction: 1,
      color: yinColor,
      time,
      config,
      disruption,
    }),
    ...createLobeSplats({
      ...yang,
      tangentAngle: angle + Math.PI / 2,
      direction: -1,
      color: yangColor,
      time,
      config,
      disruption,
    }),
    ...createBridgeSplats({ angle, time, config, disruption }),
    ...createDisruptionTurbulence({ time, config, disruption }),
  ];
}
