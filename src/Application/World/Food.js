import * as THREE from "three";
import Application from "../Application";
import Smoke from "./Smoke";

export default class Food {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.egg = this.resources.items.easterEgg;
    this.watermelon = this.resources.items.watermelon;
    this.jack = this.resources.items.jackOlantern;
    this.mug = this.resources.items.mug;
    this.smoke = new Smoke();

    this.setModel();
  }

  setModel() {
    this.spring = this.egg.scene;
    this.summer = this.watermelon.scene;
    this.fall = this.jack.scene;
    this.winter = new THREE.Group();
    this.winter.add(this.mug.scene, this.smoke.mesh);

    this.summer.rotation.y = Math.PI/4

    this.setShadow(this.spring);
    this.setShadow(this.summer);
    this.setShadow(this.fall);
    this.setShadow(this.mug.scene);
  }

  setShadow(obj){
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  update(){
    this.smoke.update();
  }
}
