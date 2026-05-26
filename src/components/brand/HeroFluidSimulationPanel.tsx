import { ChineseAccentText } from "./ChineseAccentText";
import { SignatureEmblem } from "./SignatureEmblem";
import { FluidCanvas } from "../webgl/fluid-lite/FluidCanvas";

export function HeroFluidSimulationPanel() {
  return (
    <div className="heroFluidSimulationPanel">
      <FluidCanvas quality="medium" />

      <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--outer" />
      <span className="heroFluidSimulationPanel__ring heroFluidSimulationPanel__ring--inner" />

      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--large" />
      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--gold" />
      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--water" />
      <span className="heroFluidSimulationPanel__pearl heroFluidSimulationPanel__pearl--jade" />

      <SignatureEmblem
        className="heroFluidSimulationPanel__signature"
        glow="gold"
      />
      <ChineseAccentText />
    </div>
  );
}
