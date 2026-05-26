import {
  FluidSignatureSeal,
  type FluidSignatureSealProps,
} from "./FluidSignatureSeal";

export type HeroFluidSimulationPanelProps = FluidSignatureSealProps;

export function HeroFluidSimulationPanel(props: HeroFluidSimulationPanelProps) {
  return <FluidSignatureSeal {...props} />;
}
