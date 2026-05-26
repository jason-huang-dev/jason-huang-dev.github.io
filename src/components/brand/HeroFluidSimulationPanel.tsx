import {
  LiquidSealReactor,
  type LiquidSealReactorProps,
} from "./LiquidSealReactor";

export type HeroFluidSimulationPanelProps = LiquidSealReactorProps;

export function HeroFluidSimulationPanel(props: HeroFluidSimulationPanelProps) {
  return <LiquidSealReactor {...props} />;
}
