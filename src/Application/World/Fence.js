import * as THREE from "three";
import Application from "../Application";

let meshSpring;
let meshFall;

export default class Fence {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.scene = this.application.scene;
    this.fenceFall = this.resources.items.fenceFall;
    this.fenceSpring = this.resources.items.fenceSpring;

    this.spring = new THREE.Group();
    this.fall = new THREE.Group();

    this.distance = 6.3;
    this.first = 5.5;
    this.second = 4.5;
    this.third = 3.5;
    this.fourth = 2.5;
    this.fifth = 1.5;
    this.sixth = 0.5;

    this.setModel();
    this.placeFenceSpring();
    this.placeFenceFall();
  }

  setModel() {
    this.fenceFall = this.fenceFall.scene;
    this.fenceSpring = this.fenceSpring.scene;

    this.fenceFall.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.fenceSpring.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  placeFenceSpring() {
    this.fenceSpring_top_1 = this.fenceSpring.clone();
    this.fenceSpring_top_2 = this.fenceSpring.clone();
    this.fenceSpring_top_3 = this.fenceSpring.clone();
    this.fenceSpring_top_4 = this.fenceSpring.clone();
    this.fenceSpring_top_5 = this.fenceSpring.clone();
    this.fenceSpring_top_6 = this.fenceSpring.clone();
    this.fenceSpring_top_7 = this.fenceSpring.clone();
    this.fenceSpring_top_8 = this.fenceSpring.clone();
    this.fenceSpring_top_9 = this.fenceSpring.clone();
    this.fenceSpring_top_10 = this.fenceSpring.clone();
    this.fenceSpring_top_11 = this.fenceSpring.clone();
    this.fenceSpring_top_12 = this.fenceSpring.clone();

    this.fenceSpring.rotation.y = Math.PI;
    this.fenceSpring_bottom_1 = this.fenceSpring.clone();
    this.fenceSpring_bottom_2 = this.fenceSpring.clone();
    this.fenceSpring_bottom_3 = this.fenceSpring.clone();
    this.fenceSpring_bottom_4 = this.fenceSpring.clone();
    this.fenceSpring_bottom_5 = this.fenceSpring.clone();
    this.fenceSpring_bottom_6 = this.fenceSpring.clone();
    this.fenceSpring_bottom_7 = this.fenceSpring.clone();
    this.fenceSpring_bottom_8 = this.fenceSpring.clone();
    this.fenceSpring_bottom_9 = this.fenceSpring.clone();
    this.fenceSpring_bottom_10 = this.fenceSpring.clone();
    this.fenceSpring_bottom_11 = this.fenceSpring.clone();
    this.fenceSpring_bottom_12 = this.fenceSpring.clone();

    this.fenceSpring.rotation.y = Math.PI / 2;
    this.fenceSpring_left_1 = this.fenceSpring.clone();
    this.fenceSpring_left_2 = this.fenceSpring.clone();
    this.fenceSpring_left_3 = this.fenceSpring.clone();
    this.fenceSpring_left_4 = this.fenceSpring.clone();
    this.fenceSpring_left_5 = this.fenceSpring.clone();
    this.fenceSpring_left_6 = this.fenceSpring.clone();
    this.fenceSpring_left_7 = this.fenceSpring.clone();
    this.fenceSpring_left_8 = this.fenceSpring.clone();
    this.fenceSpring_left_9 = this.fenceSpring.clone();
    this.fenceSpring_left_10 = this.fenceSpring.clone();
    this.fenceSpring_left_11 = this.fenceSpring.clone();
    this.fenceSpring_left_12 = this.fenceSpring.clone();

    this.fenceSpring.rotation.y = -Math.PI / 2;
    this.fenceSpring_right_1 = this.fenceSpring.clone();
    this.fenceSpring_right_2 = this.fenceSpring.clone();
    this.fenceSpring_right_3 = this.fenceSpring.clone();
    this.fenceSpring_right_4 = this.fenceSpring.clone();
    this.fenceSpring_right_5 = this.fenceSpring.clone();
    this.fenceSpring_right_6 = this.fenceSpring.clone();
    this.fenceSpring_right_7 = this.fenceSpring.clone();
    this.fenceSpring_right_8 = this.fenceSpring.clone();
    this.fenceSpring_right_9 = this.fenceSpring.clone();
    this.fenceSpring_right_10 = this.fenceSpring.clone();
    this.fenceSpring_right_11 = this.fenceSpring.clone();
    this.fenceSpring_right_12 = this.fenceSpring.clone();

    this.fenceSpring_top_1.position.set(-this.first, 0, -this.distance);
    this.fenceSpring_top_2.position.set(-this.second, 0, -this.distance);
    this.fenceSpring_top_3.position.set(-this.third, 0, -this.distance);
    this.fenceSpring_top_4.position.set(-this.fourth, 0, -this.distance);
    this.fenceSpring_top_5.position.set(-this.fifth, 0, -this.distance);
    this.fenceSpring_top_6.position.set(-this.sixth, 0, -this.distance);
    this.fenceSpring_top_7.position.set(this.sixth, 0, -this.distance);
    this.fenceSpring_top_8.position.set(this.fifth, 0, -this.distance);
    this.fenceSpring_top_9.position.set(this.fourth, 0, -this.distance);
    this.fenceSpring_top_10.position.set(this.third, 0, -this.distance);
    this.fenceSpring_top_11.position.set(this.second, 0, -this.distance);
    this.fenceSpring_top_12.position.set(this.first, 0, -this.distance);

    this.fenceSpring_bottom_1.position.set(-this.first, 0, this.distance);
    this.fenceSpring_bottom_2.position.set(-this.second, 0, this.distance);
    this.fenceSpring_bottom_3.position.set(-this.third, 0, this.distance);
    this.fenceSpring_bottom_4.position.set(-this.fourth, 0, this.distance);
    this.fenceSpring_bottom_5.position.set(-this.fifth, 0, this.distance);
    this.fenceSpring_bottom_6.position.set(-this.sixth, 0, this.distance);
    this.fenceSpring_bottom_7.position.set(this.sixth, 0, this.distance);
    this.fenceSpring_bottom_8.position.set(this.fifth, 0, this.distance);
    this.fenceSpring_bottom_9.position.set(this.fourth, 0, this.distance);
    this.fenceSpring_bottom_10.position.set(this.third, 0, this.distance);
    this.fenceSpring_bottom_11.position.set(this.second, 0, this.distance);
    this.fenceSpring_bottom_12.position.set(this.first, 0, this.distance);

    this.fenceSpring_left_1.position.set(-this.distance, 0, -this.first);
    this.fenceSpring_left_2.position.set(-this.distance, 0, -this.second);
    this.fenceSpring_left_3.position.set(-this.distance, 0, -this.third);
    this.fenceSpring_left_4.position.set(-this.distance, 0, -this.fourth);
    this.fenceSpring_left_5.position.set(-this.distance, 0, -this.fifth);
    this.fenceSpring_left_6.position.set(-this.distance, 0, -this.sixth);
    this.fenceSpring_left_7.position.set(-this.distance, 0, this.sixth);
    this.fenceSpring_left_8.position.set(-this.distance, 0, this.fifth);
    this.fenceSpring_left_9.position.set(-this.distance, 0, this.fourth);
    this.fenceSpring_left_10.position.set(-this.distance, 0, this.third);
    this.fenceSpring_left_11.position.set(-this.distance, 0, this.second);
    this.fenceSpring_left_12.position.set(-this.distance, 0, this.first);

    this.fenceSpring_right_1.position.set(this.distance, 0, -this.first);
    this.fenceSpring_right_2.position.set(this.distance, 0, -this.second);
    this.fenceSpring_right_3.position.set(this.distance, 0, -this.third);
    this.fenceSpring_right_4.position.set(this.distance, 0, -this.fourth);
    this.fenceSpring_right_5.position.set(this.distance, 0, -this.fifth);
    this.fenceSpring_right_6.position.set(this.distance, 0, -this.sixth);
    this.fenceSpring_right_7.position.set(this.distance, 0, this.sixth);
    this.fenceSpring_right_8.position.set(this.distance, 0, this.fifth);
    this.fenceSpring_right_9.position.set(this.distance, 0, this.fourth);
    this.fenceSpring_right_10.position.set(this.distance, 0, this.third);
    this.fenceSpring_right_11.position.set(this.distance, 0, this.second);
    this.fenceSpring_right_12.position.set(this.distance, 0, this.first);

    this.spring.add(
      this.fenceSpring_top_1,
      this.fenceSpring_top_2,
      this.fenceSpring_top_3,
      this.fenceSpring_top_4,
      this.fenceSpring_top_5,
      this.fenceSpring_top_6,
      this.fenceSpring_top_7,
      this.fenceSpring_top_8,
      this.fenceSpring_top_9,
      this.fenceSpring_top_10,
      this.fenceSpring_top_11,
      this.fenceSpring_top_12,

      this.fenceSpring_bottom_1,
      this.fenceSpring_bottom_2,
      this.fenceSpring_bottom_3,
      this.fenceSpring_bottom_4,
      this.fenceSpring_bottom_5,
      this.fenceSpring_bottom_6,
      this.fenceSpring_bottom_7,
      this.fenceSpring_bottom_8,
      this.fenceSpring_bottom_9,
      this.fenceSpring_bottom_10,
      this.fenceSpring_bottom_11,
      this.fenceSpring_bottom_12,

      this.fenceSpring_left_1,
      this.fenceSpring_left_2,
      this.fenceSpring_left_3,
      this.fenceSpring_left_4,
      this.fenceSpring_left_5,
      this.fenceSpring_left_6,
      this.fenceSpring_left_7,
      this.fenceSpring_left_8,
      this.fenceSpring_left_9,
      this.fenceSpring_left_10,
      this.fenceSpring_left_11,
      this.fenceSpring_left_12,

      this.fenceSpring_right_1,
      this.fenceSpring_right_2,
      this.fenceSpring_right_3,
      this.fenceSpring_right_4,
      this.fenceSpring_right_5,
      this.fenceSpring_right_6,
      this.fenceSpring_right_7,
      this.fenceSpring_right_8,
      this.fenceSpring_right_9,
      this.fenceSpring_right_10,
      this.fenceSpring_right_11,
      this.fenceSpring_right_12
    );
  }

  placeFenceFall() {
    this.fenceFall_top_1 = this.fenceFall.clone();
    this.fenceFall_top_2 = this.fenceFall.clone();
    this.fenceFall_top_3 = this.fenceFall.clone();
    this.fenceFall_top_4 = this.fenceFall.clone();
    this.fenceFall_top_5 = this.fenceFall.clone();
    this.fenceFall_top_6 = this.fenceFall.clone();
    this.fenceFall_top_7 = this.fenceFall.clone();
    this.fenceFall_top_8 = this.fenceFall.clone();
    this.fenceFall_top_9 = this.fenceFall.clone();
    this.fenceFall_top_10 = this.fenceFall.clone();
    this.fenceFall_top_11 = this.fenceFall.clone();
    this.fenceFall_top_12 = this.fenceFall.clone();

    this.fenceFall.rotation.y = Math.PI;
    this.fenceFall_bottom_1 = this.fenceFall.clone();
    this.fenceFall_bottom_2 = this.fenceFall.clone();
    this.fenceFall_bottom_3 = this.fenceFall.clone();
    this.fenceFall_bottom_4 = this.fenceFall.clone();
    this.fenceFall_bottom_5 = this.fenceFall.clone();
    this.fenceFall_bottom_6 = this.fenceFall.clone();
    this.fenceFall_bottom_7 = this.fenceFall.clone();
    this.fenceFall_bottom_8 = this.fenceFall.clone();
    this.fenceFall_bottom_9 = this.fenceFall.clone();
    this.fenceFall_bottom_10 = this.fenceFall.clone();
    this.fenceFall_bottom_11 = this.fenceFall.clone();
    this.fenceFall_bottom_12 = this.fenceFall.clone();

    this.fenceFall.rotation.y = Math.PI / 2;
    this.fenceFall_left_1 = this.fenceFall.clone();
    this.fenceFall_left_2 = this.fenceFall.clone();
    this.fenceFall_left_3 = this.fenceFall.clone();
    this.fenceFall_left_4 = this.fenceFall.clone();
    this.fenceFall_left_5 = this.fenceFall.clone();
    this.fenceFall_left_6 = this.fenceFall.clone();
    this.fenceFall_left_7 = this.fenceFall.clone();
    this.fenceFall_left_8 = this.fenceFall.clone();
    this.fenceFall_left_9 = this.fenceFall.clone();
    this.fenceFall_left_10 = this.fenceFall.clone();
    this.fenceFall_left_11 = this.fenceFall.clone();
    this.fenceFall_left_12 = this.fenceFall.clone();

    this.fenceFall.rotation.y = -Math.PI / 2;
    this.fenceFall_right_1 = this.fenceFall.clone();
    this.fenceFall_right_2 = this.fenceFall.clone();
    this.fenceFall_right_3 = this.fenceFall.clone();
    this.fenceFall_right_4 = this.fenceFall.clone();
    this.fenceFall_right_5 = this.fenceFall.clone();
    this.fenceFall_right_6 = this.fenceFall.clone();
    this.fenceFall_right_7 = this.fenceFall.clone();
    this.fenceFall_right_8 = this.fenceFall.clone();
    this.fenceFall_right_9 = this.fenceFall.clone();
    this.fenceFall_right_10 = this.fenceFall.clone();
    this.fenceFall_right_11 = this.fenceFall.clone();
    this.fenceFall_right_12 = this.fenceFall.clone();

    this.fenceFall_top_1.position.set(-this.first, 0, -this.distance);
    this.fenceFall_top_2.position.set(-this.second, 0, -this.distance);
    this.fenceFall_top_3.position.set(-this.third, 0, -this.distance);
    this.fenceFall_top_4.position.set(-this.fourth, 0, -this.distance);
    this.fenceFall_top_5.position.set(-this.fifth, 0, -this.distance);
    this.fenceFall_top_6.position.set(-this.sixth, 0, -this.distance);
    this.fenceFall_top_7.position.set(this.sixth, 0, -this.distance);
    this.fenceFall_top_8.position.set(this.fifth, 0, -this.distance);
    this.fenceFall_top_9.position.set(this.fourth, 0, -this.distance);
    this.fenceFall_top_10.position.set(this.third, 0, -this.distance);
    this.fenceFall_top_11.position.set(this.second, 0, -this.distance);
    this.fenceFall_top_12.position.set(this.first, 0, -this.distance);

    this.fenceFall_bottom_1.position.set(-this.first, 0, this.distance);
    this.fenceFall_bottom_2.position.set(-this.second, 0, this.distance);
    this.fenceFall_bottom_3.position.set(-this.third, 0, this.distance);
    this.fenceFall_bottom_4.position.set(-this.fourth, 0, this.distance);
    this.fenceFall_bottom_5.position.set(-this.fifth, 0, this.distance);
    this.fenceFall_bottom_6.position.set(-this.sixth, 0, this.distance);
    this.fenceFall_bottom_7.position.set(this.sixth, 0, this.distance);
    this.fenceFall_bottom_8.position.set(this.fifth, 0, this.distance);
    this.fenceFall_bottom_9.position.set(this.fourth, 0, this.distance);
    this.fenceFall_bottom_10.position.set(this.third, 0, this.distance);
    this.fenceFall_bottom_11.position.set(this.second, 0, this.distance);
    this.fenceFall_bottom_12.position.set(this.first, 0, this.distance);

    this.fenceFall_left_1.position.set(-this.distance, 0, -this.first);
    this.fenceFall_left_2.position.set(-this.distance, 0, -this.second);
    this.fenceFall_left_3.position.set(-this.distance, 0, -this.third);
    this.fenceFall_left_4.position.set(-this.distance, 0, -this.fourth);
    this.fenceFall_left_5.position.set(-this.distance, 0, -this.fifth);
    this.fenceFall_left_6.position.set(-this.distance, 0, -this.sixth);
    this.fenceFall_left_7.position.set(-this.distance, 0, this.sixth);
    this.fenceFall_left_8.position.set(-this.distance, 0, this.fifth);
    this.fenceFall_left_9.position.set(-this.distance, 0, this.fourth);
    this.fenceFall_left_10.position.set(-this.distance, 0, this.third);
    this.fenceFall_left_11.position.set(-this.distance, 0, this.second);
    this.fenceFall_left_12.position.set(-this.distance, 0, this.first);

    this.fenceFall_right_1.position.set(this.distance, 0, -this.first);
    this.fenceFall_right_2.position.set(this.distance, 0, -this.second);
    this.fenceFall_right_3.position.set(this.distance, 0, -this.third);
    this.fenceFall_right_4.position.set(this.distance, 0, -this.fourth);
    this.fenceFall_right_5.position.set(this.distance, 0, -this.fifth);
    this.fenceFall_right_6.position.set(this.distance, 0, -this.sixth);
    this.fenceFall_right_7.position.set(this.distance, 0, this.sixth);
    this.fenceFall_right_8.position.set(this.distance, 0, this.fifth);
    this.fenceFall_right_9.position.set(this.distance, 0, this.fourth);
    this.fenceFall_right_10.position.set(this.distance, 0, this.third);
    this.fenceFall_right_11.position.set(this.distance, 0, this.second);
    this.fenceFall_right_12.position.set(this.distance, 0, this.first);

    this.fall.add(
      this.fenceFall_top_1,
      this.fenceFall_top_2,
      this.fenceFall_top_3,
      this.fenceFall_top_4,
      this.fenceFall_top_5,
      this.fenceFall_top_6,
      this.fenceFall_top_7,
      this.fenceFall_top_8,
      this.fenceFall_top_9,
      this.fenceFall_top_10,
      this.fenceFall_top_11,
      this.fenceFall_top_12,

      this.fenceFall_bottom_1,
      this.fenceFall_bottom_2,
      this.fenceFall_bottom_3,
      this.fenceFall_bottom_4,
      this.fenceFall_bottom_5,
      this.fenceFall_bottom_6,
      this.fenceFall_bottom_7,
      this.fenceFall_bottom_8,
      this.fenceFall_bottom_9,
      this.fenceFall_bottom_10,
      this.fenceFall_bottom_11,
      this.fenceFall_bottom_12,

      this.fenceFall_left_1,
      this.fenceFall_left_2,
      this.fenceFall_left_3,
      this.fenceFall_left_4,
      this.fenceFall_left_5,
      this.fenceFall_left_6,
      this.fenceFall_left_7,
      this.fenceFall_left_8,
      this.fenceFall_left_9,
      this.fenceFall_left_10,
      this.fenceFall_left_11,
      this.fenceFall_left_12,

      this.fenceFall_right_1,
      this.fenceFall_right_2,
      this.fenceFall_right_3,
      this.fenceFall_right_4,
      this.fenceFall_right_5,
      this.fenceFall_right_6,
      this.fenceFall_right_7,
      this.fenceFall_right_8,
      this.fenceFall_right_9,
      this.fenceFall_right_10,
      this.fenceFall_right_11,
      this.fenceFall_right_12
    );
  }

  gameOver(x, z) {
    if (z < -this.first) {
      if (x == -this.first) {
        this.fenceSpring_top_1.rotation.x = -Math.PI / 2;
        this.fenceFall_top_1.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_1;
        meshFall = this.fenceFall_top_1;
      }
      if (x == -this.second) {
        this.fenceSpring_top_2.rotation.x = -Math.PI / 2;
        this.fenceFall_top_2.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_2;
        meshFall = this.fenceFall_top_2;
      }
      if (x == -this.third) {
        this.fenceSpring_top_3.rotation.x = -Math.PI / 2;
        this.fenceFall_top_3.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_3;
        meshFall = this.fenceFall_top_3;
      }
      if (x == -this.fourth) {
        this.fenceSpring_top_4.rotation.x = -Math.PI / 2;
        this.fenceFall_top_4.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_4;
        meshFall = this.fenceFall_top_4;
      }
      if (x == -this.fifth) {
        this.fenceSpring_top_5.rotation.x = -Math.PI / 2;
        this.fenceFall_top_5.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_5;
        meshFall = this.fenceFall_top_5;
      }
      if (x == -this.sixth) {
        this.fenceSpring_top_6.rotation.x = -Math.PI / 2;
        this.fenceFall_top_6.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_6;
        meshFall = this.fenceFall_top_6;
      }
      if (x == this.sixth) {
        this.fenceSpring_top_7.rotation.x = -Math.PI / 2;
        this.fenceFall_top_7.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_7;
        meshFall = this.fenceFall_top_7;
      }
      if (x == this.fifth) {
        this.fenceSpring_top_8.rotation.x = -Math.PI / 2;
        this.fenceFall_top_8.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_8;
        meshFall = this.fenceFall_top_8;
      }
      if (x == this.fourth) {
        this.fenceSpring_top_9.rotation.x = -Math.PI / 2;
        this.fenceFall_top_9.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_9;
        meshFall = this.fenceFall_top_9;
      }
      if (x == this.third) {
        this.fenceSpring_top_10.rotation.x = -Math.PI / 2;
        this.fenceFall_top_10.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_10;
        meshFall = this.fenceFall_top_10;
      }
      if (x == this.second) {
        this.fenceSpring_top_11.rotation.x = -Math.PI / 2;
        this.fenceFall_top_11.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_11;
        meshFall = this.fenceFall_top_11;
      }
      if (x == this.first) {
        this.fenceSpring_top_12.rotation.x = -Math.PI / 2;
        this.fenceFall_top_12.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_top_12;
        meshFall = this.fenceFall_top_12;
      }
    }

    if (z > this.first) {
      if (x == -this.first) {
        this.fenceSpring_bottom_1.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_1.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_1;
        meshFall = this.fenceFall_bottom_1;
      }
      if (x == -this.second) {
        this.fenceSpring_bottom_2.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_2.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_2;
        meshFall = this.fenceFall_bottom_2;
      }
      if (x == -this.third) {
        this.fenceSpring_bottom_3.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_3.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_3;
        meshFall = this.fenceFall_bottom_3;
      }
      if (x == -this.fourth) {
        this.fenceSpring_bottom_4.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_4.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_4;
        meshFall = this.fenceFall_bottom_4;
      }
      if (x == -this.fifth) {
        this.fenceSpring_bottom_5.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_5.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_5;
        meshFall = this.fenceFall_bottom_5;
      }
      if (x == -this.sixth) {
        this.fenceSpring_bottom_6.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_6.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_6;
        meshFall = this.fenceFall_bottom_6;
      }
      if (x == this.sixth) {
        this.fenceSpring_bottom_7.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_7.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_7;
        meshFall = this.fenceFall_bottom_7;
      }
      if (x == this.fifth) {
        this.fenceSpring_bottom_8.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_8.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_8;
        meshFall = this.fenceFall_bottom_8;
      }
      if (x == this.fourth) {
        this.fenceSpring_bottom_9.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_9.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_9;
        meshFall = this.fenceFall_bottom_9;
      }
      if (x == this.third) {
        this.fenceSpring_bottom_10.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_10.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_10;
        meshFall = this.fenceFall_bottom_10;
      }
      if (x == this.second) {
        this.fenceSpring_bottom_11.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_11.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_11;
        meshFall = this.fenceFall_bottom_11;
      }
      if (x == this.first) {
        this.fenceSpring_bottom_12.rotation.x = -Math.PI / 2;
        this.fenceFall_bottom_12.rotation.x = -Math.PI / 2;
        meshSpring = this.fenceSpring_bottom_12;
        meshFall = this.fenceFall_bottom_12;
      }
    }

    if (x < -this.first) {
      if (z == -this.first) {
        this.left(this.fenceSpring_left_1);
        this.left(this.fenceFall_left_1);
        meshSpring = this.fenceSpring_left_1;
        meshFall = this.fenceFall_left_1;
      }
      if (z == -this.second) {
        this.left(this.fenceSpring_left_2);
        this.left(this.fenceFall_left_2);
        meshSpring = this.fenceSpring_left_2;
        meshFall = this.fenceFall_left_2;
      }
      if (z == -this.third) {
        this.left(this.fenceSpring_left_3);
        this.left(this.fenceFall_left_3);
        meshSpring = this.fenceSpring_left_3;
        meshFall = this.fenceFall_left_3;
      }
      if (z == -this.fourth) {
        this.left(this.fenceSpring_left_4);
        this.left(this.fenceFall_left_4);
        meshSpring = this.fenceSpring_left_4;
        meshFall = this.fenceFall_left_4;
      }
      if (z == -this.fifth) {
        this.left(this.fenceSpring_left_5);
        this.left(this.fenceFall_left_5);
        meshSpring = this.fenceSpring_left_5;
        meshFall = this.fenceFall_left_5;
      }
      if (z == -this.sixth) {
        this.left(this.fenceSpring_left_6);
        this.left(this.fenceFall_left_6);
        meshSpring = this.fenceSpring_left_6;
        meshFall = this.fenceFall_left_6;
      }
      if (z == this.sixth) {
        this.left(this.fenceSpring_left_7);
        this.left(this.fenceFall_left_7);
        meshSpring = this.fenceSpring_left_7;
        meshFall = this.fenceFall_left_7;
      }
      if (z == this.fifth) {
        this.left(this.fenceSpring_left_8);
        this.left(this.fenceFall_left_8);
        meshSpring = this.fenceSpring_left_8;
        meshFall = this.fenceFall_left_8;
      }
      if (z == this.fourth) {
        this.left(this.fenceSpring_left_9);
        this.left(this.fenceFall_left_9);
        meshSpring = this.fenceSpring_left_9;
        meshFall = this.fenceFall_left_9;
      }
      if (z == this.third) {
        this.left(this.fenceSpring_left_10);
        this.left(this.fenceFall_left_10);
        meshSpring = this.fenceSpring_left_10;
        meshFall = this.fenceFall_left_10;
      }
      if (z == this.second) {
        this.left(this.fenceSpring_left_11);
        this.left(this.fenceFall_left_11);
        meshSpring = this.fenceSpring_left_11;
        meshFall = this.fenceFall_left_11;
      }
      if (z == this.first) {
        this.left(this.fenceSpring_left_12);
        this.left(this.fenceFall_left_12);
        meshSpring = this.fenceSpring_left_12;
        meshFall = this.fenceFall_left_12;
      }
    }

    if (x > this.first) {
      if (z == -this.first) {
        this.right(this.fenceSpring_right_1);
        this.right(this.fenceFall_right_1);
        meshSpring = this.fenceSpring_right_1;
        meshFall = this.fenceFall_right_1;
      }
      if (z == -this.second) {
        this.right(this.fenceSpring_right_2);
        this.right(this.fenceFall_right_2);
        meshSpring = this.fenceSpring_right_2;
        meshFall = this.fenceFall_right_2;
      }
      if (z == -this.third) {
        this.right(this.fenceSpring_right_3);
        this.right(this.fenceFall_right_3);
        meshSpring = this.fenceSpring_right_3;
        meshFall = this.fenceFall_right_3;
      }
      if (z == -this.fourth) {
        this.right(this.fenceSpring_right_4);
        this.right(this.fenceFall_right_4);
        meshSpring = this.fenceSpring_right_4;
        meshFall = this.fenceFall_right_4;
      }
      if (z == -this.fifth) {
        this.right(this.fenceSpring_right_5);
        this.right(this.fenceFall_right_5);
        meshSpring = this.fenceSpring_right_5;
        meshFall = this.fenceFall_right_5;
      }
      if (z == -this.sixth) {
        this.right(this.fenceSpring_right_6);
        this.right(this.fenceFall_right_6);
        meshSpring = this.fenceSpring_right_6;
        meshFall = this.fenceFall_right_6;
      }
      if (z == this.sixth) {
        this.right(this.fenceSpring_right_7);
        this.right(this.fenceFall_right_7);
        meshSpring = this.fenceSpring_right_7;
        meshFall = this.fenceFall_right_7;
      }
      if (z == this.fifth) {
        this.right(this.fenceSpring_right_8);
        this.right(this.fenceFall_right_8);
        meshSpring = this.fenceSpring_right_8;
        meshFall = this.fenceFall_right_8;
      }
      if (z == this.fourth) {
        this.right(this.fenceSpring_right_9);
        this.right(this.fenceFall_right_9);
        meshSpring = this.fenceSpring_right_9;
        meshFall = this.fenceFall_right_9;
      }
      if (z == this.third) {
        this.right(this.fenceSpring_right_10);
        this.right(this.fenceFall_right_10);
        meshSpring = this.fenceSpring_right_10;
        meshFall = this.fenceFall_right_10;
      }
      if (z == this.second) {
        this.right(this.fenceSpring_right_11);
        this.right(this.fenceFall_right_11);
        meshSpring = this.fenceSpring_right_11;
        meshFall = this.fenceFall_right_11;
      }
      if (z == this.first) {
        this.right(this.fenceSpring_right_12);
        this.right(this.fenceFall_right_12);
        meshSpring = this.fenceSpring_right_12;
        meshFall = this.fenceFall_right_12;
      }
    }
  }

  left(mesh) {
    mesh.rotation.y = 0;
    mesh.rotation.x = -Math.PI / 2;
    mesh.rotation.z = Math.PI / 2;
  }

  right(mesh) {
    mesh.rotation.y = 0;
    mesh.rotation.z = -Math.PI / 2;
    mesh.rotation.x = -Math.PI / 2;
  }

  revert() {
    if (meshSpring.position.z < -this.first) {
      meshSpring.rotation.x = 0;
      meshFall.rotation.x = 0;
    }

    if (meshSpring.position.z > this.first) {
      meshSpring.rotation.x = Math.PI;
      meshFall.rotation.x = Math.PI;
    }

    if (meshSpring.position.x < -this.first) {
      meshSpring.rotation.x = 0;
      meshSpring.rotation.z = 0;
      meshSpring.rotation.y = Math.PI / 2;
      meshFall.rotation.x = 0;
      meshFall.rotation.z = 0;
      meshFall.rotation.y = Math.PI / 2;
    }

    if (meshSpring.position.x > this.first) {
      meshSpring.rotation.x = 0;
      meshSpring.rotation.z = 0;
      meshSpring.rotation.y = -Math.PI / 2;
      meshFall.rotation.x = 0;
      meshFall.rotation.z = 0;
      meshFall.rotation.y = -Math.PI / 2;
    }
  }
}
