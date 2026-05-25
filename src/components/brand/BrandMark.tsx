import { brandAssets } from "../../data/brandAssets";

export type BrandMarkVariant = "seal" | "horizontal" | "minimal";

export type BrandMarkProps = {
  variant?: BrandMarkVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClass = {
  sm: "brandMark--sm",
  md: "brandMark--md",
  lg: "brandMark--lg",
};

const imageSize = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function BrandMark({
  variant = "seal",
  size = "md",
  className = "",
}: BrandMarkProps) {
  // Brand rule: the square 黄 seal is the only mark used in compact UI areas.
  const seal = (
    <img
      className={`brandMark__seal ${sizeClass[size]}`}
      src={brandAssets.seal}
      alt=""
      aria-hidden="true"
      width={imageSize[size]}
      height={imageSize[size]}
      decoding="async"
    />
  );

  if (variant === "minimal" || variant === "seal") {
    return <span className={`brandMark ${className}`}>{seal}</span>;
  }

  return (
    <span className={`brandMark brandMark--horizontal ${className}`}>
      {seal}
      <span className="brandMark__word">
        <strong>Jason Huang</strong>
        <small>Water · Systems · Clarity</small>
      </span>
    </span>
  );
}
