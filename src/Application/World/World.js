import * as THREE from "three";
import Application from "../Application";
import Environment from "./Environment";
import OceanSummer from "./OceanSummer";
import OceanWinter from "./OceanWinter";
import BillBoard from "./BillBoard";
import Field from "./Field";
import Food from "./Food";
import Text from "./Text";
import Snake from "./Snake";
import Fence from "./Fence";
import Wall from "./Wall";
import Queue from "../Queue";
import { param } from "../param";
import "hammerjs";

const canvas = document.querySelector("canvas.webgl");
const hammertime = new Hammer(canvas);
const nodeList = document.getElementsByTagName("button")
const startbtn = document.querySelector("button.fa-play");
const replay = document.querySelector("button.fa-rotate-right");
const audioOnOff = document.querySelector(".audio");
const on = document.querySelector("i.fa-volume-high");
const off = document.querySelector("i.fa-volume-xmark");
const springBtn = document.getElementById("spring");
const summerBtn = document.getElementById("summer");
const fallBtn = document.getElementById("fall");
const winterBtn = document.getElementById("winter");
const step = param.size;
const direction = new THREE.Vector3(0, 0, 0);
const snake = new THREE.Group();
let msg;
let ready = false;
let ignore = false;


export default class World {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.camera = this.application.camera;
    this.resources = this.application.resources;
    this.seasonFood = new THREE.Group();
    this.boundary = new THREE.Group();
    this.seasonField = new THREE.Group();
    this.body = new THREE.Group();

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.environment = new Environment();
      this.oceanSummer = new OceanSummer();
      this.oceanWinter = new OceanWinter();
      this.food = new Food();
      this.snake = new Snake();
      this.billBoard = new BillBoard();
      this.field = new Field();
      this.fence = new Fence();
      this.wall = new Wall();
      this.lastPosX = new Queue();
      this.lastPosZ = new Queue();
      this.text = new Text();
      this.text.refreshText("Ready?");
      msg = this.text.msg;
      msg.rotation.x = -Math.PI / 2;
      msg.position.z = param.boardSize * 0.75;
      msg.position.y = -0.25;

      this.seasonFood.add(this.food.spring);
      this.seasonField.add(this.field.spring);
      this.boundary.add(this.fence.spring);
      snake.add(this.snake.head);
      this.body.add(this.snake.body1, this.snake.body2);
      this.scene.add(
        this.boundary,
        this.field.base,
        this.seasonField,
        this.oceanSummer.mesh,
        this.oceanWinter.mesh,
        msg,
        snake
      );
   
