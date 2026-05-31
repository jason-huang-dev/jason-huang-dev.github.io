import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  clamp01,
  rotateAroundCenter,
  sampleYinYangEyeEddy,
  sampleYinYangSeam,
} from "./yinYangCurrentGeometry";

const closeTo = (actual: number, expected: number, tolerance = 0.000001) => {
  assert.ok(
    Math.abs(actual - expected) <= tolerance,
    `${actual} was not within ${tolerance} of ${expected}`,
  );
};

describe("yinYangCurrentGeometry", () => {
  it("clamps values into the unit range", () => {
    assert.equal(clamp01(-0.25), 0);
    assert.equal(clamp01(0.42), 0.42);
    assert.equal(clamp01(1.25), 1);
  });

  it("rotates around center without changing distance", () => {
    const start = { x: 0.72, y: 0.33 };
    const rotated = rotateAroundCenter(start.x, start.y, Math.PI / 3);
    const startDistance = Math.hypot(start.x - 0.5, start.y - 0.5);
    const rotatedDistance = Math.hypot(rotated.x - 0.5, rotated.y - 0.5);

    closeTo(rotatedDistance, startDistance);
  });

  it("samples the middle of the seam near center", () => {
    const point = sampleYinYangSeam(0.5, {
      amplitude: 0.22,
      length: 0.84,
      tiltRadians: -10 * (Math.PI / 180),
      fieldScale: 1,
    });

    closeTo(point.x, 0.5);
    closeTo(point.y, 0.5);
  });

  it("keeps seam endpoints inside the unit range after rotation and field scale", () => {
    const options = {
      amplitude: 0.28,
      length: 0.96,
      tiltRadians: -10 * (Math.PI / 180),
      fieldScale: 1.24,
    };

    [0, 1].forEach((u) => {
      const point = sampleYinYangSeam(u, options);

      assert.ok(point.x >= 0 && point.x <= 1);
      assert.ok(point.y >= 0 && point.y <= 1);
    });
  });

  it("places blue and gold eye eddies symmetrically around center", () => {
    const options = {
      separation: 0.18,
      radius: 0.034,
      tiltRadians: 0,
      fieldScale: 1,
    };
    const blue = sampleYinYangEyeEddy("blue", 0, options);
    const gold = sampleYinYangEyeEddy("gold", 0.5, options);

    closeTo(blue.x + gold.x, 1, 0.000001);
    closeTo(blue.y + gold.y, 1, 0.000001);
  });

  it("uses field scale to enlarge samples without leaving valid bounds", () => {
    const base = sampleYinYangSeam(0.25, {
      amplitude: 0.22,
      length: 0.88,
      tiltRadians: -8 * (Math.PI / 180),
      fieldScale: 1,
    });
    const scaled = sampleYinYangSeam(0.25, {
      amplitude: 0.22,
      length: 0.88,
      tiltRadians: -8 * (Math.PI / 180),
      fieldScale: 1.18,
    });
    const baseDistance = Math.hypot(base.x - 0.5, base.y - 0.5);
    const scaledDistance = Math.hypot(scaled.x - 0.5, scaled.y - 0.5);

    assert.ok(scaledDistance > baseDistance);
    assert.ok(scaled.x >= 0 && scaled.x <= 1);
    assert.ok(scaled.y >= 0 && scaled.y <= 1);
  });
});
