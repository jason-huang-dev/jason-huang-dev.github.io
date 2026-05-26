import { Canvas } from "@react-three/fiber";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  FluidSimulationController,
  type FluidDebugMode,
} from "./FluidSimulationController";
import {
  fluidLitePresets,
  type FluidLiteQuality,
} from "./fluidLiteConfig";
import {
  useFluidPointerSplats,
  type FluidSplat,
} from "./useFluidPointerSplats";
import { SignatureWebGLErrorBoundary } from "../signature/SignatureWebGLErrorBoundary";

export type FluidCanvasProps = {
  quality?: FluidLiteQuality;
  className?: string;
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

function useResponsiveQuality(quality: FluidLiteQuality) {
  const [resolved, setResolved] = useState<FluidLiteQuality>(quality);

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

function parseDebugMode(value: string | null): FluidDebugMode {
  if (value === "dye" || value === "velocity" || value === "pressure") {
    return value;
  }

  return "off";
}

function useFluidDebugMode() {
  const [debugMode, setDebugMode] = useState<FluidDebugMode>("off");

  useEffect(() => {
    const update = () => {
      const params = new URLSearchParams(window.location.search);
      const fromQuery = parseDebugMode(params.get("fluidDebug"));
      const fromStorage = parseDebugMode(
        window.localStorage.getItem("fluidDebug"),
      );
      setDebugMode(fromQuery !== "off" ? fromQuery : fromStorage);
    };

    update();
    window.addEventListener("popstate", update);

    return () => window.removeEventListener("popstate", update);
  }, []);

  return debugMode;
}

export function FluidCanvas({
  quality = "medium",
  className = "",
}: FluidCanvasProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const splatsRef = useRef<FluidSplat[]>([]);
  const [supported, setSupported] = useState(false);
  const reducedMotion = useReducedMotion();
  const debugMode = useFluidDebugMode();
  const resolvedQuality = useResponsiveQuality(quality);
  const config = useMemo(
    () => fluidLitePresets[resolvedQuality],
    [resolvedQuality],
  );
  const pushSplat = useCallback((splat: FluidSplat) => {
    splatsRef.current.push(splat);
    if (splatsRef.current.length > config.maxActiveSplats) {
      splatsRef.current.splice(
        0,
        splatsRef.current.length - config.maxActiveSplats,
      );
    }
  }, [config.maxActiveSplats]);

  useEffect(() => {
    setSupported(supportsWebGL());
  }, []);

  useFluidPointerSplats(rootRef, {
    enabled: supported && !reducedMotion && resolvedQuality !== "off",
    config,
    pushSplat,
  });

  const fallback = (
    <div className={`fluidCanvasFallback ${className}`} aria-hidden="true" />
  );

  if (!supported || reducedMotion || resolvedQuality === "off") {
    return fallback;
  }

  return (
    <div ref={rootRef} className={`fluidCanvas ${className}`} aria-hidden="true">
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
            <FluidSimulationController
              config={config}
              debugMode={debugMode}
              splatsRef={splatsRef}
            />
          </Suspense>
        </Canvas>
      </SignatureWebGLErrorBoundary>
    </div>
  );
}
