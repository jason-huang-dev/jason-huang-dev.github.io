export const brandAssets = {
  seal: "/brand/svgs/huang-seal.svg",
  // signatureEmblem: "/brand/svgs/brand-emblem.svg",
  signatureEmblem: "/brand/pngs/brand-emblem.png",
  yinyang: {
    // emblem: "/brand/svgs/brand-emblem.svg",
    emblem: "/brand/pngs/brand-emblem.png",
    lightLeft: "/brand/svgs/light-yang.svg",
    lightRight: "/brand/svgs/light-yin.svg",
    darkLeft: "/brand/svgs/dark-yang.svg",
    darkRight: "/brand/svgs/dark-yin.svg",
  },
} as const;

export type BrandAssetId =
  | "seal"
  | "signatureEmblem"
  | "yinyangEmblem"
  | "yinyangLightLeft"
  | "yinyangLightRight"
  | "yinyangDarkLeft"
  | "yinyangDarkRight";

export type BrandAsset = {
  id: BrandAssetId;
  src: string;
  alt: string;
  usage: "primary-ui" | "signature" | "decorative";
  preferredBackground: "dark" | "light" | "any";
};

const brandAssetMap: Record<BrandAssetId, BrandAsset> = {
  seal: {
    id: "seal",
    src: brandAssets.seal,
    alt: "Jason Huang seal mark",
    usage: "primary-ui",
    preferredBackground: "any",
  },
  signatureEmblem: {
    id: "signatureEmblem",
    src: brandAssets.signatureEmblem,
    alt: "Jason Huang signature emblem",
    usage: "signature",
    preferredBackground: "dark",
  },
  yinyangEmblem: {
    id: "yinyangEmblem",
    src: brandAssets.yinyang.emblem,
    alt: "",
    usage: "decorative",
    preferredBackground: "any",
  },
  yinyangLightLeft: {
    id: "yinyangLightLeft",
    src: brandAssets.yinyang.lightLeft,
    alt: "",
    usage: "decorative",
    preferredBackground: "light",
  },
  yinyangLightRight: {
    id: "yinyangLightRight",
    src: brandAssets.yinyang.lightRight,
    alt: "",
    usage: "decorative",
    preferredBackground: "light",
  },
  yinyangDarkLeft: {
    id: "yinyangDarkLeft",
    src: brandAssets.yinyang.darkLeft,
    alt: "",
    usage: "decorative",
    preferredBackground: "dark",
  },
  yinyangDarkRight: {
    id: "yinyangDarkRight",
    src: brandAssets.yinyang.darkRight,
    alt: "",
    usage: "decorative",
    preferredBackground: "dark",
  },
};

export const yinyangAssetsByMode = {
  light: {
    left: brandAssets.yinyang.lightLeft,
    right: brandAssets.yinyang.lightRight,
    emblem: brandAssets.yinyang.emblem,
  },
  dark: {
    left: brandAssets.yinyang.darkLeft,
    right: brandAssets.yinyang.darkRight,
    emblem: brandAssets.yinyang.emblem,
  },
} as const;

export function getBrandAsset(id: BrandAssetId) {
  return brandAssetMap[id];
}
