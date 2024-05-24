import * as THREE from "three";
import Application from "../Application";

export default class Food {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.egg = this.resources.items.easterEgg;
    this.watermelon = this.resources.items.watermelon;
    this.jack = this.resources.items.jackOlantern;
    this.mug = this.resources.items.mug;

    this.setModel();
  }

  setModel() {
    this.spring = this.egg.scene;
    this.summer = this.watermelon.scene;
    this.fall = this.jack.scene;
    this.winter = this.mug.scene;

    this.setShadow(this.spring);
    this.setShadow(this.summer);
    this.setShadow(this.fall);
    this.setShadow(this.winter);
  }

  setShadow(obj){
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }
}
