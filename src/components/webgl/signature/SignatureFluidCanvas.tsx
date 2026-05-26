import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";

import { SignatureFluidPlane } from "./SignatureFluidPlane";
import {
  signatureFluidPresets,
  type SignatureFluidQuality,
} from "./signatureFluidConfig";
import { SignatureWebGLErrorBoundary } from "./SignatureWebGLErrorBoundary";
import { useSignatureFluidPointer } from "./useSignatureFluidPointer";

export type SignatureFluidCanvasProps = {
  className?: string;
  quality?: SignatureFluidQuality;
};

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

function useMobileQuality(quality: SignatureFluidQuality) {
  const [resolved, setResolved] = useState<SignatureFluidQuality>(quality);

  useEffect(() => {
    if (quality !== "medium") {
      setResolved(quality);
      return undefined;
    }

    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setResolved(media.matches ? "low" : "medium");

    update();
    media.addEventListener?.("change", update);

    return () => media.removeEventListener?.("change", update);
  }, [quality]);

  return resolved;
}

export function SignatureFluidCanvas({
  className = "",
  quality = "medium",
}: SignatureFluidCanvasProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [supported, setSupported] = useState(false);
  const reducedMotion = useReducedMotion();
  const resolvedQuality = useMobileQuality(quality);
  const pointerState = useSignatureFluidPointer(rootRef);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  const config = useMemo(
    () => signatureFluidPresets[resolvedQuality],
    [resolvedQuality],
  );

  const fallback = (
    <div className={`signatureFluidFallback ${className}`} aria-hidden="true" />
  );

  if (!supported || reducedMotion || resolvedQuality === "off") {
    return fallback;
  }

  return (
    <div
      ref={rootRef}
      className={`signatureFluidCanvas ${className}`}
      aria-hidden="true"
    >
      <SignatureWebGLErrorBoundary fallback={fallback}>
        <Canvas
          dpr={[1, config.maxDpr]}
          camera={{ position: [0, 0, 1], fov: 50 }}
          gl={{
            alpha: true,
            antialias: false,
            depth: false,
            stencil: false,
            powerPreference: "low-power",
          }}
        >
          <Suspense fallback={null}>
            <SignatureFluidPlane config={config} pointerState={pointerState} />
          </Suspense>
        </Canvas>
      </SignatureWebGLErrorBoundary>
    </div>
  );
}
