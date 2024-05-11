import * as THREE from "three";
import Application from "../Application";
import { param } from "../param";

let meshSummer;
let meshWinter;

export default class Wall {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.scene = this.application.scene;
    this.wallWinter = this.resources.items.wallWinter;
    this.wallWinterCorner = this.resources.items.wallWinterCorner;
    this.wallSummer = this.resources.items.wallSummer;
    this.wallSummerCorner = this.resources.items.wallSummerCorner;

    this.summer = new THREE.Group();
    this.winter = new THREE.Group();

    this.distance = 6.3;
    this.first = 5.5;
    this.second = 4.5;
    this.third = 3.5;
    this.fourth = 2.5;
    this.fifth = 1.5;
    this.sixth = 0.5;

    this.setModel();
    this.placeWallSummer();
    this.placeWallWinter();
  }

  setModel() {
    this.wallWinter = this.wallWinter.scene;
    this.wallWinterCorner = this.wallWinterCorner.scene;
    this.wallSummer = this.wallSummer.scene;
    this.wallSummerCorner = this.wallSummerCorner.scene;

    this.wallWinter.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.wallSummer.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.wallWinterCorner.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.wallSummerCorner.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }

  placeWallSummer() {
    this.wallSummer_corner_top_R = this.wallSummerCorner.clone();
    this.wallSummerCorner.rotation.y = Math.PI;
    this.wallSummer_corner_bottom_L = this.wallSummerCorner.clone();
    this.wallSummerCorner.rotation.y = Math.PI/2;
    this.wallSummer_corner_top_L = this.wallSummerCorner.clone();
    this.wallSummerCorner.rotation.y = -Math.PI/2;
    this.wallSummer_corner_bottom_R = this.wallSummerCorner.clone();

    this.firstC = this.first + param.size - 0.2;
    this.wallSummer_corner_top_R.position.set(this.firstC,0,-this.distance);
    this.wallSummer_corner_bottom_L.position.set(-this.firstC,0,this.distance);
    this.wallSummer_corner_bottom_R.position.set(this.firstC,0,this.distance);
    this.wallSummer_corner_top_L.position.set(-this.firstC,0,-this.distance);

    this.wallSummer_top_1 = this.wallSummer.clone();
    this.wallSummer_top_2 = this.wallSummer.clone();
    this.wallSummer_top_3 = this.wallSummer.clone();
    this.wallSummer_top_4 = this.wallSummer.clone();
    this.wallSummer_top_5 = this.wallSummer.clone();
    this.wallSummer_top_6 = this.wallSummer.clone();
    this.wallSummer_top_7 = this.wallSummer.clone();
    this.wallSummer_top_8 = this.wallSummer.clone();
    this.wallSummer_top_9 = this.wallSummer.clone();
    this.wallSummer_top_10 = this.wallSummer.clone();
    this.wallSummer_top_11 = this.wallSummer.clone();
    this.wallSummer_top_12 = this.wallSummer.clone();

    this.wallSummer.rotation.y = Math.PI;
    this.wallSummer_bottom_1 = this.wallSummer.clone();
    this.wallSummer_bottom_2 = this.wallSummer.clone();
    this.wallSummer_bottom_3 = this.wallSummer.clone();
    this.wallSummer_bottom_4 = this.wallSummer.clone();
    this.wallSummer_bottom_5 = this.wallSummer.clone();
    this.wallSummer_bottom_6 = this.wallSummer.clone();
    this.wallSummer_bottom_7 = this.wallSummer.clone();
    this.wallSummer_bottom_8 = this.wallSummer.clone();
    this.wallSummer_bottom_9 = this.wallSummer.clone();
    this.wallSummer_bottom_10 = this.wallSummer.clone();
    this.wallSummer_bottom_11 = this.wallSummer.clone();
    this.wallSummer_bottom_12 = this.wallSummer.clone();

    this.wallSummer.rotation.y = Math.PI / 2;
    this.wallSummer_left_1 = this.wallSummer.clone();
    this.wallSummer_left_2 = this.wallSummer.clone();
    this.wallSummer_left_3 = this.wallSummer.clone();
    this.wallSummer_left_4 = this.wallSummer.clone();
    this.wallSummer_left_5 = this.wallSummer.clone();
    this.wallSummer_left_6 = this.wallSummer.clone();
    this.wallSummer_left_7 = this.wallSummer.clone();
    this.wallSummer_left_8 = this.wallSummer.clone();
    this.wallSummer_left_9 = this.wallSummer.clone();
    this.wallSummer_left_10 = this.wallSummer.clone();
    this.wallSummer_left_11 = this.wallSummer.clone();
    this.wallSummer_left_12 = this.wallSummer.clone();

    this.wallSummer.rotation.y = -Math.PI / 2;
    this.wallSummer_right_1 = this.wallSummer.clone();
    this.wallSummer_right_2 = this.wallSummer.clone();
    this.wallSummer_right_3 = this.wallSummer.clone();
    this.wallSummer_right_4 = this.wallSummer.clone();
    this.wallSummer_right_5 = this.wallSummer.clone();
    this.wallSummer_right_6 = this.wallSummer.clone();
    this.wallSummer_right_7 = this.wallSummer.clone();
    this.wallSummer_right_8 = this.wallSummer.clone();
    this.wallSummer_right_9 = this.wallSummer.clone();
    this.wallSummer_right_10 = this.wallSummer.clone();
    this.wallSummer_right_11 = this.wallSummer.clone();
    this.wallSummer_right_12 = this.wallSummer.clone();

    this.wallSummer_top_1.position.set(-this.first, 0, -this.distance);
    this.wallSummer_top_2.position.set(-this.second, 0, -this.distance);
    this.wallSummer_top_3.position.set(-this.third, 0, -this.distance);
    this.wallSummer_top_4.position.set(-this.fourth, 0, -this.distance);
    this.wallSummer_top_5.position.set(-this.fifth, 0, -this.distance);
    this.wallSummer_top_6.position.set(-this.sixth, 0, -this.distance);
    this.wallSummer_top_7.position.set(this.sixth, 0, -this.distance);
    this.wallSummer_top_8.position.set(this.fifth, 0, -this.distance);
    this.wallSummer_top_9.position.set(this.fourth, 0, -this.distance);
    this.wallSummer_top_10.position.set(this.third, 0, -this.distance);
    this.wallSummer_top_11.position.set(this.second, 0, -this.distance);
    this.wallSummer_top_12.position.set(this.first, 0, -this.distance);

    this.wallSummer_bottom_1.position.set(-this.first, 0, this.distance);
    this.wallSummer_bottom_2.position.set(-this.second, 0, this.distance);
    this.wallSummer_bottom_3.position.set(-this.third, 0, this.distance);
    this.wallSummer_bottom_4.position.set(-this.fourth, 0, this.distance);
    this.wallSummer_bottom_5.position.set(-this.fifth, 0, this.distance);
    this.wallSummer_bottom_6.position.set(-this.sixth, 0, this.distance);
    this.wallSummer_bottom_7.position.set(this.sixth, 0, this.distance);
    this.wallSummer_bottom_8.position.set(this.fifth, 0, this.distance);
    this.wallSummer_bottom_9.position.set(this.fourth, 0, this.distance);
    this.wallSummer_bottom_10.position.set(this.third, 0, this.distance);
    this.wallSummer_bottom_11.position.set(this.second, 0, this.distance);
    this.wallSummer_bottom_12.position.set(this.first, 0, this.distance);

    this.wallSummer_left_1.position.set(-this.distance, 0, -this.first);
    this.wallSummer_left_2.position.set(-this.distance, 0, -this.second);
    this.wallSummer_left_3.position.set(-this.distance, 0, -this.third);
    this.wallSummer_left_4.position.set(-this.distance, 0, -this.fourth);
    this.wallSummer_left_5.position.set(-this.distance, 0, -this.fifth);
    this.wallSummer_left_6.position.set(-this.distance, 0, -this.sixth);
    this.wallSummer_left_7.position.set(-this.distance, 0, this.sixth);
    this.wallSummer_left_8.position.set(-this.distance, 0, this.fifth);
    this.wallSummer_left_9.position.set(-this.distance, 0, this.fourth);
    this.wallSummer_left_10.position.set(-this.distance, 0, this.third);
    this.wallSummer_left_11.position.set(-this.distance, 0, this.second);
    this.wallSummer_left_12.position.set(-this.distance, 0, this.first);

    this.wallSummer_right_1.position.set(this.distance, 0, -this.first);
    this.wallSummer_right_2.position.set(this.distance, 0, -this.second);
    this.wallSummer_right_3.position.set(this.distance, 0, -this.third);
    this.wallSummer_right_4.position.set(this.distance, 0, -this.fourth);
    this.wallSummer_right_5.position.set(this.distance, 0, -this.fifth);
    this.wallSummer_right_6.position.set(this.distance, 0, -this.sixth);
    this.wallSummer_right_7.position.set(this.distance, 0, this.sixth);
    this.wallSummer_right_8.position.set(this.distance, 0, this.fifth);
    this.wallSummer_right_9.position.set(this.distance, 0, this.fourth);
    this.wallSummer_right_10.position.set(this.distance, 0, this.third);
    this.wallSummer_right_11.position.set(this.distance, 0, this.second);
    this.wallSummer_right_12.position.set(this.distance, 0, this.first);

    this.summer.add(
      this.wallSummer_corner_bottom_L,
      this.wallSummer_corner_bottom_R,
      this.wallSummer_corner_top_L,
      this.wallSummer_corner_top_R,

      this.wallSummer_top_1,
      this.wallSummer_top_2,
      this.wallSummer_top_3,
      this.wallSummer_top_4,
      this.wallSummer_top_5,
      this.wallSummer_top_6,
      this.wallSummer_top_7,
      this.wallSummer_top_8,
      this.wallSummer_top_9,
      this.wallSummer_top_10,
      this.wallSummer_top_11,
      this.wallSummer_top_12,

      this.wallSummer_bottom_1,
      this.wallSummer_bottom_2,
      this.wallSummer_bottom_3,
      this.wallSummer_bottom_4,
      this.wallSummer_bottom_5,
      this.wallSummer_bottom_6,
      this.wallSummer_bottom_7,
      this.wallSummer_bottom_8,
      this.wallSummer_bottom_9,
      this.wallSummer_bottom_10,
      this.wallSummer_bottom_11,
      this.wallSummer_bottom_12,

      this.wallSummer_left_1,
      this.wallSummer_left_2,
      this.wallSummer_left_3,
      this.wallSummer_left_4,
      this.wallSummer_left_5,
      this.wallSummer_left_6,
      this.wallSummer_left_7,
      this.wallSummer_left_8,
      this.wallSummer_left_9,
      this.wallSummer_left_10,
      this.wallSummer_left_11,
      this.wallSummer_left_12,

      this.wallSummer_right_1,
      this.wallSummer_right_2,
      this.wallSummer_right_3,
      this.wallSummer_right_4,
      this.wallSummer_right_5,
      this.wallSummer_right_6,
      this.wallSummer_right_7,
      this.wallSummer_right_8,
      this.wallSummer_right_9,
      this.wallSummer_right_10,
      this.wallSummer_right_11,
      this.wallSummer_right_12
    );
  }

  placeWallWinter() {
    this.wallWinter_corner_top_R = this.wallWinterCorner.clone();
    this.wallWinterCorner.rotation.y = Math.PI;
    this.wallWinter_corner_bottom_L = this.wallWinterCorner.clone();
    this.wallWinterCorner.rotation.y = Math.PI/2;
    this.wallWinter_corner_top_L = this.wallWinterCorner.clone();
    this.wallWinterCorner.rotation.y = -Math.PI/2;
    this.wallWinter_corner_bottom_R = this.wallWinterCorner.clone();

    this.firstC = this.first+param.size - 0.2;
    this.wallWinter_corner_top_R.position.set(this.firstC,0,-this.distance);
    this.wallWinter_corner_bottom_L.position.set(-this.firstC,0,this.distance);
    this.wallWinter_corner_bottom_R.position.set(this.firstC,0,this.distance);
    this.wallWinter_corner_top_L.position.set(-this.firstC,0,-this.distance);

    this.wallWinter_top_1 = this.wallWinter.clone();
    this.wallWinter_top_2 = this.wallWinter.clone();
    this.wallWinter_top_3 = this.wallWinter.clone();
    this.wallWinter_top_4 = this.wallWinter.clone();
    this.wallWinter_top_5 = this.wallWinter.clone();
    this.wallWinter_top_6 = this.wallWinter.clone();
    this.wallWinter_top_7 = this.wallWinter.clone();
    this.wallWinter_top_8 = this.wallWinter.clone();
    this.wallWinter_top_9 = this.wallWinter.clone();
    this.wallWinter_top_10 = this.wallWinter.clone();
    this.wallWinter_top_11 = this.wallWinter.clone();
    this.wallWinter_top_12 = this.wallWinter.clone();

    this.wallWinter.rotation.y = Math.PI;
    this.wallWinter_bottom_1 = this.wallWinter.clone();
    this.wallWinter_bottom_2 = this.wallWinter.clone();
    this.wallWinter_bottom_3 = this.wallWinter.clone();
    this.wallWinter_bottom_4 = this.wallWinter.clone();
    this.wallWinter_bottom_5 = this.wallWinter.clone();
    this.wallWinter_bottom_6 = this.wallWinter.clone();
    this.wallWinter_bottom_7 = this.wallWinter.clone();
    this.wallWinter_bottom_8 = this.wallWinter.clone();
    this.wallWinter_bottom_9 = this.wallWinter.clone();
    this.wallWinter_bottom_10 = this.wallWinter.clone();
    this.wallWinter_bottom_11 = this.wallWinter.clone();
    this.wallWinter_bottom_12 = this.wallWinter.clone();

    this.wallWinter.rotation.y = Math.PI / 2;
    this.wallWinter_left_1 = this.wallWinter.clone();
    this.wallWinter_left_2 = this.wallWinter.clone();
    this.wallWinter_left_3 = this.wallWinter.clone();
    this.wallWinter_left_4 = this.wallWinter.clone();
    this.wallWinter_left_5 = this.wallWinter.clone();
    this.wallWinter_left_6 = this.wallWinter.clone();
    this.wallWinter_left_7 = this.wallWinter.clone();
    this.wallWinter_left_8 = this.wallWinter.clone();
    this.wallWinter_left_9 = this.wallWinter.clone();
    this.wallWinter_left_10 = this.wallWinter.clone();
    this.wallWinter_left_11 = this.wallWinter.clone();
    this.wallWinter_left_12 = this.wallWinter.clone();

    this.wallWinter.rotation.y = -Math.PI / 2;
    this.wallWinter_right_1 = this.wallWinter.clone();
    this.wallWinter_right_2 = this.wallWinter.clone();
    this.wallWinter_right_3 = this.wallWinter.clone();
    this.wallWinter_right_4 = this.wallWinter.clone();
    this.wallWinter_right_5 = this.wallWinter.clone();
    this.wallWinter_right_6 = this.wallWinter.clone();
    this.wallWinter_right_7 = this.wallWinter.clone();
    this.wallWinter_right_8 = this.wallWinter.clone();
    this.wallWinter_right_9 = this.wallWinter.clone();
    this.wallWinter_right_10 = this.wallWinter.clone();
    this.wallWinter_right_11 = this.wallWinter.clone();
    this.wallWinter_right_12 = this.wallWinter.clone();

    this.wallWinter_top_1.position.set(-this.first, 0, -this.distance);
    this.wallWinter_top_2.position.set(-this.second, 0, -this.distance);
    this.wallWinter_top_3.position.set(-this.third, 0, -this.distance);
    this.wallWinter_top_4.position.set(-this.fourth, 0, -this.distance);
    this.wallWinter_top_5.position.set(-this.fifth, 0, -this.distance);
    this.wallWinter_top_6.position.set(-this.sixth, 0, -this.distance);
    this.wallWinter_top_7.position.set(this.sixth, 0, -this.distance);
    this.wallWinter_top_8.position.set(this.fifth, 0, -this.distance);
    this.wallWinter_top_9.position.set(this.fourth, 0, -this.distance);
    this.wallWinter_top_10.position.set(this.third, 0, -this.distance);
    this.wallWinter_top_11.position.set(this.second, 0, -this.distance);
    this.wallWinter_top_12.position.set(this.first, 0, -this.distance);

    this.wallWinter_bottom_1.position.set(-this.first, 0, this.distance);
    this.wallWinter_bottom_2.position.set(-this.second, 0, this.distance);
    this.wallWinter_bottom_3.position.set(-this.third, 0, this.distance);
    this.wallWinter_bottom_4.position.set(-this.fourth, 0, this.distance);
    this.wallWinter_bottom_5.position.set(-this.fifth, 0, this.distance);
    this.wallWinter_bottom_6.position.set(-this.sixth, 0, this.distance);
    this.wallWinter_bottom_7.position.set(this.sixth, 0, this.distance);
    this.wallWinter_bottom_8.position.set(this.fifth, 0, this.distance);
    this.wallWinter_bottom_9.position.set(this.fourth, 0, this.distance);
    this.wallWinter_bottom_10.position.set(this.third, 0, this.distance);
    this.wallWinter_bottom_11.position.set(this.second, 0, this.distance);
    this.wallWinter_bottom_12.position.set(this.first, 0, this.distance);

    this.wallWinter_left_1.position.set(-this.distance, 0, -this.first);
    this.wallWinter_left_2.position.set(-this.distance, 0, -this.second);
    this.wallWinter_left_3.position.set(-this.distance, 0, -this.third);
    this.wallWinter_left_4.position.set(-this.distance, 0, -this.fourth);
    this.wallWinter_left_5.position.set(-this.distance, 0, -this.fifth);
    this.wallWinter_left_6.position.set(-this.distance, 0, -this.sixth);
    this.wallWinter_left_7.position.set(-this.distance, 0, this.sixth);
    this.wallWinter_left_8.position.set(-this.distance, 0, this.fifth);
    this.wallWinter_left_9.position.set(-this.distance, 0, this.fourth);
    this.wallWinter_left_10.position.set(-this.distance, 0, this.third);
    this.wallWinter_left_11.position.set(-this.distance, 0, this.second);
    this.wallWinter_left_12.position.set(-this.distance, 0, this.first);

    this.wallWinter_right_1.position.set(this.distance, 0, -this.first);
    this.wallWinter_right_2.position.set(this.distance, 0, -this.second);
    this.wallWinter_right_3.position.set(this.distance, 0, -this.third);
    this.wallWinter_right_4.position.set(this.distance, 0, -this.fourth);
    this.wallWinter_right_5.position.set(this.distance, 0, -this.fifth);
    this.wallWinter_right_6.position.set(this.distance, 0, -this.sixth);
    this.wallWinter_right_7.position.set(this.distance, 0, this.sixth);
    this.wallWinter_right_8.position.set(this.distance, 0, this.fifth);
    this.wallWinter_right_9.position.set(this.distance, 0, this.fourth);
    this.wallWinter_right_10.position.set(this.distance, 0, this.third);
    this.wallWinter_right_11.position.set(this.distance, 0, this.second);
    this.wallWinter_right_12.position.set(this.distance, 0, this.first);

    this.winter.add(
      this.wallWinter_corner_top_R,
      this.wallWinter_corner_top_L,
      this.wallWinter_corner_bottom_R,
      this.wallWinter_corner_bottom_L,

      this.wallWinter_top_1,
      this.wallWinter_top_2,
      this.wallWinter_top_3,
      this.wallWinter_top_4,
      this.wallWinter_top_5,
      this.wallWinter_top_6,
      this.wallWinter_top_7,
      this.wallWinter_top_8,
      this.wallWinter_top_9,
      this.wallWinter_top_10,
      this.wallWinter_top_11,
      this.wallWinter_top_12,

      this.wallWinter_bottom_1,
      this.wallWinter_bottom_2,
      this.wallWinter_bottom_3,
      this.wallWinter_bottom_4,
      this.wallWinter_bottom_5,
      this.wallWinter_bottom_6,
      this.wallWinter_bottom_7,
      this.wallWinter_bottom_8,
      this.wallWinter_bottom_9,
      this.wallWinter_bottom_10,
      this.wallWinter_bottom_11,
      this.wallWinter_bottom_12,

      this.wallWinter_left_1,
      this.wallWinter_left_2,
      this.wallWinter_left_3,
      this.wallWinter_left_4,
      this.wallWinter_left_5,
      this.wallWinter_left_6,
      this.wallWinter_left_7,
      this.wallWinter_left_8,
      this.wallWinter_left_9,
      this.wallWinter_left_10,
      this.wallWinter_left_11,
      this.wallWinter_left_12,

      this.wallWinter_right_1,
      this.wallWinter_right_2,
      this.wallWinter_right_3,
      this.wallWinter_right_4,
      this.wallWinter_right_5,
      this.wallWinter_right_6,
      this.wallWinter_right_7,
      this.wallWinter_right_8,
      this.wallWinter_right_9,
      this.wallWinter_right_10,
      this.wallWinter_right_11,
      this.wallWinter_right_12
    );
  }

  gameOver(x, z) {
    if (z < -this.first) {
      if (x == -this.first) {
        this.wallSummer_top_1.rotation.x = -Math.PI / 2;
        this.wallWinter_top_1.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_1;
        meshWinter = this.wallWinter_top_1;
      }
      if (x == -this.second) {
        this.wallSummer_top_2.rotation.x = -Math.PI / 2;
        this.wallWinter_top_2.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_2;
        meshWinter = this.wallWinter_top_2;
      }
      if (x == -this.third) {
        this.wallSummer_top_3.rotation.x = -Math.PI / 2;
        this.wallWinter_top_3.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_3;
        meshWinter = this.wallWinter_top_3;
      }
      if (x == -this.fourth) {
        this.wallSummer_top_4.rotation.x = -Math.PI / 2;
        this.wallWinter_top_4.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_4;
        meshWinter = this.wallWinter_top_4;
      }
      if (x == -this.fifth) {
        this.wallSummer_top_5.rotation.x = -Math.PI / 2;
        this.wallWinter_top_5.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_5;
        meshWinter = this.wallWinter_top_5;
      }
      if (x == -this.sixth) {
        this.wallSummer_top_6.rotation.x = -Math.PI / 2;
        this.wallWinter_top_6.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_6;
        meshWinter = this.wallWinter_top_6;
      }
      if (x == this.sixth) {
        this.wallSummer_top_7.rotation.x = -Math.PI / 2;
        this.wallWinter_top_7.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_7;
        meshWinter = this.wallWinter_top_7;
      }
      if (x == this.fifth) {
        this.wallSummer_top_8.rotation.x = -Math.PI / 2;
        this.wallWinter_top_8.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_8;
        meshWinter = this.wallWinter_top_8;
      }
      if (x == this.fourth) {
        this.wallSummer_top_9.rotation.x = -Math.PI / 2;
        this.wallWinter_top_9.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_9;
        meshWinter = this.wallWinter_top_9;
      }
      if (x == this.third) {
        this.wallSummer_top_10.rotation.x = -Math.PI / 2;
        this.wallWinter_top_10.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_10;
        meshWinter = this.wallWinter_top_10;
      }
      if (x == this.second) {
        this.wallSummer_top_11.rotation.x = -Math.PI / 2;
        this.wallWinter_top_11.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_11;
        meshWinter = this.wallWinter_top_11;
      }
      if (x == this.first) {
        this.wallSummer_top_12.rotation.x = -Math.PI / 2;
        this.wallWinter_top_12.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_top_12;
        meshWinter = this.wallWinter_top_12;
      }
    }

    if (z > this.first) {
      if (x == -this.first) {
        this.wallSummer_bottom_1.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_1.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_1;
        meshWinter = this.wallWinter_bottom_1;
      }
      if (x == -this.second) {
        this.wallSummer_bottom_2.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_2.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_2;
        meshWinter = this.wallWinter_bottom_2;
      }
      if (x == -this.third) {
        this.wallSummer_bottom_3.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_3.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_3;
        meshWinter = this.wallWinter_bottom_3;
      }
      if (x == -this.fourth) {
        this.wallSummer_bottom_4.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_4.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_4;
        meshWinter = this.wallWinter_bottom_4;
      }
      if (x == -this.fifth) {
        this.wallSummer_bottom_5.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_5.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_5;
        meshWinter = this.wallWinter_bottom_5;
      }
      if (x == -this.sixth) {
        this.wallSummer_bottom_6.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_6.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_6;
        meshWinter = this.wallWinter_bottom_6;
      }
      if (x == this.sixth) {
        this.wallSummer_bottom_7.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_7.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_7;
        meshWinter = this.wallWinter_bottom_7;
      }
      if (x == this.fifth) {
        this.wallSummer_bottom_8.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_8.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_8;
        meshWinter = this.wallWinter_bottom_8;
      }
      if (x == this.fourth) {
        this.wallSummer_bottom_9.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_9.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_9;
        meshWinter = this.wallWinter_bottom_9;
      }
      if (x == this.third) {
        this.wallSummer_bottom_10.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_10.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_10;
        meshWinter = this.wallWinter_bottom_10;
      }
      if (x == this.second) {
        this.wallSummer_bottom_11.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_11.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_11;
        meshWinter = this.wallWinter_bottom_11;
      }
      if (x == this.first) {
        this.wallSummer_bottom_12.rotation.x = -Math.PI / 2;
        this.wallWinter_bottom_12.rotation.x = -Math.PI / 2;
        meshSummer = this.wallSummer_bottom_12;
        meshWinter = this.wallWinter_bottom_12;
      }
    }

    if (x < -this.first) {
      if (z == -this.first) {
        this.left(this.wallSummer_left_1);
        this.left(this.wallWinter_left_1);
        meshSummer = this.wallSummer_left_1;
        meshWinter = this.wallWinter_left_1;
      }
      if (z == -this.second) {
        this.left(this.wallSummer_left_2);
        this.left(this.wallWinter_left_2);
        meshSummer = this.wallSummer_left_2;
        meshWinter = this.wallWinter_left_2;
      }
      if (z == -this.third) {
        this.left(this.wallSummer_left_3);
        this.left(this.wallWinter_left_3);
        meshSummer = this.wallSummer_left_3;
        meshWinter = this.wallWinter_left_3;
      }
      if (z == -this.fourth) {
        this.left(this.wallSummer_left_4);
        this.left(this.wallWinter_left_4);
        meshSummer = this.wallSummer_left_4;
        meshWinter = this.wallWinter_left_4;
      }
      if (z == -this.fifth) {
        this.left(this.wallSummer_left_5);
        this.left(this.wallWinter_left_5);
        meshSummer = this.wallSummer_left_5;
        meshWinter = this.wallWinter_left_5;
      }
      if (z == -this.sixth) {
        this.left(this.wallSummer_left_6);
        this.left(this.wallWinter_left_6);
        meshSummer = this.wallSummer_left_6;
        meshWinter = this.wallWinter_left_6;
      }
      if (z == this.sixth) {
        this.left(this.wallSummer_left_7);
        this.left(this.wallWinter_left_7);
        meshSummer = this.wallSummer_left_7;
        meshWinter = this.wallWinter_left_7;
      }
      if (z == this.fifth) {
        this.left(this.wallSummer_left_8);
        this.left(this.wallWinter_left_8);
        meshSummer = this.wallSummer_left_8;
        meshWinter = this.wallWinter_left_8;
      }
      if (z == this.fourth) {
        this.left(this.wallSummer_left_9);
        this.left(this.wallWinter_left_9);
        meshSummer = this.wallSummer_left_9;
        meshWinter = this.wallWinter_left_9;
      }
      if (z == this.third) {
        this.left(this.wallSummer_left_10);
        this.left(this.wallWinter_left_10);
        meshSummer = this.wallSummer_left_10;
        meshWinter = this.wallWinter_left_10;
      }
      if (z == this.second) {
        this.left(this.wallSummer_left_11);
        this.left(this.wallWinter_left_11);
        meshSummer = this.wallSummer_left_11;
        meshWinter = this.wallWinter_left_11;
      }
      if (z == this.first) {
        this.left(this.wallSummer_left_12);
        this.left(this.wallWinter_left_12);
        meshSummer = this.wallSummer_left_12;
        meshWinter = this.wallWinter_left_12;
      }
    }

    if (x > this.first) {
      if (z == -this.first) {
        this.right(this.wallSummer_right_1);
        this.right(this.wallWinter_right_1);
        meshSummer = this.wallSummer_right_1;
        meshWinter = this.wallWinter_right_1;
      }
      if (z == -this.second) {
        this.right(this.wallSummer_right_2);
        this.right(this.wallWinter_right_2);
        meshSummer = this.wallSummer_right_2;
        meshWinter = this.wallWinter_right_2;
      }
      if (z == -this.third) {
        this.right(this.wallSummer_right_3);
        this.right(this.wallWinter_right_3);
        meshSummer = this.wallSummer_right_3;
        meshWinter = this.wallWinter_right_3;
      }
      if (z == -this.fourth) {
        this.right(this.wallSummer_right_4);
        this.right(this.wallWinter_right_4);
        meshSummer = this.wallSummer_right_4;
        meshWinter = this.wallWinter_right_4;
      }
      if (z == -this.fifth) {
        this.right(this.wallSummer_right_5);
        this.right(this.wallWinter_right_5);
        meshSummer = this.wallSummer_right_5;
        meshWinter = this.wallWinter_right_5;
      }
      if (z == -this.sixth) {
        this.right(this.wallSummer_right_6);
        this.right(this.wallWinter_right_6);
        meshSummer = this.wallSummer_right_6;
        meshWinter = this.wallWinter_right_6;
      }
      if (z == this.sixth) {
        this.right(this.wallSummer_right_7);
        this.right(this.wallWinter_right_7);
        meshSummer = this.wallSummer_right_7;
        meshWinter = this.wallWinter_right_7;
      }
      if (z == this.fifth) {
        this.right(this.wallSummer_right_8);
        this.right(this.wallWinter_right_8);
        meshSummer = this.wallSummer_right_8;
        meshWinter = this.wallWinter_right_8;
      }
      if (z == this.fourth) {
        this.right(this.wallSummer_right_9);
        this.right(this.wallWinter_right_9);
        meshSummer = this.wallSummer_right_9;
        meshWinter = this.wallWinter_right_9;
      }
      if (z == this.third) {
        this.right(this.wallSummer_right_10);
        this.right(this.wallWinter_right_10);
        meshSummer = this.wallSummer_right_10;
        meshWinter = this.wallWinter_right_10;
      }
      if (z == this.second) {
        this.right(this.wallSummer_right_11);
        this.right(this.wallWinter_right_11);
        meshSummer = this.wallSummer_right_11;
        meshWinter = this.wallWinter_right_11;
      }
      if (z == this.first) {
        this.right(this.wallSummer_right_12);
        this.right(this.wallWinter_right_12);
        meshSummer = this.wallSummer_right_12;
        meshWinter = this.wallWinter_right_12;
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
    if (meshSummer.position.z < -this.first) {
      meshSummer.rotation.x = 0;
      meshWinter.rotation.x = 0;
    }

    if (meshSummer.position.z > this.first) {
      meshSummer.rotation.x = Math.PI;
      meshWinter.rotation.x = Math.PI;
    }

    if (meshSummer.position.x < -this.first) {
      meshSummer.rotation.x = 0;
      meshSummer.rotation.z = 0;
      meshSummer.rotation.y = Math.PI / 2;
      meshWinter.rotation.x = 0;
      meshWinter.rotation.z = 0;
      meshWinter.rotation.y = Math.PI / 2;
    }

    if (meshSummer.position.x > this.first) {
      meshSummer.rotation.x = 0;
      meshSummer.rotation.z = 0;
      meshSummer.rotation.y = -Math.PI / 2;
      meshWinter.rotation.x = 0;
      meshWinter.rotation.z = 0;
      meshWinter.rotation.y = -Math.PI / 2;
    }
  }
}
