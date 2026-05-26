export const splatShader = `
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTarget;
  uniform vec2 uPoint;
  uniform vec3 uColor;
  uniform float uRadius;
  uniform float uAspectRatio;

  void main() {
    vec2 p = vUv - uPoint;
    p.x *= uAspectRatio;
    vec3 base = texture2D(uTarget, vUv).rgb;
    float splat = exp(-dot(p, p) / max(uRadius, 0.0001));
    gl_FragColor = vec4(base + uColor * splat, 1.0);
  }
`;
