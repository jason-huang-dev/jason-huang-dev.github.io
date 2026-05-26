import * as THREE from "three";

import type { FluidLiteConfig } from "./fluidLiteConfig";
import type { FluidSplat } from "./useFluidPointerSplats";
import { isInsideEmblemSafeZone } from "./useFluidPointerSplats";
import {
  particleFragmentShader,
  particleVertexShader,
} from "./shaders/particle";

type FluidParticleSystem = {
  points: THREE.Points;
  update: (dt: number, now: number, splats: FluidSplat[]) => void;
  dispose: () => void;
};

function randomOutsideSafeZone(radius: number) {
  let x = 0.5;
  let y = 0.5;

  for (let i = 0; i < 12; i += 1) {
    x = 0.08 + Math.random() * 0.84;
    y = 0.08 + Math.random() * 0.84;

    if (!isInsideEmblemSafeZone(x, y, radius)) break;
  }

  return { x, y };
}

function writeParticlePosition(
  positions: Float32Array,
  index: number,
  x: number,
  y: number,
) {
  positions[index * 3] = x * 2 - 1;
  positions[index * 3 + 1] = y * 2 - 1;
  positions[index * 3 + 2] = 0;
}

export function createFluidParticleSystem(
  config: FluidLiteConfig,
): FluidParticleSystem {
  const count = Math.min(config.particleCount, 180);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const life = new Float32Array(count);
  const uv = new Float32Array(count * 2);

  for (let i = 0; i < count; i += 1) {
    const point = randomOutsideSafeZone(config.emblemSafeZoneRadius);
    uv[i * 2] = point.x;
    uv[i * 2 + 1] = point.y;
    life[i] = 0.35 + Math.random() * 0.65;
    writeParticlePosition(positions, i, point.x, point.y);

    const colorPick = Math.random();
    const color =
      colorPick > 0.96
        ? [0.97, 0.79, 0.28]
        : colorPick > 0.78
          ? [0.4, 0.84, 0.68]
          : [0.49, 0.91, 0.95];

    colors[i * 3] = color[0];
    colors[i * 3 + 1] = color[1];
    colors[i * 3 + 2] = color[2];
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("aLife", new THREE.BufferAttribute(life, 1));
  geometry.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.ShaderMaterial({
    vertexShader: particleVertexShader,
    fragmentShader: particleFragmentShader,
    uniforms: {
      uParticleSize: { value: config.particleSize },
      uOpacity: { value: config.particleOpacity },
    },
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });

  const points = new THREE.Points(geometry, material);

  return {
    points,
    update(dt, now, splats) {
      const positionAttribute = geometry.getAttribute(
        "position",
      ) as THREE.BufferAttribute;
      const lifeAttribute = geometry.getAttribute("aLife") as THREE.BufferAttribute;

      for (let i = 0; i < count; i += 1) {
        let x = uv[i * 2];
        let y = uv[i * 2 + 1];
        let vx = Math.sin(now * 0.23 + y * 8.0) * 0.012;
        let vy = Math.cos(now * 0.19 + x * 7.0) * 0.01;

        splats.forEach((splat) => {
          const dx = x - splat.x;
          const dy = y - splat.y;
          const distanceSq = dx * dx + dy * dy;
          const influence = Math.exp(-distanceSq / 0.018) * 0.7;
          const force = splat.force ?? 1;
          vx += splat.dx * force * influence;
          vy += splat.dy * force * influence;
        });

        x += vx * dt;
        y += vy * dt;
        life[i] *= config.particleDecay;

        if (
          x < 0.03 ||
          x > 0.97 ||
          y < 0.03 ||
          y > 0.97 ||
          life[i] < 0.16 ||
          isInsideEmblemSafeZone(x, y, config.emblemSafeZoneRadius * 0.76)
        ) {
          const point = randomOutsideSafeZone(config.emblemSafeZoneRadius);
          x = point.x;
          y = point.y;
          life[i] = 0.58 + Math.random() * 0.42;
        }

        uv[i * 2] = x;
        uv[i * 2 + 1] = y;
        writeParticlePosition(positions, i, x, y);
      }

      positionAttribute.needsUpdate = true;
      lifeAttribute.needsUpdate = true;
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}
