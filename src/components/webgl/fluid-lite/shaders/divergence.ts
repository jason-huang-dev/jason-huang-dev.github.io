export const divergenceShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;

  void main() {
    float l = texture2D(uVelocity, vUv - vec2(uTexelSize.x, 0.0)).x;
    float r = texture2D(uVelocity, vUv + vec2(uTexelSize.x, 0.0)).x;
    float b = texture2D(uVelocity, vUv - vec2(0.0, uTexelSize.y)).y;
    float t = texture2D(uVelocity, vUv + vec2(0.0, uTexelSize.y)).y;
    float divergence = 0.5 * (r - l + t - b);
    gl_FragColor = vec4(divergence, 0.0, 0.0, 1.0);
  }
`;
