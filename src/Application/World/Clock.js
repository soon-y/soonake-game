import * as THREE from "three";
import { param } from "../param";

let today = new Date();
let second = today.getSeconds();
let minute = today.getMinutes();
let hour = today.getHours();
const angle = -Math.PI / 30;
const hourAngle = -Math.PI / 6;
const minAngle = hourAngle / 60;
const secAngle = angle / 60;
let hourHand, minuteHand, secondHand;
let ready = false;

export default class Clock {
  constructor() {
    this.instance = new THREE.Group();
    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.depth = param.size / 26;
    this.handWidth = param.size / 15;
    this.handLength = param.size;

    this.bigTickGeo = new THREE.BoxGeometry(
      this.handWidth,
      this.handLength / 5,
      this.depth * 2
    );
    this.bigTickGeo.computeBoundingBox();
    this.bigTickGeo.translate(0, param.size - param.size / 16, 0);

    this.smallTickGeo = new THREE.BoxGeometry(
      this.handWidth / 2,
      this.handLength / 10,
      this.depth
    );
    this.smallTickGeo.computeBoundingBox();
    this.smallTickGeo.translate(0, param.size, 0);

    this.hourHandGeo = new THREE.BoxGeometry(
      this.handWidth,
      this.handLength * 0.7,
      this.depth
    );
    this.minuteHandGeo = new THREE.BoxGeometry(
      this.handWidth,
      this.handLength,
      this.depth
    );
    this.secondHandGeo = new THREE.BoxGeometry(
      this.handWidth / 2,
      this.handLength,
      this.depth / 2
    );
    this.cylinderGeo = new THREE.CylinderGeometry(
      this.depth * 3,
      this.depth * 3,
      this.depth * 4,
      32
    );
    this.hourHandGeo.computeBoundingBox();
    this.minuteHandGeo.computeBoundingBox();
    this.secondHandGeo.computeBoundingBox();
    this.hourHandGeo.translate(0, this.handLength / 4, 0);
    this.minuteHandGeo.translate(0, this.handLength / 2, 0);
    this.secondHandGeo.translate(0, this.handLength / 2, 0);
  }

  setMaterial() {
    this.tickMat = new THREE.MeshStandardMaterial({
      color: "#aaaaaa",
    });

    this.handMat = new THREE.MeshStandardMaterial({
      color: "#ffffff",
    });

    this.cylinderMat = new THREE.MeshStandardMaterial({
      color: "#F0F0F0",
    });

  }

  setMesh() {
    this.bigTick = new THREE.Mesh(this.bigTickGeo, this.tickMat);
    this.smallTick = new THREE.Mesh(this.smallTickGeo, this.tickMat);

    for (let i = 1; i <= 12; i++) {
      const bigTicks = this.bigTick.clone();
      bigTicks.rotation.z = hourAngle * i;
      this.instance.add(bigTicks);
    }
    for (let i = 1; i < 60; i++) {
      const smallTicks = this.smallTick.clone();
      smallTicks.rotation.z = angle * i;
      this.instance.add(smallTicks);
    }

    hourHand = new THREE.Mesh(this.hourHandGeo, this.handMat);
    minuteHand = new THREE.Mesh(this.minuteHandGeo, this.handMat);
    secondHand = new THREE.Mesh(this.secondHandGeo, this.handMat);
    this.cylinder = new THREE.Mesh(this.cylinderGeo, this.cylinderMat);
    this.instance.add(hourHand, minuteHand, secondHand, this.cylinder);

    this.zPos = param.size / 40;
    this.cylinder.rotation.x = Math.PI / 2;
    this.cylinder.position.z = this.zPos / 2;
    hourHand.position.z = this.zPos;
    minuteHand.position.z = this.zPos * 2;
    secondHand.position.z = this.zPos * 3;

    hourHand.rotation.z =
      hourAngle * hour + minAngle * minute + Math.PI / 2 + hourAngle * 3;
    minuteHand.rotation.z =
      angle * minute + secAngle * second + Math.PI / 2 + hourAngle * 3;
    secondHand.rotation.z = angle * second + hourAngle * 3;
    ready = true;
  }
}

setInterval(() => {
  if (ready) {
    let today2 = new Date();
    let second2 = today2.getSeconds();
    let minute2 = today2.getMinutes();
    let hour2 = today2.getHours();

    secondHand.rotation.set(0, 0, angle * second2 + hourAngle * 3);
    minuteHand.rotation.z =
      angle * minute2 + secAngle * second2 + Math.PI / 2 + hourAngle * 3;
    hourHand.rotation.z =
      hourAngle * hour2 + minAngle * minute2 + Math.PI / 2 + hourAngle * 3;
  }
}, 1000);
