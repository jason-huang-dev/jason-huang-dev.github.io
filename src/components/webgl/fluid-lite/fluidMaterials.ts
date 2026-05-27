import * as THREE from "three";

import { baseVertexShader } from "./shaders/baseVertex";
import { advectionShader } from "./shaders/advection";
import { displayShader } from "./shaders/display";
import { diffusionShader } from "./shaders/diffusion";
import { divergenceShader } from "./shaders/divergence";
import { gradientSubtractShader } from "./shaders/gradientSubtract";
import { pressureShader } from "./shaders/pressure";
import { splatShader } from "./shaders/splat";

function makeMaterial(fragmentShader: string, uniforms: Record<string, any>) {
  return new THREE.ShaderMaterial({
    vertexShader: baseVertexShader,
    fragmentShader,
    uniforms,
    depthWrite: false,
    depthTest: false,
    transparent: true,
  });
}

export function createFluidMaterials() {
  const materials = {
    splat: makeMaterial(splatShader, {
      uTarget: { value: null },
      uPoint: { value: new THREE.Vector2() },
      uColor: { value: new THREE.Vector3() },
      uRadius: { value: 0.02 },
      uAspectRatio: { value: 1 },
    }),
    advection: makeMaterial(advectionShader, {
      uVelocity: { value: null },
      uSource: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
      uDt: { value: 0.016 },
      uDissipation: { value: 0.98 },
      uAdvectionScale: { value: 1 },
    }),
    divergence: makeMaterial(divergenceShader, {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    diffusion: makeMaterial(diffusionShader, {
      uSource: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
      uDiffusion: { value: 0.001 },
      uDissipation: { value: 1 },
    }),
    pressure: makeMaterial(pressureShader, {
      uPressure: { value: null },
      uDivergence: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
      uDissipation: { value: 0.94 },
    }),
    gradientSubtract: makeMaterial(gradientSubtractShader, {
      uPressure: { value: null },
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    display: makeMaterial(displayShader, {
      uDye: { value: null },
      uVelocity: { value: null },
      uPressure: { value: null },
      uTime: { value: 0 },
      uOpacity: { value: 0.7 },
      uDispersionStrength: { value: 0.32 },
      uDyeColorGain: { value: 1.4 },
      uDyeChromaBoost: { value: 1.15 },
      uDyeContrast: { value: 1.08 },
      uBaseWaterOpacity: { value: 0.18 },
      uActiveDyeOpacity: { value: 0.78 },
      uWavefrontAlphaBias: { value: 1 },
      uMaxDyeLuminance: { value: 0.82 },
      uWhiteClipSoftness: { value: 0.18 },
      uBaseColor: { value: new THREE.Color(0.012, 0.039, 0.067) },
      uGoldBias: { value: new THREE.Color(0.969, 0.788, 0.282) },
      uVignetteStrength: { value: 0.68 },
      uDebugMode: { value: 0 },
    }),
  };

  return {
    ...materials,
    dispose() {
      Object.values(materials).forEach((material) => material.dispose());
    },
  };
}
