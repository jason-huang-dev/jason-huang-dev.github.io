export const displayShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uDye;
  uniform float uTime;

  void main() {
    vec3 dye = texture2D(uDye, vUv).rgb;

    vec3 navy = vec3(0.012, 0.039, 0.067);
    vec3 waterBias = vec3(0.028, 0.12, 0.18);
    vec3 gold = vec3(0.969, 0.788, 0.282);

    float center = smoothstep(0.72, 0.0, distance(vUv, vec2(0.52, 0.48)));
    float current = sin((vUv.x * 8.0 + vUv.y * 4.0) + uTime * 0.32) * 0.5 + 0.5;
    float vignette = smoothstep(0.92, 0.22, distance(vUv, vec2(0.5)));

    vec3 color = navy + waterBias * current * 0.16;
    color += dye * 0.86;
    color += gold * center * 0.035;
    color *= 0.66 + vignette * 0.48;
    color = pow(color, vec3(0.92));

    gl_FragColor = vec4(color, 0.88);
  }
`;
