export const displayShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uDye;
  uniform sampler2D uVelocity;
  uniform sampler2D uPressure;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uDispersionStrength;
  uniform vec3 uBaseColor;
  uniform vec3 uGoldBias;
  uniform float uVignetteStrength;
  uniform int uDebugMode;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  void main() {
    vec3 rawDye = texture2D(uDye, vUv).rgb;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    float pressure = texture2D(uPressure, vUv).x;

    if (uDebugMode == 1) {
      gl_FragColor = vec4(rawDye, 1.0);
      return;
    }

    if (uDebugMode == 2) {
      vec2 encodedVelocity = velocity * 0.018 + 0.5;
      gl_FragColor = vec4(encodedVelocity.x, encodedVelocity.y, length(velocity) * 0.018, 1.0);
      return;
    }

    if (uDebugMode == 3) {
      float encodedPressure = pressure * 0.08 + 0.5;
      gl_FragColor = vec4(encodedPressure, encodedPressure, encodedPressure, 1.0);
      return;
    }

    float n = noise(vUv * 10.0 + uTime * 0.05) - 0.5;
    vec2 dispersion = vec2(n, noise(vUv * 8.0 - uTime * 0.04) - 0.5) *
      0.012 * uDispersionStrength;
    vec3 dye = rawDye;
    vec3 dyeA = texture2D(uDye, vUv + dispersion).rgb;
    vec3 dyeB = texture2D(uDye, vUv - dispersion * 0.72).rgb;
    dye = mix(dye, (dyeA + dyeB) * 0.5, 0.36);

    vec3 waterBias = vec3(0.018, 0.07, 0.09);
    float vignette = smoothstep(0.92, 0.22, distance(vUv, vec2(0.5)));
    float dyeStrength = clamp(length(dye.rgb), 0.0, 1.0);
    float alpha = mix(0.28, uOpacity, smoothstep(0.02, 0.62, dyeStrength));
    float wisp = smoothstep(0.12, 0.94, noise(vUv * 15.0 + uTime * 0.025));

    vec3 color = uBaseColor + waterBias * (0.04 + dyeStrength * 0.2);
    color += dye * (0.78 + wisp * 0.12);
    color += uGoldBias * dyeStrength * 0.012;
    color *= 0.66 + vignette * uVignetteStrength;
    color = pow(color, vec3(0.92));

    gl_FragColor = vec4(color, alpha);
  }
`;
