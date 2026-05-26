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
  showDroplets?: boolean;
};

export const defaultFluidSignatureSealProps = {
  quality: "cinematic",
  fluidOpacity: 0.7,
  fieldBleed: 44,
  emblemDepth: "embedded",
  interactionRadiusScale: 4.8,
  pointerPassthrough: true,
  showDroplets: true,
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
  showDroplets = defaultFluidSignatureSealProps.showDroplets,
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

        <span className="fluidSignatureSeal__ambientRing fluidSignatureSeal__ambientRing--one" />
        <span className="fluidSignatureSeal__ambientRing fluidSignatureSeal__ambientRing--two" />

        {showDroplets ? (
          <>
            <span className="fluidSignatureSeal__droplet fluidSignatureSeal__droplet--one" />
            <span className="fluidSignatureSeal__droplet fluidSignatureSeal__droplet--two" />
            <span className="fluidSignatureSeal__droplet fluidSignatureSeal__droplet--three" />
          </>
        ) : null}

        <span className="fluidSignatureSeal__glassSheen" />
      </div>

      <ChineseAccentText className="fluidSignatureSeal__verticalText" />
    </div>
  );
}
