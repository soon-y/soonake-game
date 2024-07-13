uniform float uTime;
uniform sampler2D uPerlinTexture;
varying vec2 vUv;

#include ../includes/rotate2D.glsl

void main(){
  vec3 newPos = position;
  float twistPerlin = texture(
    uPerlinTexture, 
    vec2(0.5, uv.y * 0.2 - uTime )
    ).r;
  float angle = twistPerlin * 10.0;
  newPos.xz = rotate2D(newPos.xz, angle);

  //wind
  vec2 windOffset = vec2(
    texture(uPerlinTexture, vec2(0.25, uTime)).r - 0.5,
    texture(uPerlinTexture, vec2(0.75, uTime)).r - 0.5
  );
  windOffset *= pow(uv.y, 3.0) * 5.0;
  newPos.xz += windOffset;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);

  vUv = uv;
}