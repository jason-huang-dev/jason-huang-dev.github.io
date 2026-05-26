import * as THREE from "three";

import { baseVertexShader } from "./shaders/baseVertex";
import { advectionShader } from "./shaders/advection";
import { displayShader } from "./shaders/display";
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
    }),
    divergence: makeMaterial(divergenceShader, {
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    pressure: makeMaterial(pressureShader, {
      uPressure: { value: null },
      uDivergence: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    gradientSubtract: makeMaterial(gradientSubtractShader, {
      uPressure: { value: null },
      uVelocity: { value: null },
      uTexelSize: { value: new THREE.Vector2() },
    }),
    display: makeMaterial(displayShader, {
      uDye: { value: null },
      uTime: { value: 0 },
    }),
  };

  return {
    ...materials,
    dispose() {
      Object.values(materials).forEach((material) => material.dispose());
    },
  };
}
