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

export function BrandMark({
  variant = "seal",
  size = "md",
  className = "",
}: BrandMarkProps) {
  const seal = (
    <span className={`brandMark__seal ${sizeClass[size]}`} aria-hidden="true">
      黄
    </span>
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
