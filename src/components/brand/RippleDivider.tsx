export type RippleDividerProps = {
  variant?: "water" | "gold" | "jade";
  density?: "subtle" | "strong";
  className?: string;
};

export function RippleDivider({
  variant = "water",
  density = "subtle",
  className = "",
}: RippleDividerProps) {
  return (
    <div
      className={`rippleDivider rippleDivider--${variant} rippleDivider--${density} ${className}`}
      aria-hidden="true"
    >
      <span />
      <span />
      <span />
    </div>
  );
}
