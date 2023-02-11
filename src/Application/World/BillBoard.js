import * as THREE from 'three'
import Application from '../Application'
import { param } from '../param'
import Text from './Text'

export default class BillBoard {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.text = new Text()
        this.score = this.text.score
        this.rt = this.application.rtCamera.rt

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }
    
    setGeometry() {
        this.boxGeo = new THREE.BoxGeometry(param.boardSize, param.boardSize / 5 * 2, param.size / 3)
        this.cylinderGeo = new THREE.CylinderGeometry(param.size / 10, param.size / 10, param.size * 2, 64)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: '#000000',
        })

        this.metal = new THREE.MeshStandardMaterial({
            color: '#dddddd',
            metalness: 1
        })
    }

    setMesh() {
        this.box = new THREE.Mesh(this.boxGeo, this.material)
        this.box.position.y = param.boardSize / 6 + param.size * 2
        this.box.position.z = - param.boardSize / 2 - param.wallWidth * 2
        this.box.castShadow = true
        this.cylinder1 = new THREE.Mesh(this.cylinderGeo, this.metal)
        this.cylinder1.castShadow = true
        this.cylinder1.position.y = param.size
        this.cylinder1.position.z = - param.boardSize / 2 - param.wallWidth * 2
        this.cylinder2 = this.cylinder1.clone()
        this.cylinder1.position.x = - param.boardSize / 3
        this.cylinder2.position.x = param.boardSize / 3
        this.box.castShadow = true
        this.cylinder1.castShadow = true
        this.cylinder2.castShadow = true

        this.score.position.y = param.size * 2.2
        this.score.position.x = param.boardSize / 2 - param.boardSize / 9
        this.score.position.z = - param.boardSize / 2 - param.wallWidth * 2 + param.size / 3 / 2

        this.screen = new THREE.Mesh(
            new THREE.PlaneGeometry(param.boardSize / 4 * 3, param.boardSize / 3),
            new THREE.MeshBasicMaterial({ map: this.rt.texture }))

        this.screen.position.y = param.boardSize / 6 + param.size * 2
        this.screen.position.z = - param.boardSize / 2 - param.wallWidth * 2 + param.size / 3 / 2 + 0.01
        this.screen.position.x = - param.boardSize / 10 

        this.scene.add(this.box, this.cylinder1, this.cylinder2, this.score, this.screen)
    }
}