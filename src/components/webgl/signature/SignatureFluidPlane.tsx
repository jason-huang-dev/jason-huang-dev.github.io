import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import type { SignatureFluidConfig } from "./signatureFluidConfig";
import {
  signatureFluidFragmentShader,
  signatureFluidVertexShader,
} from "./signatureFluidShader";
import type { SignaturePointerState } from "./useSignatureFluidPointer";

export function SignatureFluidPlane({
  config,
  pointerState,
}: {
  config: SignatureFluidConfig;
  pointerState: SignaturePointerState;
}) {
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uRipple: { value: new THREE.Vector4(0.5, 0.5, -10, 0) },
      uPointerStrength: { value: config.pointerStrength },
      uRippleStrength: { value: config.rippleStrength },
      uFlowSpeed: { value: config.flowSpeed },
      uDistortionStrength: { value: config.distortionStrength },
      uColorIntensity: { value: config.colorIntensity },
    }),
    [config, size.width, size.height],
  );

  useEffect(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
  }, [size.width, size.height]);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;

    const elapsed = state.clock.elapsedTime;
    const [x, y] = pointerState.pointer.current;
    const ripple = pointerState.ripple.current;

    material.uniforms.uTime.value = elapsed;
    material.uniforms.uPointer.value.set(x, y);
    material.uniforms.uRipple.value.set(
      ripple.x,
      ripple.y,
      ripple.startedAt,
      ripple.strength,
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={signatureFluidVertexShader}
        fragmentShader={signatureFluidFragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
