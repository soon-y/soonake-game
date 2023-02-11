import * as THREE from 'three'
import Application from "../Application"
import { param } from '../param'

const today = new Date();
const second = today.getSeconds();
const minute = today.getMinutes();
const hour = today.getHours();
const angle = -Math.PI / 30
const hourAngle = -Math.PI / 6
const minAngle = hourAngle / 60
const secAngle = angle / 60
let hourHand, minuteHand, secondHand
let ready = false

export default class Clock {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.instance = new THREE.Group()
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.bigTickGeo = new THREE.BoxGeometry(param.size / 20, param.size / 5, param.size / 40)
        this.bigTickGeo.computeBoundingBox()
        this.bigTickGeo.translate(
            0, param.size - param.size / 16, 0
        )

        this.smallTickGeo = new THREE.BoxGeometry(param.size / 30, param.size / 10, param.size / 50)
        this.smallTickGeo.computeBoundingBox()
        this.smallTickGeo.translate(
            0, param.size, 0
        )

        this.hourHandGeo = new THREE.BoxGeometry(param.size / 14, param.size / 4 * 3, param.size / 50)
        this.minuteHandGeo = new THREE.BoxGeometry(param.size / 14, param.size, param.size / 50)
        this.secondHandGeo = new THREE.BoxGeometry(param.size / 30, param.size, param.size / 50)
        this.cylinderGeo = new THREE.CylinderGeometry(param.size / 20, param.size / 20, param.size / 10, 64)
        this.hourHandGeo.computeBoundingBox()
        this.minuteHandGeo.computeBoundingBox()
        this.secondHandGeo.computeBoundingBox()
        this.hourHandGeo.translate(0, param.size / 4, 0);
        this.minuteHandGeo.translate(0, param.size / 3, 0);
        this.secondHandGeo.translate(0, param.size / 3, 0);
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: '#aaaaaa'
        })

        this.handMat = new THREE.MeshStandardMaterial({
            color: '#ffffff'
        })
    }

    setMesh() {
        this.bigTick = new THREE.Mesh(this.bigTickGeo, this.material)
        this.smallTick = new THREE.Mesh(this.smallTickGeo, this.material)

        for (let i = 1; i <= 12; i++) {
            const bigTicks = this.bigTick.clone();
            bigTicks.rotation.z = hourAngle * i;
            this.instance.add(bigTicks)
        }
        for (let i = 1; i < 60; i++) {
            const smallTicks = this.smallTick.clone();
            smallTicks.rotation.z = angle * i;
            this.instance.add(smallTicks);
        }

        hourHand = new THREE.Mesh(this.hourHandGeo, this.handMat)
        minuteHand = new THREE.Mesh(this.minuteHandGeo, this.handMat)
        secondHand = new THREE.Mesh(this.secondHandGeo, this.handMat)
        this.cylinder = new THREE.Mesh(this.cylinderGeo, this.handMat)
        this.instance.add(hourHand, minuteHand, secondHand, this.cylinder)

        this.cylinder.rotation.x = Math.PI / 2
        this.cylinder.position.z = param.size / 10 / 2
        hourHand.position.z = param.size / 40
        minuteHand.position.z = param.size / 40 * 2
        secondHand.position.z = param.size / 40 * 3

        hourHand.rotation.z = hourAngle * hour + minAngle * minute + Math.PI / 2 + hourAngle * 3
        minuteHand.rotation.z = angle * minute + secAngle * second + Math.PI / 2 + hourAngle * 3
        secondHand.rotation.z = angle * second + hourAngle * 3

        this.instance.position.y = param.boardSize / 6 + param.size * 3
        this.instance.position.x = param.boardSize / 2 - param.boardSize / 9
        this.instance.position.z = - param.boardSize / 2 - param.wallWidth * 2 + param.size / 3 / 2

        this.scene.add(this.instance)
        ready = true
    }
}

setInterval(() => {
    if (ready) {
        const today2 = new Date()
        const second2 = today2.getSeconds()
        const minute2 = today2.getMinutes()
        const hour2 = today2.getHours()

        secondHand.rotation.set(0, 0, angle * second2 + hourAngle * 3)
        minuteHand.rotation.z = angle * minute2 + secAngle * second2 + Math.PI / 2 + hourAngle * 3
        hourHand.rotation.z = hourAngle * hour2 + minAngle * minute2 + Math.PI / 2 + hourAngle * 3
    }
}, 1000)