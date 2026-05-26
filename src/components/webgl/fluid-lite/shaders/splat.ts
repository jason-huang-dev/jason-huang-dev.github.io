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
    float r = max(uRadius, 0.001);
    float distanceFromPoint = length(p);
    float splat = exp(-dot(p, p) / max(r * r * 0.28, 0.0000001));
    splat *= smoothstep(r * 2.2, r * 0.35, distanceFromPoint);
    gl_FragColor = vec4(base + uColor * splat, 1.0);
  }
`;
