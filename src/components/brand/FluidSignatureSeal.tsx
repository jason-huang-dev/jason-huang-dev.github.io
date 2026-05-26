import { useRef, type CSSProperties } from "react";

import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import {
  FluidCanvas,
  type FluidCanvasProps,
} from "../webgl/fluid-lite/FluidCanvas";

export type FluidSignatureSealProps = {
  quality?: FluidCanvasProps["quality"];
  fluidOpacity?: number;
  fieldBleed?: number;
  emblemDepth?: "front" | "embedded" | "back";
  interactionRadiusScale?: number;
  pointerPassthrough?: boolean;
};

export const defaultFluidSignatureSealProps = {
  quality: "cinematic",
  fluidOpacity: 0.96,
  fieldBleed: 44,
  emblemDepth: "embedded",
  interactionRadiusScale: 4.8,
  pointerPassthrough: true,
} satisfies Required<FluidSignatureSealProps>;

type FluidSignatureSealStyle = CSSProperties & {
  "--fluid-layer-opacity": number;
  "--fluid-field-bleed": string;
};

export function FluidSignatureSeal({
  quality = defaultFluidSignatureSealProps.quality,
  fluidOpacity = defaultFluidSignatureSealProps.fluidOpacity,
  fieldBleed = defaultFluidSignatureSealProps.fieldBleed,
  emblemDepth = defaultFluidSignatureSealProps.emblemDepth,
  interactionRadiusScale = defaultFluidSignatureSealProps.interactionRadiusScale,
  pointerPassthrough = defaultFluidSignatureSealProps.pointerPassthrough,
}: FluidSignatureSealProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={panelRef}
      className="fluidSignatureSeal heroFluidSimulationPanel"
      data-emblem-depth={emblemDepth}
      data-pointer-passthrough={pointerPassthrough ? "true" : "false"}
      style={
        {
          "--fluid-layer-opacity": fluidOpacity,
          "--fluid-field-bleed": `${fieldBleed}px`,
        } as FluidSignatureSealStyle
      }
    >
      <div
        className="fluidSignatureSeal__clip heroFluidSimulationPanel__clip"
        aria-hidden="true"
      >
        <span className="fluidSignatureSeal__waterGlass" />

        <SignatureEmblem
          className="fluidSignatureSeal__emblem heroFluidSimulationPanel__signature"
          glow="gold"
        />

        <FluidCanvas
          className="fluidSignatureSeal__fluid"
          quality={quality}
          opacity={fluidOpacity}
          bleed={fieldBleed}
          interactionRadiusScale={interactionRadiusScale}
          interactionTargetRef={panelRef}
        />

        <span className="fluidSignatureSeal__glassSheen" />
      </div>

      <ChineseAccentText className="fluidSignatureSeal__verticalText" />
    </div>
  );
}
