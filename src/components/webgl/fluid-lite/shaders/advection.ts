export const advectionShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 uTexelSize;
  uniform float uDt;
  uniform float uDissipation;

  void main() {
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    vec2 coord = vUv - velocity * uDt * uTexelSize;
    vec4 result = texture2D(uSource, coord) * uDissipation;
    gl_FragColor = result;
  }
`;
