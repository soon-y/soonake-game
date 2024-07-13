import * as THREE from "three";
import Application from "../Application";
import smokeVertex from "./shaders/coffeeSmoke/vertex.glsl"
import smokeFragment from "./shaders/coffeeSmoke/fragment.glsl"

export default class Smoke {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.perlinTexture = this.resources.items.perlin
    this.perlinTexture.wrapS = THREE.RepeatWrapping;
    this.perlinTexture.wrapT = THREE.RepeatWrapping;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry(){
    this.smokeGeo = new THREE.PlaneGeometry(1,1,16,64);
    this.smokeGeo.translate(0, 0.5, 0);
    this.smokeGeo.scale(0.5, 2, 0.5);
  }

  setMaterial(){
    this.smokeMat = new THREE.ShaderMaterial({
      vertexShader: smokeVertex,
      fragmentShader: smokeFragment,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uPerlinTexture: new THREE.Uniform(this.perlinTexture) 
      },
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
    })
  }

  setMesh(){
    this.mesh = new THREE.Mesh(this.smokeGeo, this.smokeMat);
  }

  update() {
    this.smokeMat.uniforms.uTime.value = this.application.time.elapsed * 0.00005;
  }
}
