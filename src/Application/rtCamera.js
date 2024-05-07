import * as THREE from "three";
import { param } from "./param";

export default class rtCamera {
  constructor() {
    this.setInstance();
    this.rt = new THREE.WebGLRenderTarget(param.rtWidth, param.rtHeight);
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      50,
      param.rtWidth / param.rtHeight,
      0.1,
      5000
    );

    this.instance.position.z = 1.5;
    this.instance.position.y = 1.5;
    this.instance.rotation.x = -Math.PI / 5;
    this.helper = new THREE.CameraHelper(this.instance);
    this.axesHelp = new THREE.AxesHelper(5);
  }
}
