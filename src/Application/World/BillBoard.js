import * as THREE from "three";
import Application from "../Application";
import Clock from "./Clock";
import { param } from "../param";
import Text from "./Text";

export default class BillBoard {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.score = new Text();
    this.rt = this.application.rtCamera.rt;
    this.clock = new Clock().instance;

    this.setMesh();
  }

  setMesh() {
    this.screen = new THREE.Mesh(
      new THREE.PlaneGeometry((param.boardSize / 4) * 3, param.boardSize / 3),
      new THREE.MeshBasicMaterial({
        color: "#848484",
        map: this.rt.texture,
      })
    );

    this.distance = param.boardSize / 2 + 0.65;
    this.yPos = param.boardSize / 3;
    this.xPos = (param.boardSize / 2) * 0.78;

    this.score.msg.position.z = -this.distance - 0.2;
    this.screen.position.z = -this.distance;
    this.clock.position.z = -this.distance;

    this.screen.position.x = -param.boardSize / 10;
    this.score.msg.position.x = this.xPos;
    this.clock.position.x = this.xPos;

    this.screen.position.y = this.yPos;
    this.clock.position.y = this.yPos + param.size;
    this.score.msg.position.y = this.yPos - param.size * 1.8;

    this.scene.add(this.score.msg, this.screen, this.clock);
  }
}
