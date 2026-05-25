import { BrandAsset } from "./BrandAsset";

type SignatureEmblemProps = {
  className?: string;
  decorative?: boolean;
};

export function SignatureEmblem({
  className = "",
  decorative = true,
}: SignatureEmblemProps) {
  return (
    <span className={`signatureEmblem ${className}`}>
      <BrandAsset
        id="signatureEmblem"
        className="signatureEmblem__asset"
        decorative={decorative}
      />
    </span>
  );
}
