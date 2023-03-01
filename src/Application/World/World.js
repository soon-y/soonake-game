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
import { gsap } from 'gsap'
import 'hammerjs'

const canvas = document.querySelector('canvas.webgl')
const btn = document.getElementById("start-button")
const step = 1
let audioApple, audioOver
const direction = new THREE.Vector3(0, 0, 0)
const snake = new THREE.Group()
let rtCamera, msg
let ready = false
let rotation = false
let ignore = false
let hammertime = new Hammer(canvas);

export default class World {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.apple = new THREE.Group()
        this.body = new THREE.Group()
        rtCamera = this.application.rtCamera.instance
        this.camera = this.application.camera

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
            window.setInterval(() => {
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
            }, 250)
            window.addEventListener("keydown", this.arrowKey)
            this.start()
        })

        btn.addEventListener("click", () => {
            if (isTouchDevice() === true) {
                gsap.to(this.camera.instance.position, { duration: 1, x: 0, y: 14, z: 8, ease: 'power2.inout' })
                this.camera.controls.target = new THREE.Vector3(0, 0, 0)
                this.camera.controls.enableDamping = false
                this.camera.controls.enabled = false
            }
            btn.style.display = 'none'
            this.setAudio()
            ready = true
        })

        //swipe gestures
        hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        hammertime.on('swipe', function (ev) {
            if (msg.visible && ready && isTouchDevice())
                msg.visible = false
        })

        hammertime.on('swipeleft', function () {
            if (isTouchDevice() && !ignore && ready) {
                goLeft()
            }
            setIgnore()
        })
        hammertime.on('swiperight', function () {
            if (isTouchDevice() && !ignore && ready) {
                goRight()
            }
            setIgnore()
        })
        hammertime.on('swipeup', function () {
            if (isTouchDevice() && !ignore && ready) {
                goUp()
            }
            setIgnore()
        })
        hammertime.on('swipedown', function () {
            if (isTouchDevice() && !ignore && ready) {
                goDown()
            }
            setIgnore()
        })
    }

    arrowKey(event) {
        event.preventDefault()
        if (ready) {
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
                if (!ignore) goLeft()
                setIgnore()
            }
            if (event.key === "ArrowRight") {
                rotation = false
                if (direction.x == -step)
                    return
                if (!ignore) goRight()
                setIgnore()
            }
            if (event.key === "ArrowUp") {
                rotation = true
                if (direction.z == step)
                    return
                if (!ignore) goUp()
                setIgnore()
            }
            if (event.key === "ArrowDown") {
                rotation = true
                if (direction.z == -step)
                    return
                if (!ignore) goDown()
                setIgnore()
            }
        }
    }

    playGiude() {
        if (isTouchDevice() === true) {
            this.text.getMsg("Swipe!")
        } else {
            this.text.getMsg("Press any arrow key!")
        }
        msg = this.text.msg
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
        rtCamera.position.z = param.size / 3
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
        alert("Game Over.\nSnake length: " + this.snakeLength);
        this.start();
    }

    setAudio() {
        const audioLoader = new THREE.AudioLoader()
        const listener1 = new THREE.AudioListener()
        const listener2 = new THREE.AudioListener()
        this.camera.instance.add(listener1, listener2)

        audioLoader.load('./sound/gameOver.wav', function (buffer) {
            audioOver = new THREE.Audio(listener1)
            audioOver.setBuffer(buffer)
        })

        audioLoader.load('./sound/appleBite.wav', function (buffer) {
            audioApple = new THREE.Audio(listener2)
            audioApple.setBuffer(buffer)
        })
    }

    update() {
        if (ready) {
            // when the snake hit the boundaries
            if (
                snake.children[0].position.x > param.boardSize / 2 ||
                snake.children[0].position.x < -param.boardSize / 2 ||
                snake.children[0].position.z > param.boardSize / 2 ||
                snake.children[0].position.z < -param.boardSize / 2) {
                audioOver.play()
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
                audioApple.play()

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

function setIgnore() {
    /**
     * to ignore direction changes while snake is moving 
     */
    if (ignore) {
        return;
    }
    ignore = true;
    setTimeout(() => {
        ignore = false;
    }, 200)
}

function goLeft() {
    snake.children[0].rotation.y = -Math.PI / 2
    direction.x = -step
    direction.z = 0
    rtCamera.lookAt(
        snake.children[0].position.x - param.boardSize,
        param.size / 2,
        snake.children[0].position.z)
}

function goRight() {
    snake.children[0].rotation.y = Math.PI / 2
    direction.x = step
    direction.z = 0
    rtCamera.lookAt(
        snake.children[0].position.x + param.boardSize,
        param.size / 2,
        snake.children[0].position.z)
}

function goUp() {
    snake.children[0].rotation.y = Math.PI
    direction.z = -step
    direction.x = 0
    rtCamera.lookAt(
        snake.children[0].position.x,
        param.size / 2,
        snake.children[0].position.z - param.boardSize)
}

function goDown() {
    snake.children[0].rotation.y = 0
    direction.z = step
    direction.x = 0
    rtCamera.lookAt(
        snake.children[0].position.x,
        param.size / 2,
        snake.children[0].position.z + param.boardSize)
}

function isTouchDevice() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
}