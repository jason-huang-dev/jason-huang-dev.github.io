import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

import {
  createFluidRenderTargets,
  type PingPongTarget,
} from "./FluidRenderTargets";
import { createFluidMaterials } from "./fluidMaterials";
import {
  fluidSplatColors,
  type FluidLiteConfig,
} from "./fluidLiteConfig";
import { createFluidParticleSystem } from "./fluidParticles";
import {
  isInsideEmblemSafeZone,
  type FluidSplat,
} from "./useFluidPointerSplats";

type FluidSimulationControllerProps = {
  config: FluidLiteConfig;
  splatsRef: MutableRefObject<FluidSplat[]>;
};

export function FluidSimulationController({
  config,
  splatsRef,
}: FluidSimulationControllerProps) {
  const { gl, size } = useThree();
  const lastStepRef = useRef(0);
  const lastAmbientRef = useRef(0);
  const hiddenRef = useRef(false);
  const aspect = Math.max(size.width / Math.max(size.height, 1), 1);

  const targets = useMemo(
    () =>
      createFluidRenderTargets({
        simResolution: config.simResolution,
        dyeResolution: config.dyeResolution,
        aspect,
      }),
    [aspect, config.dyeResolution, config.simResolution],
  );

  const materials = useMemo(() => createFluidMaterials(), []);
  const scene = useMemo(() => new THREE.Scene(), []);
  const particleScene = useMemo(() => new THREE.Scene(), []);
  const camera = useMemo(() => new THREE.Camera(), []);
  const quad = useMemo(() => new THREE.Mesh(new THREE.PlaneGeometry(2, 2)), []);
  const particles = useMemo(
    () => createFluidParticleSystem(config),
    [config],
  );

  useEffect(() => {
    scene.add(quad);
    return () => {
      scene.remove(quad);
      quad.geometry.dispose();
    };
  }, [quad, scene]);

  useEffect(() => {
    particleScene.add(particles.points);
    return () => {
      particleScene.remove(particles.points);
    };
  }, [particleScene, particles]);

  useEffect(() => {
    const handleVisibility = () => {
      hiddenRef.current = document.hidden;
    };

    handleVisibility();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useEffect(() => {
    return () => {
      targets.dispose();
      materials.dispose();
      particles.dispose();
    };
  }, [materials, particles, targets]);

  const renderMaterial = (
    material: THREE.Material,
    target: THREE.WebGLRenderTarget | null,
  ) => {
    quad.material = material;
    gl.setRenderTarget(target);
    gl.render(scene, camera);
    gl.setRenderTarget(null);
  };

  const splat = (
    target: PingPongTarget,
    splatData: FluidSplat,
    color: readonly [number, number, number],
    scale = 1,
  ) => {
    materials.splat.uniforms.uTarget.value = target.read.texture;
    materials.splat.uniforms.uPoint.value.set(splatData.x, splatData.y);
    materials.splat.uniforms.uColor.value.set(
      color[0] * scale,
      color[1] * scale,
      color[2] * scale,
    );
    materials.splat.uniforms.uRadius.value = splatData.radius ?? config.splatRadius;
    materials.splat.uniforms.uAspectRatio.value = aspect;
    renderMaterial(materials.splat, target.write);
    target.swap();
  };

  const advect = (
    target: PingPongTarget,
    source: PingPongTarget,
    texelSize: THREE.Vector2,
    dissipation: number,
    dt: number,
  ) => {
    materials.advection.uniforms.uVelocity.value = targets.velocity.read.texture;
    materials.advection.uniforms.uSource.value = source.read.texture;
    materials.advection.uniforms.uTexelSize.value.copy(texelSize);
    materials.advection.uniforms.uDt.value = dt;
    materials.advection.uniforms.uDissipation.value = dissipation;
    renderMaterial(materials.advection, target.write);
    target.swap();
  };

  const diffuse = (
    target: PingPongTarget,
    texelSize: THREE.Vector2,
    diffusion: number,
    dissipation: number,
    iterations: number,
  ) => {
    for (let i = 0; i < iterations; i += 1) {
      materials.diffusion.uniforms.uSource.value = target.read.texture;
      materials.diffusion.uniforms.uTexelSize.value.copy(texelSize);
      materials.diffusion.uniforms.uDiffusion.value = diffusion;
      materials.diffusion.uniforms.uDissipation.value = dissipation;
      renderMaterial(materials.diffusion, target.write);
      target.swap();
    }
  };

  useFrame((state) => {
    if (hiddenRef.current) return;

    const now = state.clock.elapsedTime;
    if (config.simulationFps <= 0) return;
    if (now - lastStepRef.current < 1 / config.simulationFps) return;

    const dt = Math.min(
      now - lastStepRef.current || 1 / config.simulationFps,
      0.033,
    );
    lastStepRef.current = now;

    if (
      config.autoSplatIntervalMs > 0 &&
      now * 1000 - lastAmbientRef.current > config.autoSplatIntervalMs
    ) {
      lastAmbientRef.current = now * 1000;
      const ambientX = 0.35 + Math.sin(now * 0.43) * 0.18;
      const ambientY = 0.45 + Math.cos(now * 0.31) * 0.16;

      if (
        !isInsideEmblemSafeZone(
          ambientX,
          ambientY,
          config.emblemSafeZoneRadius,
        )
      ) {
        splatsRef.current.push({
          x: ambientX,
          y: ambientY,
          dx: 0.008,
          dy: 0.004,
          color: now % 2 > 1 ? fluidSplatColors.jade : fluidSplatColors.water,
          radius: config.splatRadius * 1.25,
          force: 0.45,
        });
      }
    }

    const pendingSplats = splatsRef.current.splice(0, config.maxActiveSplats);
    pendingSplats.forEach((splatData) => {
      const force = splatData.force ?? 1;
      splat(targets.velocity, splatData, [
        splatData.dx * config.splatForce * force,
        splatData.dy * config.splatForce * force,
        0,
      ]);
      splat(targets.dye, splatData, splatData.color, 0.26 * force);
    });

    advect(
      targets.velocity,
      targets.velocity,
      targets.simTexelSize,
      config.velocityDissipation,
      dt,
    );
    diffuse(
      targets.velocity,
      targets.simTexelSize,
      config.dyeDiffusion * 0.38,
      1,
      config.diffusionIterations,
    );
    advect(
      targets.dye,
      targets.dye,
      targets.dyeTexelSize,
      config.densityDissipation,
      dt,
    );
    diffuse(
      targets.dye,
      targets.dyeTexelSize,
      config.dyeDiffusion,
      1,
      config.diffusionIterations,
    );

    materials.divergence.uniforms.uVelocity.value = targets.velocity.read.texture;
    materials.divergence.uniforms.uTexelSize.value.copy(targets.simTexelSize);
    renderMaterial(materials.divergence, targets.divergence);

    for (let i = 0; i < config.pressureIterations; i += 1) {
      materials.pressure.uniforms.uPressure.value = targets.pressure.read.texture;
      materials.pressure.uniforms.uDivergence.value = targets.divergence.texture;
      materials.pressure.uniforms.uTexelSize.value.copy(targets.simTexelSize);
      materials.pressure.uniforms.uDissipation.value = config.pressureDissipation;
      renderMaterial(materials.pressure, targets.pressure.write);
      targets.pressure.swap();
    }

    materials.gradientSubtract.uniforms.uPressure.value =
      targets.pressure.read.texture;
    materials.gradientSubtract.uniforms.uVelocity.value =
      targets.velocity.read.texture;
    materials.gradientSubtract.uniforms.uTexelSize.value.copy(targets.simTexelSize);
    renderMaterial(materials.gradientSubtract, targets.velocity.write);
    targets.velocity.swap();

    materials.display.uniforms.uDye.value = targets.dye.read.texture;
    materials.display.uniforms.uTime.value = now;
    materials.display.uniforms.uOpacity.value = config.displayOpacity;
    materials.display.uniforms.uDispersionStrength.value =
      config.dispersionStrength;
    renderMaterial(materials.display, null);

    particles.update(dt, now, pendingSplats);
    const previousAutoClear = gl.autoClear;
    gl.autoClear = false;
    gl.render(particleScene, camera);
    gl.autoClear = previousAutoClear;
  }, 1);

  return null;
}
