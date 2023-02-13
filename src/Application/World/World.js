import * as THREE from 'three'
import Application from "../Application"
import Environment from './Environment'
import Floor from './Floor'
import PlayField from './PlayField'
import BillBoard from './BillBoard'
import Apple from "./Apple"
import Text from './Text'
import Snake from "./Snake"
import Clock from './Clock'
import { param } from '../param'
import 'hammerjs'


const direction = new THREE.Vector3(0, 0, 0)
const listener = new THREE.AudioListener()
const sound = new THREE.Audio(listener)
const snake = new THREE.Group()
let rtCamera, msg
let ready = false
let rotation = false
document.addEventListener("keydown", arrowKey)
const canvas = document.querySelector('canvas.webgl')

export default class World {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.audioLoader = new THREE.AudioLoader()
        this.resources = this.application.resources
        this.apple = new THREE.Group()
        this.body = new THREE.Group()
        rtCamera = this.application.rtCamera.instance

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            this.environment = new Environment()
            this.playField = new PlayField()
            this.text = new Text()
            this.apple.add(new Apple().instance)
            this.snake = new Snake()
            snake.add(this.snake.head)
            snake.children[0].add(rtCamera)
            this.body.add(this.snake.body1, this.snake.body2)
            this.billBoard = new BillBoard()
            this.clock = new Clock().instance
            this.playGiude()
            this.start()
        })
    }

    playGiude() {
        if (isTouchDevice() === true) {
            this.text.getMsg("Swipe!")
            this.application.camera.controls.enabled = false
            this.application.camera.controls.enableZoom = true
        } else {
            this.text.getMsg("Press any arrow key!")
        }
        msg = this.text.msg
        msg.rotation.x = -Math.PI / 2
        msg.position.z = param.boardSize / 2 + param.size * 2
        this.scene.add(this.apple, snake, msg)
    }

    start() {
        // remove snake bodies
        for (let i = snake.children.length - 1; i > 0; i--) {
            snake.remove(snake.children[i])
        }

        // initialization
        this.snakeLength = 0
        direction.x = 0
        direction.z = 0
        this.text.refreshText("00")

        this.placeSnake()
        this.placeApple()
        this.placeRtCam()
        ready = true
    }

    placeSnake() {
        // place snake rendomly
        snake.children[0].position.x = (Math.floor(param.boardSize * (Math.random())) - param.boardSize / 2 + param.size / 2)
        snake.children[0].position.z = (Math.floor(param.boardSize * (Math.random())) - param.boardSize / 2 + param.size / 2)
    }

    placeApple() {
        let applePosX = (Math.floor(param.boardSize * (Math.random())) - param.boardSize / 2 + param.size / 2)
        let applePosZ = (Math.floor(param.boardSize * (Math.random())) - param.boardSize / 2 + param.size / 2)

        // place an apple randomly where there is no snake
        while (samePositionAsSnake(applePosX, applePosZ)) {
            applePosX = (Math.floor(param.boardSize * (Math.random())) - param.boardSize / 2 + param.size / 2)
            applePosZ = (Math.floor(param.boardSize * (Math.random())) - param.boardSize / 2 + param.size / 2)
        }
        this.apple.position.x = applePosX
        this.apple.position.z = applePosZ
    }

    placeRtCam() {
        rtCamera.position.y = param.size / 2
        rtCamera.position.z = param.size / 2
        if (snake.children[0].position.x < 0) { // left
            snake.children[0].rotation.y = Math.PI / 2
            rtCamera.lookAt(
                snake.children[0].position.x + param.boardSize,
                param.size / 2,
                snake.children[0].position.z)
        } else { //right
            snake.children[0].rotation.y = -Math.PI / 2
            rtCamera.lookAt(
                snake.children[0].position.x - param.boardSize,
                param.size / 2,
                snake.children[0].position.z)
        }
    }

    addBody() {
        let snakeBody = this.body.children[1].clone()
        if (this.snakeLength % 2 == 1) {
            snakeBody = this.body.children[0].clone()
        }
        snakeBody.castShadow = true
        snakeBody.position.x = snake.children[0].position.x
        snakeBody.position.z = snake.children[0].position.z
        snake.add(snakeBody)
    }

    gameOver() {
        ready = false
        this.audioLoader.load('./sound/gameOver.mp3', function (buffer) {
            sound.setBuffer(buffer)
            sound.play();
        });
        alert("Game Over.\nSnake length: " + this.snakeLength);
        this.start();
    }

    update() {
        if (ready) {
            // when the snake hit the boundaries
            if (
                snake.children[0].position.x > param.boardSize / 2 ||
                snake.children[0].position.x < -param.boardSize / 2 ||
                snake.children[0].position.z > param.boardSize / 2 ||
                snake.children[0].position.z < -param.boardSize / 2) {
                this.gameOver()
            }

            // when the snake intersects itself
            for (let i = 1; i < snake.children.length - 1; i++) {
                if (snake.children[0].position.x == snake.children[i].position.x &&
                    snake.children[0].position.z == snake.children[i].position.z) {
                    this.gameOver()
                }
            }

            // when the snake hits the apple
            if (snake.children[0].position.x == this.apple.position.x &&
                snake.children[0].position.z == this.apple.position.z) {
                this.snakeLength++
                this.audioLoader.load('./sound/appleBite.wav', function (buffer) {
                    sound.setBuffer(buffer)
                    sound.play()
                })
                if (this.snakeLength < 10) {
                    this.text.refreshText("0" + this.snakeLength.toString())
                } else {
                    this.text.refreshText(this.snakeLength.toString())
                }
                this.placeApple()
                this.addBody()
            }

            if (this.snakeLength) {
                if (snake.children[this.snakeLength].position.x == snake.children[0].position.x &&
                    snake.children[this.snakeLength].position.z == snake.children[0].position.z) {
                    snake.children[this.snakeLength].visible = false
                } else {
                    snake.children[this.snakeLength].visible = true
                }
            }
        }
    }
}

