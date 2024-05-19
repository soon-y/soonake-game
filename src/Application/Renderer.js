import Application from "./Application";
import * as THREE from "three";

export default class Renderer {
  constructor() {
    this.application = new Application();
    this.size = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;
    this.camera = this.application.camera;
    this.rtCamera = this.application.rtCamera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    });
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#D1DDBB");
    this.instance.setSize(this.size.width, this.size.height);
    this.instance.setPixelRatio(this.size.pixelRatio);

    this.aspect = this.size.width / this.size.height;
  }

  resize() {
    this.instance.setSize(this.size.width, this.size.height);
    this.instance.setPixelRatio(this.size.pixelRatio);
  }

  update() {
    this.instance.setRenderTarget(this.rtCamera.rt);
    this.instance.render(this.scene, this.rtCamera.instance);
    this.instance.setRenderTarget(null);
    this.instance.render(this.scene, this.camera.instance);
  }
}
