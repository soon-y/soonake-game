import * as THREE from 'three'
import Application from "../Application"
import { param } from '../param'

export default class PlayField {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.resource = this.resources.items.wall

        this.setGeometry()
        this.setTextures()
        this.setMaterial()
        this.setWall()
        this.setMesh()
    }
    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(param.boardSize, param.boardSize)
    }

    setTextures() {
        this.textures = {}
        this.textures.color = this.resources.items.fieldTexture
        this.textures.normal = this.resources.items.fieldNormal
        this.textures.rough = this.resources.items.fieldRough
        this.textures.color.encoding = THREE.sRGBEncoding
        this.textures.color.wrapS = THREE.RepeatWrapping
        this.textures.color.wrapT = THREE.RepeatWrapping
        this.textures.color.repeat.set(3, 3)
        this.textures.normal.wrapS = THREE.RepeatWrapping
        this.textures.normal.wrapT = THREE.RepeatWrapping
        this.textures.normal.repeat.set(3, 3)
        this.textures.rough.wrapS = THREE.RepeatWrapping
        this.textures.rough.wrapT = THREE.RepeatWrapping
        this.textures.rough.repeat.set(3, 3)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: '#ffffff',
            map: this.textures.color,
            normalMap: this.textures.normal,
            roughnessMap: this.textures.rough,         
            side: THREE.DoubleSide
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = - Math.PI * 0.5
        this.mesh.position.y = -0.01
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)
    }

    setWall() {
        this.wall = this.resource.scene
        this.wall.position.y = 0.1
        this.scene.add(this.wall)

        this.wall.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }
}