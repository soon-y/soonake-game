import * as THREE from "three";
import Application from "../Application";
import { Water } from "three/examples/jsm/objects/Water.js";

export default class OceanSummer {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(500, 500);
  }

  setTextures() {
    this.textures = {};
    this.textures.normal = this.resources.items.water;
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.waterOptions = {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: this.textures.normal,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: "#30FEBB",
      distortionScale: 3.7,
      fog: this.scene.fog !== undefined,
    };
  }

  setMesh() {
    this.mesh = new Water(this.geometry, this.waterOptions);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.receiveShadow = true;
    this.mesh.position.y = -0.2;
  }

  update() {
    this.mesh.material.uniforms["time"].value += 1.0 / 260.0;
  }
}
