import type { CSSProperties } from "react";

export type WaterPearl = {
  id: string;
  size: "xs" | "sm" | "md" | "lg";
  tone: "water" | "gold" | "jade" | "ink";
  x: number;
  y: number;
  delay?: number;
  label?: string;
};

export type WaterPearlFieldProps = {
  pearls?: WaterPearl[];
  density?: "minimal" | "balanced" | "rich";
  interactive?: boolean;
  className?: string;
};

const defaultPearls: WaterPearl[] = [
  { id: "water-1", size: "lg", tone: "water", x: 18, y: 22, delay: 0 },
  { id: "gold-1", size: "sm", tone: "gold", x: 76, y: 18, delay: 0.12 },
  { id: "jade-1", size: "md", tone: "jade", x: 68, y: 72, delay: 0.28 },
  { id: "ink-1", size: "xs", tone: "ink", x: 32, y: 78, delay: 0.42 },
];

const sizeClassMap = {
  xs: "waterPearl--xs",
  sm: "waterPearl--sm",
  md: "waterPearl--md",
  lg: "waterPearl--lg",
};

export function WaterPearlField({
  pearls = defaultPearls,
  density = "balanced",
  interactive = false,
  className = "",
}: WaterPearlFieldProps) {
  return (
    <div
      className={`waterPearlField waterPearlField--${density} ${className}`}
      aria-hidden={!interactive}
    >
      {pearls.map((pearl) => {
        const pearlStyle = {
          "--pearl-x": `${pearl.x}%`,
          "--pearl-y": `${pearl.y}%`,
          "--pearl-delay": `${pearl.delay ?? 0}s`,
        } as CSSProperties;
        const pearlClass = [
          "waterPearl",
          sizeClassMap[pearl.size],
          `waterPearl--${pearl.tone}`,
        ].join(" ");

        if (interactive && pearl.label) {
          return (
            <button
              key={pearl.id}
              type="button"
              className={pearlClass}
              style={pearlStyle}
              aria-label={pearl.label}
            />
          );
        }

        return (
          <span
            key={pearl.id}
            className={pearlClass}
            style={pearlStyle}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
