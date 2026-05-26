import { useRef, type CSSProperties } from "react";

import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import {
  FluidCanvas,
  type FluidCanvasProps,
} from "../webgl/fluid-lite/FluidCanvas";

export type LiquidSealReactorProps = {
  quality?: FluidCanvasProps["quality"];
  fluidOpacity?: number;
  fieldBleed?: number;
  emblemDepth?: "front" | "embedded" | "back";
  interactionRadiusScale?: number;
  pointerPassthrough?: boolean;
  centralRingInteractive?: boolean;
  ringPulseScale?: number;
  showPearlEmitters?: boolean;
};

export const defaultLiquidSealReactorProps = {
  quality: "cinematic",
  fluidOpacity: 0.72,
  fieldBleed: 40,
  emblemDepth: "embedded",
  interactionRadiusScale: 5,
  pointerPassthrough: true,
  centralRingInteractive: true,
  ringPulseScale: 1,
  showPearlEmitters: true,
} satisfies Required<LiquidSealReactorProps>;

type LiquidSealReactorStyle = CSSProperties & {
  "--fluid-layer-opacity": number;
  "--fluid-field-bleed": string;
  "--ring-pulse-scale": number;
};

export function LiquidSealReactor({
  quality = defaultLiquidSealReactorProps.quality,
  fluidOpacity = defaultLiquidSealReactorProps.fluidOpacity,
  fieldBleed = defaultLiquidSealReactorProps.fieldBleed,
  emblemDepth = defaultLiquidSealReactorProps.emblemDepth,
  interactionRadiusScale = defaultLiquidSealReactorProps.interactionRadiusScale,
  pointerPassthrough = defaultLiquidSealReactorProps.pointerPassthrough,
  centralRingInteractive = defaultLiquidSealReactorProps.centralRingInteractive,
  ringPulseScale = defaultLiquidSealReactorProps.ringPulseScale,
  showPearlEmitters = defaultLiquidSealReactorProps.showPearlEmitters,
}: LiquidSealReactorProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={panelRef}
      className="liquidSealReactor heroFluidSimulationPanel"
      data-emblem-depth={emblemDepth}
      data-pointer-passthrough={pointerPassthrough ? "true" : "false"}
      data-central-ring-interactive={centralRingInteractive ? "true" : "false"}
      style={
        {
          "--fluid-layer-opacity": fluidOpacity,
          "--fluid-field-bleed": `${fieldBleed}px`,
          "--ring-pulse-scale": ringPulseScale,
        } as LiquidSealReactorStyle
      }
    >
      <div className="liquidSealReactor__clip heroFluidSimulationPanel__clip" aria-hidden="true">
        <span className="liquidSealReactor__basin" />

        <SignatureEmblem
          className="liquidSealReactor__sealGhost heroFluidSimulationPanel__signature"
          glow="gold"
        />

        <FluidCanvas
          className="liquidSealReactor__fluid"
          quality={quality}
          opacity={fluidOpacity}
          bleed={fieldBleed}
          interactionRadiusScale={interactionRadiusScale}
          interactionTargetRef={panelRef}
        />

        <span className="liquidSealReactor__ringReactor">
          <span className="liquidSealReactor__ringNode liquidSealReactor__ringNode--water" />
          <span className="liquidSealReactor__ringNode liquidSealReactor__ringNode--jade" />
          <span className="liquidSealReactor__ringNode liquidSealReactor__ringNode--gold" />
          <span className="liquidSealReactor__ringNode liquidSealReactor__ringNode--blue" />
          <span className="liquidSealReactor__ringNode liquidSealReactor__ringNode--innerA" />
          <span className="liquidSealReactor__ringNode liquidSealReactor__ringNode--innerB" />
        </span>

        <span className="liquidSealReactor__safeZone heroFluidSimulationPanel__safeZone" aria-hidden="true" />

        {showPearlEmitters ? (
          <>
            <span className="liquidSealReactor__pearlEmitter liquidSealReactor__pearlEmitter--large heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--large" />
            <span className="liquidSealReactor__pearlEmitter liquidSealReactor__pearlEmitter--gold heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--gold" />
            <span className="liquidSealReactor__pearlEmitter liquidSealReactor__pearlEmitter--water heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--water" />
            <span className="liquidSealReactor__pearlEmitter liquidSealReactor__pearlEmitter--jade heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--jade" />
          </>
        ) : null}

        <span className="liquidSealReactor__specularSweep" />
      </div>

      <ChineseAccentText className="liquidSealReactor__verticalText" />
    </div>
  );
}
