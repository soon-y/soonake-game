import Application from "./Application";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  constructor() {
    this.application = new Application();
    this.size = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;

    this.setInstance();
    this.setOrbitControls();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.size.width / this.size.height,
      0.1,
      5000
    );

    this.placeCam();
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25; //damping inertia
    this.controls.maxPolarAngle = Math.PI / 2 - 0.001;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 50;
  }

  resize() {
    this.instance.aspect = this.size.width / this.size.height;
    this.instance.updateProjectionMatrix();
    this.placeCam();
  }

  update() {
    this.controls.update();
  }

  placeCam() {
    if (this.instance.aspect < 0.5) {
      //mobile
      this.instance.position.set(0, 30, 25);
    } else if (this.instance.aspect >= 0.5 && this.instance.aspect < 1) {
      this.instance.position.y = 20 + (1 - this.instance.aspect) * 20;
      this.instance.position.z = 15 + (1 - this.instance.aspect) * 20;
    } else {
      this.instance.position.set(0, 20, 15);
    }
  }
}
