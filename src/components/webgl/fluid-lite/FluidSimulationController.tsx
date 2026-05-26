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
import type { FluidSplat } from "./useFluidPointerSplats";

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
  const camera = useMemo(() => new THREE.Camera(), []);
  const quad = useMemo(() => new THREE.Mesh(new THREE.PlaneGeometry(2, 2)), []);

  useEffect(() => {
    scene.add(quad);
    return () => {
      scene.remove(quad);
      quad.geometry.dispose();
    };
  }, [quad, scene]);

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
    };
  }, [materials, targets]);

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
    color: [number, number, number],
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

  useFrame((state) => {
    if (hiddenRef.current) return;

    const now = state.clock.elapsedTime;
    if (now - lastStepRef.current < 1 / 30) return;

    const dt = Math.min(now - lastStepRef.current || 1 / 30, 1 / 24);
    lastStepRef.current = now;

    if (
      config.autoSplatIntervalMs > 0 &&
      now * 1000 - lastAmbientRef.current > config.autoSplatIntervalMs
    ) {
      lastAmbientRef.current = now * 1000;
      splatsRef.current.push({
        x: 0.35 + Math.sin(now * 0.43) * 0.18,
        y: 0.45 + Math.cos(now * 0.31) * 0.16,
        dx: 0.008,
        dy: 0.004,
        color: now % 2 > 1 ? fluidSplatColors.jade : fluidSplatColors.water,
        radius: config.splatRadius * 1.25,
        force: 0.45,
      });
    }

    const pendingSplats = splatsRef.current.splice(0, 4);
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
    advect(
      targets.dye,
      targets.dye,
      targets.dyeTexelSize,
      config.densityDissipation,
      dt,
    );

    materials.divergence.uniforms.uVelocity.value = targets.velocity.read.texture;
    materials.divergence.uniforms.uTexelSize.value.copy(targets.simTexelSize);
    renderMaterial(materials.divergence, targets.divergence);

    for (let i = 0; i < config.pressureIterations; i += 1) {
      materials.pressure.uniforms.uPressure.value = targets.pressure.read.texture;
      materials.pressure.uniforms.uDivergence.value = targets.divergence.texture;
      materials.pressure.uniforms.uTexelSize.value.copy(targets.simTexelSize);
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
    renderMaterial(materials.display, null);
  }, 1);

  return null;
}
