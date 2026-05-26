import { WaterPearlField } from "./WaterPearlField";

type WaterBackdropProps = {
  className?: string;
};

export function WaterBackdrop({ className = "" }: WaterBackdropProps) {
  return (
    <div className={`waterBackdrop ${className}`} aria-hidden="true">
      <span className="waterBackdrop__ring waterBackdrop__ring--one" />
      <span className="waterBackdrop__ring waterBackdrop__ring--two" />
      <span className="waterBackdrop__current" />
      <WaterPearlField density="minimal" className="waterBackdrop__pearls" />
      <span className="waterBackdrop__grid" />
    </div>
  );
}
