export const particleVertexShader = `
  precision highp float;

  attribute float aLife;
  attribute vec3 aColor;

  uniform float uParticleSize;
  uniform float uOpacity;
  uniform float uParticleColorGain;

  varying float vLife;
  varying vec3 vColor;

  void main() {
    vLife = aLife;
    vColor = min(aColor * uParticleColorGain, vec3(1.35));
    gl_Position = vec4(position.xy, 0.0, 1.0);
    gl_PointSize = uParticleSize * (0.72 + aLife * 0.48);
  }
`;

export const particleFragmentShader = `
  precision highp float;

  uniform float uOpacity;

  varying float vLife;
  varying vec3 vColor;

  void main() {
    vec2 p = gl_PointCoord - vec2(0.5);
    float bead = smoothstep(0.5, 0.0, length(p));
    float alpha = bead * vLife * uOpacity;

    gl_FragColor = vec4(vColor, alpha);
  }
`;
