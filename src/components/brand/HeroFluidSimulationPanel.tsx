import { useRef, type CSSProperties } from "react";

import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import { FluidCanvas } from "../webgl/fluid-lite/FluidCanvas";

export type HeroFluidSimulationPanelProps = {
  fluidOpacity?: number;
  fieldBleed?: number;
  emblemDepth?: "front" | "embedded" | "back";
  interactionRadiusScale?: number;
  pointerPassthrough?: boolean;
};

const defaultHeroFluidPanelProps = {
  fluidOpacity: 0.68,
  fieldBleed: 28,
  emblemDepth: "embedded",
  interactionRadiusScale: 1.18,
  pointerPassthrough: true,
} satisfies Required<HeroFluidSimulationPanelProps>;

type HeroFluidPanelStyle = CSSProperties & {
  "--fluid-layer-opacity": number;
  "--fluid-field-bleed": string;
};

export function HeroFluidSimulationPanel({
  fluidOpacity = defaultHeroFluidPanelProps.fluidOpacity,
  fieldBleed = defaultHeroFluidPanelProps.fieldBleed,
  emblemDepth = defaultHeroFluidPanelProps.emblemDepth,
  interactionRadiusScale = defaultHeroFluidPanelProps.interactionRadiusScale,
  pointerPassthrough = defaultHeroFluidPanelProps.pointerPassthrough,
}: HeroFluidSimulationPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={panelRef}
      className="heroFluidSimulationPanel"
      data-emblem-depth={emblemDepth}
      data-pointer-passthrough={pointerPassthrough ? "true" : "false"}
      style={
        {
          "--fluid-layer-opacity": fluidOpacity,
          "--fluid-field-bleed": `${fieldBleed}px`,
        } as HeroFluidPanelStyle
      }
    >
      <div className="heroFluidSimulationPanel__clip" aria-hidden="true">
        <SignatureEmblem
          className="heroFluidSimulationPanel__signature"
          glow="gold"
        />

        <FluidCanvas
          quality="high"
          opacity={fluidOpacity}
          bleed={fieldBleed}
          interactionRadiusScale={interactionRadiusScale}
          interactionTargetRef={panelRef}
        />

        <span className="heroFluidSimulationPanel__safeZone" aria-hidden="true" />

        <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--outer" />
        <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--inner" />

        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--large" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--gold" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--water" />
        <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--jade" />
      </div>

      <ChineseAccentText />
    </div>
  );
}
