export const signatureFluidVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

export const signatureFluidFragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform vec4 uRipple;
  uniform float uPointerStrength;
  uniform float uRippleStrength;
  uniform float uFlowSpeed;
  uniform float uDistortionStrength;
  uniform float uColorIntensity;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
      + (c - a) * u.y * (1.0 - u.x)
      + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.03;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspectUv = uv;
    aspectUv.x *= uResolution.x / max(uResolution.y, 1.0);

    float t = uTime * uFlowSpeed;

    vec2 pointer = uPointer;
    pointer.x *= uResolution.x / max(uResolution.y, 1.0);

    float pointerDist = distance(aspectUv, pointer);
    float pointerLens = smoothstep(0.34, 0.0, pointerDist) * uPointerStrength;

    vec2 flow = vec2(
      fbm(uv * 3.0 + vec2(t, -t * 0.35)),
      fbm(uv * 3.4 + vec2(-t * 0.45, t * 0.55))
    );

    vec2 distortedUv = uv + (flow - 0.5) * uDistortionStrength;
    distortedUv += (uv - uPointer) * pointerLens * 0.018;

    float fluid = fbm(distortedUv * 4.2 + vec2(t * 0.8, -t * 0.4));
    float caustic = smoothstep(0.48, 0.82, fluid);

    float rippleAge = max(0.0, uTime - uRipple.z);
    float rippleDist = distance(uv, uRipple.xy);
    float ripple = exp(-rippleAge * 2.8)
      * smoothstep(0.025, 0.0, abs(rippleDist - rippleAge * 0.32))
      * uRipple.w
      * uRippleStrength;

    vec3 navy = vec3(0.012, 0.039, 0.067);
    vec3 water = vec3(0.494, 0.906, 0.949);
    vec3 electricBlue = vec3(0.145, 0.388, 0.922);
    vec3 jade = vec3(0.396, 0.839, 0.678);
    vec3 gold = vec3(0.969, 0.788, 0.282);

    vec3 color = navy;
    color += water * caustic * 0.16 * uColorIntensity;
    color += electricBlue * pointerLens * 0.18 * uColorIntensity;
    color += jade * fluid * 0.055 * uColorIntensity;
    color += gold * ripple * 0.20 * uColorIntensity;

    float vignette = smoothstep(0.86, 0.24, distance(uv, vec2(0.5)));
    color *= 0.72 + vignette * 0.42;

    gl_FragColor = vec4(color, 0.82);
  }
`;
