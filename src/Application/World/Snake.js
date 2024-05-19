import * as THREE from "three";
import Application from "../Application";
import gsap from "gsap";

export default class Snake {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.rtCam = this.application.rtCamera.instance;
    this.head1 = this.resources.items.head;
    this.snakeBody1 = this.resources.items.body1;
    this.snakeBody2 = this.resources.items.body2;
    this.bunny = this.resources.items.bunny;
    this.sunglasses = this.resources.items.sunglasses;
    this.frankenstein = this.resources.items.Frankenstein;
    this.santa = this.resources.items.santa;
    this.mouth = this.resources.items.mouth;
    this.tongue = this.resources.items.tongue;
    this.eyelid = this.resources.items.eyelid;
    this.head = new THREE.Group();
    this.season = new THREE.Group();

    this.setModel();
  }

  setModel() {
    this.snakehead = this.head1.scene;
    this.snakemouth = this.mouth.scene;
    this.snaketongue = this.tongue.scene;
    this.eyeR = this.eyelid.scene;
    this.body1 = this.snakeBody1.scene;
    this.body2 = this.snakeBody2.scene;
    this.spring = this.bunny.scene;
    this.summer = this.sunglasses.scene;
    this.fall = this.frankenstein.scene;
    this.winter = this.santa.scene;

    this.snakemouth.position.y = 0.3;
    this.snakemouth.position.z = 0.13;

    this.eyeR.position.y = 0.45;
    this.eyeR.position.z = 0.08;
    this.eyeL = this.eyeR.clone();
    this.eyePosX = 0.285;
    this.eyeR.position.x = this.eyePosX;
    this.eyeL.position.x = -this.eyePosX;
    this.eyelidR = this.eyeR.clone();
    this.eyelidL = this.eyeL.clone();
    this.eyelidR.rotation.x = Math.PI - Math.PI / 4;
    this.eyelidL.rotation.x = Math.PI - Math.PI / 4;
    this.eyeR.rotation.x = Math.PI / 4;
    this.eyeL.rotation.x = Math.PI / 4;

    this.head.add(
      this.snakehead,
      this.rtCam,
      this.snakemouth,
      this.snaketongue,
      this.eyeR,
      this.eyeL,
      this.eyelidR,
      this.eyelidL,
      this.season
    );
    this.season.add(this.spring);

    this.head.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.body1.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.body2.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.spring.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.summer.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.fall.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });

    this.winter.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  flicking() {
    this.flick = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    let duration = 0.2;
    this.flick.to(this.snaketongue.position, {
      z: 0.7,
      duration: duration,
    });
    this.flick.to(this.snaketongue.position, {
      z: 0,
      duration: duration,
    });
  }

  blinking() {
    let duration = 0.2;
    let eyeR = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    let eyeL = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    let eyelidR = gsap.timeline({ repeat: -1, repeatDelay: 2 });
    let eyelidL = gsap.timeline({ repeat: -1, repeatDelay: 2 });

    eyeR.to(this.eyeR.rotation, {
      x: 0,
      duration: duration,
    });

    eyeL.to(this.eyeL.rotation, {
      x: 0,
      duration: duration,
    });

    eyelidR.to(this.eyelidR.rotation, {
      x: Math.PI,
      duration: duration,
    });

    eyelidL.to(this.eyelidL.rotation, {
      x: Math.PI,
      duration: duration,
    });

    eyeR.to(this.eyeR.rotation, {
      x: Math.PI / 4,
      duration: duration,
    });

    eyeL.to(this.eyeL.rotation, {
      x: Math.PI / 4,
      duration: duration,
    });

    eyelidR.to(this.eyelidR.rotation, {
      x: Math.PI - Math.PI / 4,
      duration: duration,
    });

    eyelidL.to(this.eyelidL.rotation, {
      x: Math.PI - Math.PI / 4,
      duration: duration,
    });
  }

  openMouth() {
    let duration = 0.2;
    gsap.to(this.snakemouth.rotation, {
      x: -Math.PI / 3,
      duration: duration,
    });

    gsap.to(this.snakemouth.rotation, {
      x: 0,
      duration: duration,
      delay: duration,
    });
  }
}
