export const gradientSubtractShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  uniform vec2 uTexelSize;

  void main() {
    float l = texture2D(uPressure, vUv - vec2(uTexelSize.x, 0.0)).x;
    float r = texture2D(uPressure, vUv + vec2(uTexelSize.x, 0.0)).x;
    float b = texture2D(uPressure, vUv - vec2(0.0, uTexelSize.y)).x;
    float t = texture2D(uPressure, vUv + vec2(0.0, uTexelSize.y)).x;
    vec2 velocity = texture2D(uVelocity, vUv).xy;
    velocity -= vec2(r - l, t - b) * 0.5;
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;