      this.snake.blink();
      this.snake.flick();
      this.start();
      this.setAudio();
    });

    window.addEventListener("keydown", this.arrowKey);

    window.setInterval(() => {
      if (ready) {
        for (let i = snake.children.length - 1; i > 0; i--) {
          // rotation body when x pos are same
          if (
            snake.children[i].position.x == snake.children[i - 1].position.x
          ) {
            snake.children[i].rotation.y = Math.PI / 2;
          } else {
            snake.children[i].rotation.y = 0;
          }
          snake.children[i].position.x = snake.children[i - 1].position.x;
          snake.children[i].position.z = snake.children[i - 1].position.z;
        }

        // move snakehead 
        snake.children[0].position.add(direction.clone());

        // add last position for adding snake body
        this.lastPosX.enqueue(
          snake.children[snake.children.length - 1].position.x
        );
        this.lastPosZ.enqueue(
          snake.children[snake.children.length - 1].position.z
        );
        if (this.lastPosX.length() > 2) {
          this.lastPosX.dequeue();
          this.lastPosZ.dequeue();
        }
      }
    }, 250);

    /* button event */
    audioOnOff.addEventListener("click", () => {
      if (audioOnOff.checked) {
        on.style.opacity = "0";
        off.style.opacity = "1";
        this.audioGulp.setVolume(0);
        this.audioBite.setVolume(0);
        this.audioOver.setVolume(0);
      } else {
        on.style.opacity = "1";
        off.style.opacity = "0";
        this.audioGulp.setVolume(1);
        this.audioBite.setVolume(1);
        this.audioOver.setVolume(1);
      }
    });

    startbtn.addEventListener("click", () => {
      this.clickStart();
      ready = true;
    });

    replay.addEventListener("click", () => {
      this.fence.revert();
      this.wall.revert();
      this.clickStart();
      this.start();
    });

    //season change
    springBtn.addEventListener("click", () => {
      if (this.seasonFood.children[0] != this.food.spring) {
        this.seasonFood.remove(this.seasonFood.children[0]);
        this.seasonFood.add(this.food.spring);
        this.seasonField.remove(this.seasonField.children[0]);
        this.seasonField.add(this.field.spring);
        this.snake.season.remove(this.snake.season.children[0]);
        this.snake.season.add(this.snake.spring);
        this.boundary.remove(this.boundary.children[0]);
        this.boundary.add(this.fence.spring);
      }
    });

    summerBtn.addEventListener("click", () => {
      if (this.seasonFood.children[0] != this.food.summer) {
        this.seasonFood.remove(this.seasonFood.children[0]);
        this.seasonFood.add(this.food.summer);
        this.seasonField.remove(this.seasonField.children[0]);
        this.seasonField.add(this.field.summer);
        this.snake.season.remove(this.snake.season.children[0]);
        this.snake.season.add(this.snake.summer);
        this.boundary.remove(this.boundary.children[0]);
        this.boundary.add(this.wall.summer);
        this.scene.remove(this.oceanWinter.mesh);
        this.scene.add(this.oceanSummer.mesh);
      }
    });

    fallBtn.addEventListener("click", () => {
      if (this.seasonFood.children[0] != this.food.fall) {
        this.seasonFood.remove(this.seasonFood.children[0]);
        this.seasonFood.add(this.food.fall);
        this.seasonField.remove(this.seasonField.children[0]);
        this.seasonField.add(this.field.fall);
        this.snake.season.remove(this.snake.season.children[0]);
        this.snake.season.add(this.snake.fall);
        this.boundary.remove(this.boundary.children[0]);
        this.boundary.add(this.fence.fall);
      }
    });

    winterBtn.addEventListener("click", () => {
      if (this.seasonFood.children[0] != this.food.winter) {
        this.seasonFood.remove(this.seasonFood.children[0]);
        this.seasonFood.add(this.food.winter);
        this.seasonField.remove(this.seasonField.children[0]);
        this.seasonField.add(this.field.winter);
        this.snake.season.remove(this.snake.season.children[0]);
        this.snake.season.add(this.snake.winter);
        this.boundary.remove(this.boundary.children[0]);
        this.boundary.add(this.wall.winter);
        this.scene.remove(this.oceanSummer.mesh);
        this.scene.add(this.oceanWinter.mesh);
      }
    });

    //swipe gestures
    hammertime.get("swipe").set({ direction: Hammer.DIRECTION_ALL });
    hammertime.on("swipe", function (ev) {
      if (msg.visible && ready && isTouchDevice()) msg.visible = false;
    });

    hammertime.on("swipeleft", function () {
      if (isTouchDevice() && !ignore && ready) {
        goLeft();
      }
      setIgnore();
    });
    hammertime.on("swiperight", function () {
      if (isTouchDevice() && !ignore && ready) {
        goRight();
      }
      setIgnore();
    });
    hammertime.on("swipeup", function () {
      if (isTouchDevice() && !ignore && ready) {
        goUp();
      }
      setIgnore();
    });
    hammertime.on("swipedown", function () {
      if (isTouchDevice() && !ignore && ready) {
        goDown();
      }
      setIgnore();
    });
  }

  arrowKey(event) {
    event.preventDefault();
    if (ready) {
      if (
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown"
      ) {
        msg.visible = false;
      }
      if (event.key === "ArrowLeft") {
        if (direction.x == step) return;
        if (!ignore) goLeft();
        setIgnore();
      }
      if (event.key === "ArrowRight") {
        if (direction.x == -step) return;
        if (!ignore) goRight();
        setIgnore();
      }
      if (event.key === "ArrowUp") {
        if (direction.z == step) return;
        if (!ignore) goUp();
        setIgnore();
      }
      if (event.key === "ArrowDown") {
        if (direction.z == -step) return;
        if (!ignore) goDown();
        setIgnore();
      }
    }
  }

  clickStart() {
    this.camera.controls.enableDamping = false;
    this.camera.controls.enabled = false;

    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].style.display = "none";
    }

    if (isTouchDevice() === true) {
      this.text.refreshText("Swipe!");
    } else {
      this.text.refreshText("Press arrow keys");
    }

    this.scene.add(this.seasonFood);
    ready = true;
  }

  start() {
    this.init();
    this.placeFood();
    this.placeSnake();
  }

  init() {
    // remove snake bodies
    for (let i = snake.children.length - 1; i > 0; i--) {
      snake.remove(snake.children[i]);
    }

    // initialization
    this.snakeLength = 0;
    direction.x = 0;
    direction.z = 0;
    this.billBoard.score.refreshText("00");
  }

  placeSnake() {
    //place snake rendomly
    this.snake.head.position.x =
      Math.floor(param.boardSize * Math.random()) -
      param.boardSize / 2 +
      param.size / 2;
    this.snake.head.position.z =
      Math.floor(param.boardSize * Math.random()) -
      param.boardSize / 2 +
      param.size / 2;
    if (this.snake.head.position.x < 0) {
      snake.children[0].rotation.y = Math.PI / 2; // left
    } else {
      snake.children[0].rotation.y = -Math.PI / 2; //right
    }
  }

  placeFood() {
    let foodPosX = 
    Math.floor(param.boardSize * Math.random()) -
    param.boardSize / 2 + param.size / 2;
    let foodPosZ = Math.floor(param.boardSize * Math.random()) -
    param.boardSize / 2 + param.size / 2;

    // place an food randomly where there is no snake
    while (this.samePositionAsSnake(foodPosX, foodPosZ)) {
      foodPosX =
        Math.floor(param.boardSize * Math.random()) -
        param.boardSize / 2 +
        param.size / 2;
      foodPosZ =
        Math.floor(param.boardSize * Math.random()) -
        param.boardSize / 2 +
        param.size / 2;
    }

    this.seasonFood.position.x = foodPosX;
    this.seasonFood.position.z = foodPosZ;
  }

  addBody() {
    this.snake.openMouth();
    let snakeBody = this.body.children[1].clone();
    if (this.snakeLength % 2 == 1) {
      snakeBody = this.body.children[0].clone();
    }
    snakeBody.castShadow = true;
    snakeBody.position.x = this.lastPosX.peek();
    snakeBody.position.z = this.lastPosZ.peek();
    snake.add(snakeBody);

    if (this.lastPosX.peek() == this.lastPosX.last()) {
      snakeBody.rotation.y = Math.PI / 2;
    }
  }

  gameOver() {
    this.fence.gameOver(this.snake.head.position.x, this.snake.head.position.z);
    this.wall.gameOver(this.snake.head.position.x, this.snake.head.position.z);
    this.camera.controls.enableDamping = true;
    this.camera.controls.enabled = true;
    this.audioOver.play();
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i].style.display = "inline-block";
    }
    startbtn.style.display = "none";
    msg.visible = true;
    this.text.refreshText("Try again");
    ready = false;
  }

  setAudio() {
    const listener = new THREE.AudioListener();
    this.camera.instance.add(listener);
  
    this.audioGameOver = this.resources.items.gameover;
    this.audioFoodBite = this.resources.items.bite;
    this.audioTeaGulp = this.resources.items.gulp;

    this.audioOver = new THREE.Audio(listener);
    this.audioBite = new THREE.Audio(listener);
    this.audioGulp = new THREE.Audio(listener);

    this.audioOver.setBuffer(this.audioGameOver);
    this.audioBite.setBuffer(this.audioFoodBite);
    this.audioGulp.setBuffer(this.audioTeaGulp);
  }

  samePositionAsSnake(x, z) {
    for (let i = 0; i < snake.children.length; i++) {
      if (
        x == snake.children[i].position.x &&
        z == snake.children[i].position.z
      ) {
        return true;
      }
    }
    return false;
  }
  
  update() {
    if (ready) {
      // when the snake hit the boundaries
      if (
        this.snake.head.position.x > param.boardSize / 2 ||
        this.snake.head.position.x < -param.boardSize / 2 ||
        this.snake.head.position.z > param.boardSize / 2 ||
        this.snake.head.position.z < -param.boardSize / 2
      ) {
        this.gameOver();
      }

      // when the snake intersects itself
      for (let i = 1; i < snake.children.length - 1; i++) {
        if (
          this.snake.head.position.x == snake.children[i].position.x &&
          this.snake.head.position.z == snake.children[i].position.z
        ) {
          snake.children[i].visible = false;
          this.audioBite.play();
          this.gameOver();
        }
      }

      // when the snake hits the food
      if (
        this.snake.head.position.x == this.seasonFood.position.x &&
        this.snake.head.position.z == this.seasonFood.position.z
      ) {
        this.snakeLength++;
        if (this.snakeLength < 10) {
          this.billBoard.score.refreshText("0" + this.snakeLength.toString());
        } else {
          this.billBoard.score.refreshText(this.snakeLength.toString());
        }
        if (this.seasonFood.children[0] == this.food.winter) {
          this.audioGulp.play();
        } else {
          this.audioBite.play();
        }
        this.placeFood();
        this.addBody();
      }
    }
  }
}

function goLeft() {
  snake.children[0].rotation.y = -Math.PI / 2;
  direction.x = -step;
  direction.z = 0;
}

function goRight() {
  snake.children[0].rotation.y = Math.PI / 2;
  direction.x = step;
  direction.z = 0;
}

function goUp() {
  snake.children[0].rotation.y = Math.PI;
  direction.z = -step;
  direction.x = 0;
}

function goDown() {
  snake.children[0].rotation.y = 0;
  direction.z = step;
  direction.x = 0;
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
  }, 200);
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}