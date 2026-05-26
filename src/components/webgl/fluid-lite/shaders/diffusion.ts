export const diffusionShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uSource;
  uniform vec2 uTexelSize;
  uniform float uDiffusion;
  uniform float uDissipation;

  void main() {
    vec4 center = texture2D(uSource, vUv);
    vec4 left = texture2D(uSource, vUv - vec2(uTexelSize.x, 0.0));
    vec4 right = texture2D(uSource, vUv + vec2(uTexelSize.x, 0.0));
    vec4 bottom = texture2D(uSource, vUv - vec2(0.0, uTexelSize.y));
    vec4 top = texture2D(uSource, vUv + vec2(0.0, uTexelSize.y));
    vec4 average = (left + right + bottom + top) * 0.25;

    gl_FragColor = mix(center, average, uDiffusion) * uDissipation;
  }
`;
