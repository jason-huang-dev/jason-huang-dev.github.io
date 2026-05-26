export type SignatureFluidQuality = "off" | "low" | "medium";

export type SignatureFluidConfig = {
  maxDpr: number;
  pointerStrength: number;
  rippleStrength: number;
  flowSpeed: number;
  distortionStrength: number;
  colorIntensity: number;
};

export const signatureFluidPresets: Record<
  SignatureFluidQuality,
  SignatureFluidConfig
> = {
  off: {
    maxDpr: 1,
    pointerStrength: 0,
    rippleStrength: 0,
    flowSpeed: 0,
    distortionStrength: 0,
    colorIntensity: 0,
  },
  low: {
    maxDpr: 1,
    pointerStrength: 0.18,
    rippleStrength: 0.22,
    flowSpeed: 0.18,
    distortionStrength: 0.08,
    colorIntensity: 0.42,
  },
  medium: {
    maxDpr: 1.15,
    pointerStrength: 0.26,
    rippleStrength: 0.32,
    flowSpeed: 0.24,
    distortionStrength: 0.12,
    colorIntensity: 0.55,
  },
};
