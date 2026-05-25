import { getBrandAsset, type BrandAssetId } from "../../data/brandAssets";

type BrandAssetProps = {
  id: BrandAssetId;
  className?: string;
  decorative?: boolean;
};

export function BrandAsset({
  id,
  className = "",
  decorative = false,
}: BrandAssetProps) {
  const asset = getBrandAsset(id);

  if (!asset) return null;

  return (
    <img
      className={className}
      src={asset.src}
      alt={decorative || asset.usage === "decorative" ? "" : asset.alt}
      aria-hidden={decorative || asset.usage === "decorative" ? "true" : undefined}
      loading="lazy"
      decoding="async"
    />
  );
}
