import * as THREE from "three";

export type PingPongTarget = {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;
  swap: () => void;
  dispose: () => void;
};

function createTarget(width: number, height: number) {
  return new THREE.WebGLRenderTarget(width, height, {
    type: THREE.HalfFloatType,
    format: THREE.RGBAFormat,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    wrapS: THREE.ClampToEdgeWrapping,
    wrapT: THREE.ClampToEdgeWrapping,
    depthBuffer: false,
    stencilBuffer: false,
  });
}

export function createPingPongTarget(width: number, height: number): PingPongTarget {
  const targetA = createTarget(width, height);
  const targetB = createTarget(width, height);

  const target: PingPongTarget = {
    read: targetA,
    write: targetB,
    swap: () => {
      const next = target.read;
      target.read = target.write;
      target.write = next;
    },
    dispose: () => {
      targetA.dispose();
      targetB.dispose();
    },
  };

  return target;
}

export function createFluidRenderTargets(config: {
  simResolution: number;
  dyeResolution: number;
  aspect: number;
}) {
  const simWidth = Math.max(1, Math.round(config.simResolution * config.aspect));
  const simHeight = config.simResolution;
  const dyeWidth = Math.max(1, Math.round(config.dyeResolution * config.aspect));
  const dyeHeight = config.dyeResolution;

  return {
    velocity: createPingPongTarget(simWidth, simHeight),
    dye: createPingPongTarget(dyeWidth, dyeHeight),
    pressure: createPingPongTarget(simWidth, simHeight),
    divergence: createTarget(simWidth, simHeight),
    simTexelSize: new THREE.Vector2(1 / simWidth, 1 / simHeight),
    dyeTexelSize: new THREE.Vector2(1 / dyeWidth, 1 / dyeHeight),
    dispose() {
      this.velocity.dispose();
      this.dye.dispose();
      this.pressure.dispose();
      this.divergence.dispose();
    },
  };
}
