import * as THREE from "three";
import Application from "../Application";
import { param } from "../param";
import { Font } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default class Text {
  constructor() {
    this.application = new Application();
    this.resources = this.application.resources;
    this.resource = this.resources.items.kenpixel;
    this.font = new Font(this.resource);
    this.group = new THREE.Group();
    this.msg = null
  }

  refreshText(text) {
    this.group.remove(this.mesh);
    this.createText(text);
    this.group.add(this.mesh);
  }

  createText(text) {
    this.msg = text
    let textGeo = new TextGeometry(text.toString(), {
      font: this.font,
      size: param.size,
      height: param.size / 4,
    });

    textGeo.computeBoundingBox();
    textGeo.computeVertexNormals();

    const centerOffset =
      -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

    this.mesh = new THREE.Mesh(
      textGeo,
      new THREE.MeshBasicMaterial({ color: "#F7F7F7" })
    );
    this.mesh.castShadow = true;
    this.mesh.position.x = centerOffset;
  }
}
