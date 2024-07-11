import * as THREE from "three";
import Application from "../Application";
import { Water } from "three/examples/jsm/objects/Water2.js";

export default class OceanWinter {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;

    this.setGeometry();
    this.setTextures();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1000, 1000);
  }

  setTextures() {
    this.textures = {};
    this.textures.normal = this.resources.items.water;
    this.textures.normal.wrapS = THREE.RepeatWrapping;
    this.textures.normal.wrapT = THREE.RepeatWrapping;
  }

  setMaterial() {
    this.waterOptions = {
      color: "#ffffff",
      scale: 4,
      flowDirection: new THREE.Vector2(-0.1, -0.0),
      textureWidth: 1024,
      textureHeight: 1024,
    };
  }

  setMesh() {
    this.mesh = new Water(this.geometry, this.waterOptions);
    this.mesh.rotation.x = -Math.PI / 2;
    this.mesh.position.y = -0.2;
  }
}
