import * as THREE from "three";
import Application from "../Application";

export default class Field {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.fieldBase = this.resources.items.fieldBase;
    this.fieldSpring = this.resources.items.fieldSpring;
    this.fieldSummer = this.resources.items.fieldSummer;
    this.fieldFall = this.resources.items.fieldFall;
    this.fieldWinter = this.resources.items.fieldWinter;

    this.setModel();
  }

  setModel() {
    this.base = this.fieldBase.scene;
    this.spring = this.fieldSpring.scene;
    this.summer = this.fieldSummer.scene;
    this.fall = this.fieldFall.scene;
    this.winter = this.fieldWinter.scene;

    this.base.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.spring.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.summer.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.fall.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.winter.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }
}
