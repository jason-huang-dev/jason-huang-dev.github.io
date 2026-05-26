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

  if (options.requested === "cinematic") {
    if (
      options.width >= 1024 &&
      options.pointerFine &&
      options.devicePixelRatio <= 2
    ) {
      return "cinematic";
    }

    if (options.width >= 768) {
      return "high";
    }

    return "medium";
  }

  if (!options.pointerFine || options.devicePixelRatio > 2) {
    return options.requested === "off" ? "off" : "medium";
  }

  return options.requested ?? "cinematic";
}
