import { BrandAsset } from "./BrandAsset";

type SignatureEmblemProps = {
  className?: string;
  decorative?: boolean;
  framed?: boolean;
  glow?: "none" | "water" | "gold";
};

export function SignatureEmblem({
  className = "",
  decorative = true,
  framed = false,
  glow = "none",
}: SignatureEmblemProps) {
  return (
    <span
      className={`signatureEmblem ${
        framed ? "signatureEmblem--framed" : ""
      } signatureEmblem--glow-${glow} ${className}`}
    >
      <BrandAsset
        id="signatureEmblem"
        className="signatureEmblem__asset"
        decorative={decorative}
      />
    </span>
  );
}
