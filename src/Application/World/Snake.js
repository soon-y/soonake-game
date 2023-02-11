import * as THREE from 'three'
import Application from "../Application"

export default class Snake
{
    constructor()
    {
        this.application = new Application()
        this.resources = this.application.resources
        this.snakeHead = this.resources.items.head
        this.snakeBody1 = this.resources.items.body1
        this.snakeBody2 = this.resources.items.body2

        this.setModel()
 
    }

    setModel(){
        this.head = this.snakeHead.scene
        this.body1 = this.snakeBody1.scene
        this.body2 = this.snakeBody2.scene

        this.head.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

        this.body1.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })

        this.body2.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true
            }
        })
    }
}