function samePositionAsSnake(x, z) {
    for (let i = 0; i < snake.children.length; i++) {
        if (x == snake.children[i].position.x &&
            z == snake.children[i].position.z) {
            return true
        }
    }
    return false
}

const step = 1
function arrowKey(event) {
    event.preventDefault()
    if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown") {
        msg.visible = false
    }

    if (event.key === "ArrowLeft") {
        rotation = false
        if (direction.x == step)
            return
        goLeft()
    }
    if (event.key === "ArrowRight") {
        rotation = false
        if (direction.x == -step)
            return
        goRight()
    }
    if (event.key === "ArrowUp") {
        rotation = true
        if (direction.z == step)
            return
        goUp()
    }
    if (event.key === "ArrowDown") {
        rotation = true
        if (direction.z == -step)
            return
        goDown()
    }
}

// swipe gestures
let hammertime = new Hammer(canvas);
hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
hammertime.on('swipeleft', function(ev) {
    goLeft()
})
hammertime.on('swiperight', function(ev) {
    goRight()
})
hammertime.on('swipeup', function(ev) {
    goUp()
})
hammertime.on('swipedown', function(ev) {
    goDown()
})

function goLeft(){
    snake.children[0].rotation.y = -Math.PI / 2
        direction.x = -step
        direction.z = 0
        rtCamera.lookAt(
            snake.children[0].position.x - param.boardSize,
            param.size / 2,
            snake.children[0].position.z)
}

function goRight(){
        snake.children[0].rotation.y = Math.PI / 2
        direction.x = step
        direction.z = 0
        rtCamera.lookAt(
            snake.children[0].position.x + param.boardSize,
            param.size / 2,
            snake.children[0].position.z)
}

function goUp(){
    snake.children[0].rotation.y = Math.PI
        direction.z = -step
        direction.x = 0
        rtCamera.lookAt(
            snake.children[0].position.x,
            param.size / 2,
            snake.children[0].position.z - param.boardSize)
}

function goDown(){
    snake.children[0].rotation.y = 0
        direction.z = step
        direction.x = 0
        rtCamera.lookAt(
            snake.children[0].position.x,
            param.size / 2,
            snake.children[0].position.z + param.boardSize)
}

setInterval(() => {
    if (ready) {
        for (let i = snake.children.length - 1; i > 0; i--) {
            if (snake.children[i].position.x == snake.children[i - 1].position.x) {
                snake.children[i].rotation.y = Math.PI / 2
            } else {
                snake.children[i].rotation.y = 0
            }
            snake.children[i].position.x = snake.children[i - 1].position.x
            snake.children[i].position.z = snake.children[i - 1].position.z
        }
        snake.children[0].position.add(direction.clone())
    }
}, 250)

function isTouchDevice() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}