import * as THREE from "three";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Mouse from './Utils/Mouse'
import Camera from "./Camera";
import Raycaster from "./Raycaster";
import Renderer from "./Renderer";
import World from "./World/World";
import Resources from "./Utils/Resources";
import sources from "./sources.js";
import rtCamera from "./rtCamera";
import Loading from "./Loading";

let instance = null;

export default class Application {
  constructor(canvas) {
    //Singleton
    if (instance) {
      return instance;
    }

    instance = this;

    //Options
    this.canvas = canvas;

    //Setup
    this.sizes = new Sizes();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.camera = new Camera();
    this.rtCamera = new rtCamera();
    this.mouse = new Mouse()
    this.raycaster = new Raycaster()
    this.renderder = new Renderer();
    this.loading = new Loading();
    this.resources = new Resources(sources);
    this.world = new World();

    this.sizes.on("resize", () => {
      this.resize();
    });

    this.time.on("tick", () => {
      this.update();
    });

    this.mouse.on('mousemove', () => {
      this.raycaster.update();
      this.world.intersect();
    });

    this.mouse.on('mousedown', () => {
      this.raycaster.update();
      this.world.intersect();
      this.world.click();
    });

    this.mouse.on('click', () => {
      this.world.click();
    })
  }

  resize() {
    this.camera.resize();
    this.renderder.resize();
  }

  update() {
    this.camera.update();
    this.renderder.update();
    this.world.update();
    if (this.world.oceanSummer) {
      this.world.oceanSummer.update();
    }
  }
}
