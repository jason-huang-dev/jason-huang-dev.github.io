export type WaterLightFieldProps = {
  intensity?: "subtle" | "medium";
  variant?: "hero" | "section" | "ambient";
  className?: string;
};

export function WaterLightField({
  intensity = "subtle",
  variant = "ambient",
  className = "",
}: WaterLightFieldProps) {
  return (
    <div
      className={`waterLightField waterLightField--${variant} waterLightField--${intensity} ${className}`}
      aria-hidden="true"
    >
      <span className="waterLightField__caustic" />
      <span className="waterLightField__glow waterLightField__glow--one" />
      <span className="waterLightField__glow waterLightField__glow--two" />
    </div>
  );
}
