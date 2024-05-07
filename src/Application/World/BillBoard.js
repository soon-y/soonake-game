import * as THREE from "three";
import Application from "../Application";
import { param } from "../param";
import Text from "./Text";

export default class BillBoard {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.score = new Text();
    this.rt = this.application.rtCamera.rt;

    this.setMesh();
  }

  setMesh() {
    this.score.msg.position.y = param.size * 2.2;
    this.score.msg.position.x = param.boardSize / 2 - param.boardSize / 9;
    this.score.msg.position.z =
      -param.boardSize / 2 - param.wallWidth * 2 + 0.01;

    this.screen = new THREE.Mesh(
      new THREE.PlaneGeometry((param.boardSize / 4) * 3, param.boardSize / 3),
      new THREE.MeshBasicMaterial({
        color: "#848484",
        map: this.rt.texture,
      })
    );

    this.screen.position.y = param.boardSize / 6 + param.size * 2;
    this.screen.position.z =
      -param.boardSize / 2 - param.wallWidth * 2 + param.size / 3 / 2 + 0.01;
    this.screen.position.x = -param.boardSize / 10;
    this.screen.position.z += 0.005;

    this.scene.add(this.score.msg, this.screen);
  }
}
