export const pressureShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  uniform vec2 uTexelSize;
  uniform float uDissipation;

  void main() {
    float l = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float r = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float b = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    float t = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    float divergence = texture2D(uDivergence, vUv).x;
    float pressure = (l + r + b + t - divergence) * 0.25 * uDissipation;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;
