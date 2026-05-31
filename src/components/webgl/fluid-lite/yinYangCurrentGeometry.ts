export type YinYangCurrentPoint = {
  x: number;
  y: number;
  tangentX: number;
  tangentY: number;
  normalX: number;
  normalY: number;
};

export function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function rotateAroundCenter(
  x: number,
  y: number,
  angle: number,
): { x: number; y: number } {
  const dx = x - 0.5;
  const dy = y - 0.5;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  return {
    x: 0.5 + dx * cos - dy * sin,
    y: 0.5 + dx * sin + dy * cos,
  };
}

export function sampleYinYangSeam(
  u: number,
  options: {
    amplitude: number;
    length: number;
    tiltRadians: number;
    fieldScale: number;
  },
): YinYangCurrentPoint {
  const clampedU = clamp01(u);
  const centered = clampedU - 0.5;
  const fieldScale = options.fieldScale;
  const phase = centered * Math.PI * 2;
  const baseX = 0.5 + centered * options.length * fieldScale;
  const baseY = 0.5 + Math.sin(phase) * options.amplitude * fieldScale;
  const baseTangentX = options.length * fieldScale;
  const baseTangentY =
    Math.cos(phase) * Math.PI * 2 * options.amplitude * fieldScale;
  const tangentLength = Math.hypot(baseTangentX, baseTangentY) || 1;
  const tangentX = baseTangentX / tangentLength;
  const tangentY = baseTangentY / tangentLength;
  const cos = Math.cos(options.tiltRadians);
  const sin = Math.sin(options.tiltRadians);
  const rotated = rotateAroundCenter(baseX, baseY, options.tiltRadians);
  const rotatedTangentX = tangentX * cos - tangentY * sin;
  const rotatedTangentY = tangentX * sin + tangentY * cos;

  return {
    x: clamp01(rotated.x),
    y: clamp01(rotated.y),
    tangentX: rotatedTangentX,
    tangentY: rotatedTangentY,
    normalX: -rotatedTangentY,
    normalY: rotatedTangentX,
  };
}

export function sampleYinYangEyeEddy(
  lane: "blue" | "gold",
  phase: number,
  options: {
    separation: number;
    radius: number;
    tiltRadians: number;
    fieldScale: number;
  },
): YinYangCurrentPoint {
  const laneDirection = lane === "blue" ? -1 : 1;
  const orbitDirection = lane === "blue" ? 1 : -1;
  const fieldScale = options.fieldScale;
  const eddyAngle = phase * Math.PI * 2 * orbitDirection;
  const baseX = 0.5;
  const baseY =
    0.5 +
    laneDirection * options.separation * fieldScale +
    Math.sin(eddyAngle) * options.radius;
  const orbitX = Math.cos(eddyAngle) * options.radius;
  const basePoint = rotateAroundCenter(
    baseX + orbitX,
    baseY,
    options.tiltRadians,
  );
  const tangentAngle = eddyAngle + Math.PI / 2 * orbitDirection;
  const cos = Math.cos(options.tiltRadians);
  const sin = Math.sin(options.tiltRadians);
  const tangentX = Math.cos(tangentAngle) * cos - Math.sin(tangentAngle) * sin;
  const tangentY = Math.cos(tangentAngle) * sin + Math.sin(tangentAngle) * cos;

  return {
    x: clamp01(basePoint.x),
    y: clamp01(basePoint.y),
    tangentX,
    tangentY,
    normalX: -tangentY,
    normalY: tangentX,
  };
}
