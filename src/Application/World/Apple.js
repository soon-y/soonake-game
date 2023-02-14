import * as THREE from 'three'
import Application from "../Application"
import { param } from '../param';

export default class Apple {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.resource = this.resources.items.apple
        this.instance = new THREE.Group()
        this.object = this.resource

        this.setTextures()
        this.setMaterial()
        this.setModel()
    }

    setTextures() {
        this.textures = {}
        this.textures.color = this.resources.items.appleDiff
        this.textures.rough = this.resources.items.appleRough
        this.textures.color.encoding = THREE.sRGBEncoding
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            map: this.textures.color,
            roughnessMap: this.textures.rough
        })
        this.object.children.forEach(child => child.material = this.material)
    }

    setModel() {
        this.object.rotation.y = Math.PI
        this.instance.add(this.object);
        this.object.traverse(function (child) { child.castShadow = true; })
    }
}