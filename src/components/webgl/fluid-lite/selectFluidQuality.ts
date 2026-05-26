import type { FluidLiteQuality } from "./fluidLiteConfig";

export function selectHeroFluidQuality(options: {
  requested?: FluidLiteQuality;
  reducedMotion: boolean;
  width: number;
  pointerFine: boolean;
  devicePixelRatio: number;
}): FluidLiteQuality {
  if (options.reducedMotion) {
    return "off";
  }

  if (options.width < 768) {
    return options.requested === "off" ? "off" : "low";
  }

  if (!options.pointerFine || options.devicePixelRatio > 2) {
    return options.requested === "off" ? "off" : "medium";
  }

  return options.requested ?? "high";
}
