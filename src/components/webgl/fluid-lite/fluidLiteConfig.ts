export type FluidLiteQuality = "off" | "low" | "medium";

export type FluidLiteConfig = {
  simResolution: number;
  dyeResolution: number;
  pressureIterations: number;
  diffusionIterations: number;
  maxActiveSplats: number;
  maxSplatsPerSecond: number;
  splatRadius: number;
  clickSplatRadius: number;
  splatForce: number;
  clickSplatForce: number;
  velocityScale: number;
  advectionScale: number;
  densityDissipation: number;
  velocityDissipation: number;
  pressureDissipation: number;
  dyeDiffusion: number;
  dispersionStrength: number;
  particleCount: number;
  particleSize: number;
  particleOpacity: number;
  particleDecay: number;
  displayOpacity: number;
  maxDpr: number;
  simulationFps: number;
  autoSplatIntervalMs: number;
  emblemSafeZoneRadius: number;
};

export const fluidLitePresets: Record<FluidLiteQuality, FluidLiteConfig> = {
  off: {
    simResolution: 1,
    dyeResolution: 1,
    pressureIterations: 0,
    diffusionIterations: 0,
    maxActiveSplats: 0,
    maxSplatsPerSecond: 0,
    splatRadius: 0,
    clickSplatRadius: 0,
    splatForce: 0,
    clickSplatForce: 0,
    velocityScale: 0,
    advectionScale: 0,
    densityDissipation: 1,
    velocityDissipation: 1,
    pressureDissipation: 1,
    dyeDiffusion: 0,
    dispersionStrength: 0,
    particleCount: 0,
    particleSize: 0,
    particleOpacity: 0,
    particleDecay: 1,
    displayOpacity: 0,
    maxDpr: 1,
    simulationFps: 0,
    autoSplatIntervalMs: 0,
    emblemSafeZoneRadius: 0.25,
  },
  low: {
    simResolution: 64,
    dyeResolution: 256,
    pressureIterations: 4,
    diffusionIterations: 1,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 5,
    splatRadius: 0.007,
    clickSplatRadius: 0.012,
    splatForce: 520,
    clickSplatForce: 880,
    velocityScale: 0.28,
    advectionScale: 1.8,
    densityDissipation: 0.9975,
    velocityDissipation: 0.992,
    pressureDissipation: 0.945,
    dyeDiffusion: 0.0008,
    dispersionStrength: 0.28,
    particleCount: 96,
    particleSize: 1.6,
    particleOpacity: 0.26,
    particleDecay: 0.996,
    displayOpacity: 0.62,
    maxDpr: 1,
    simulationFps: 30,
    autoSplatIntervalMs: 5600,
    emblemSafeZoneRadius: 0.25,
  },
  medium: {
    simResolution: 96,
    dyeResolution: 384,
    pressureIterations: 6,
    diffusionIterations: 2,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 6,
    splatRadius: 0.009,
    clickSplatRadius: 0.015,
    splatForce: 720,
    clickSplatForce: 1120,
    velocityScale: 0.34,
    advectionScale: 2.15,
    densityDissipation: 0.9982,
    velocityDissipation: 0.993,
    pressureDissipation: 0.95,
    dyeDiffusion: 0.0011,
    dispersionStrength: 0.36,
    particleCount: 144,
    particleSize: 1.8,
    particleOpacity: 0.32,
    particleDecay: 0.997,
    displayOpacity: 0.72,
    maxDpr: 1.1,
    simulationFps: 30,
    autoSplatIntervalMs: 6200,
    emblemSafeZoneRadius: 0.25,
  },
};

export const fluidSplatColors = {
  water: [0.49, 0.91, 0.95],
  electricBlue: [0.08, 0.42, 0.98],
  jade: [0.4, 0.84, 0.68],
  gold: [0.97, 0.79, 0.28],
} as const;
