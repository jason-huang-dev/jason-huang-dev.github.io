export type FluidLiteQuality = "off" | "low" | "medium";

export type FluidLiteConfig = {
  simResolution: number;
  dyeResolution: number;
  pressureIterations: number;
  splatRadius: number;
  splatForce: number;
  densityDissipation: number;
  velocityDissipation: number;
  maxDpr: number;
  autoSplatIntervalMs: number;
};

export const fluidLitePresets: Record<FluidLiteQuality, FluidLiteConfig> = {
  off: {
    simResolution: 1,
    dyeResolution: 1,
    pressureIterations: 0,
    splatRadius: 0,
    splatForce: 0,
    densityDissipation: 1,
    velocityDissipation: 1,
    maxDpr: 1,
    autoSplatIntervalMs: 0,
  },
  low: {
    simResolution: 64,
    dyeResolution: 256,
    pressureIterations: 4,
    splatRadius: 0.018,
    splatForce: 1800,
    densityDissipation: 0.985,
    velocityDissipation: 0.965,
    maxDpr: 1,
    autoSplatIntervalMs: 4200,
  },
  medium: {
    simResolution: 96,
    dyeResolution: 384,
    pressureIterations: 6,
    splatRadius: 0.015,
    splatForce: 2400,
    densityDissipation: 0.988,
    velocityDissipation: 0.972,
    maxDpr: 1.1,
    autoSplatIntervalMs: 3600,
  },
};

export const fluidSplatColors = {
  water: [0.49, 0.91, 0.95],
  electricBlue: [0.08, 0.42, 0.98],
  jade: [0.4, 0.84, 0.68],
  gold: [0.97, 0.79, 0.28],
} as const;
