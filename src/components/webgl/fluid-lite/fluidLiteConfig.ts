export type FluidLiteQuality = "off" | "low" | "medium" | "high";

export type FluidLiteConfig = {
  simResolution: number;
  dyeResolution: number;
  pressureIterations: number;
  diffusionIterations: number;
  maxActiveSplats: number;
  maxSplatsPerSecond: number;
  interactionRadiusScale: number;
  effectScale: number;
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
  displayLayerOpacity: number;
  fieldBleedPx: number;
  maxDpr: number;
  simulationFps: number;
  autoSplatIntervalMs: number;
  emblemSafeZoneRadius: number;
  emblemSafeZoneEnabled: boolean;
};

export const fluidLitePresets: Record<FluidLiteQuality, FluidLiteConfig> = {
  off: {
    simResolution: 1,
    dyeResolution: 1,
    pressureIterations: 0,
    diffusionIterations: 0,
    maxActiveSplats: 0,
    maxSplatsPerSecond: 0,
    interactionRadiusScale: 1,
    effectScale: 0,
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
    displayLayerOpacity: 0,
    fieldBleedPx: 0,
    maxDpr: 1,
    simulationFps: 0,
    autoSplatIntervalMs: 0,
    emblemSafeZoneRadius: 0.25,
    emblemSafeZoneEnabled: true,
  },
  low: {
    simResolution: 64,
    dyeResolution: 256,
    pressureIterations: 4,
    diffusionIterations: 1,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 5,
    interactionRadiusScale: 1.12,
    effectScale: 1,
    splatRadius: 0.007,
    clickSplatRadius: 0.012,
    splatForce: 520,
    clickSplatForce: 880,
    velocityScale: 0.28,
    advectionScale: 0.055,
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
    displayLayerOpacity: 0.58,
    fieldBleedPx: 22,
    maxDpr: 1,
    simulationFps: 30,
    autoSplatIntervalMs: 5600,
    emblemSafeZoneRadius: 0.25,
    emblemSafeZoneEnabled: true,
  },
  medium: {
    simResolution: 96,
    dyeResolution: 384,
    pressureIterations: 6,
    diffusionIterations: 2,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 6,
    interactionRadiusScale: 1.24,
    effectScale: 1,
    splatRadius: 0.01,
    clickSplatRadius: 0.017,
    splatForce: 760,
    clickSplatForce: 1120,
    velocityScale: 0.36,
    advectionScale: 0.105,
    densityDissipation: 0.99835,
    velocityDissipation: 0.9935,
    pressureDissipation: 0.95,
    dyeDiffusion: 0.00125,
    dispersionStrength: 0.42,
    particleCount: 168,
    particleSize: 1.7,
    particleOpacity: 0.3,
    particleDecay: 0.9975,
    displayOpacity: 0.74,
    displayLayerOpacity: 0.7,
    fieldBleedPx: 32,
    maxDpr: 1.1,
    simulationFps: 30,
    autoSplatIntervalMs: 6200,
    emblemSafeZoneRadius: 0.25,
    emblemSafeZoneEnabled: true,
  },
  high: {
    simResolution: 160,
    dyeResolution: 640,
    pressureIterations: 20,
    diffusionIterations: 4,
    maxActiveSplats: 6,
    maxSplatsPerSecond: 6,
    interactionRadiusScale: 14,
    effectScale: 10,
    splatRadius: 0.01,
    clickSplatRadius: 0.017,
    splatForce: 760,
    clickSplatForce: 1180,
    velocityScale: 0.38,
    advectionScale: 0.125,
    densityDissipation: 0.99915,
    velocityDissipation: 0.996,
    pressureDissipation: 0.972,
    dyeDiffusion: 0.0012,
    dispersionStrength: 0.48,
    particleCount: 180,
    particleSize: 1.9,
    particleOpacity: 0.34,
    particleDecay: 0.999,
    displayOpacity: 0.78,
    displayLayerOpacity: 0.72,
    fieldBleedPx: 42,
    maxDpr: 1.2,
    simulationFps: 45,
    autoSplatIntervalMs: 6800,
    emblemSafeZoneRadius: 0.25,
    emblemSafeZoneEnabled: true,
  },
};

export const fluidSplatColors = {
  water: [0.49, 0.91, 0.95],
  electricBlue: [0.08, 0.42, 0.98],
  jade: [0.4, 0.84, 0.68],
  gold: [0.97, 0.79, 0.28],
} as const;
