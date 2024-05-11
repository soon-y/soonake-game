import * as THREE from "three";
import Application from "../Application";
import EventEmitter from "./EventEmitter";

export default class Audio extends EventEmitter {
  constructor(mute = false) {
    super();
    this.application = new Application();
    this.resources = this.application.resources;
    this.camera = this.application.camera;
    this.set = false;
    this.toLoad = sources.length;
    this.loaded = 0;
    this.items = {};

    this.on("ready", () => {
      if (this.loaded === this.toLoad) {
        this.audioGameOver = this.items.gameover;
        this.audioFoodBite = this.items.bite;
        this.audioTeaGulp = this.items.gulp;

        this.over = new THREE.Audio(this.listener);
        this.bite = new THREE.Audio(this.listener);
        this.gulp = new THREE.Audio(this.listener);

        this.over.setBuffer(this.audioGameOver);
        this.bite.setBuffer(this.audioFoodBite);
        this.gulp.setBuffer(this.audioTeaGulp);
        this.set = true;

        if (mute) this.mute();
      }
    });

    this.loadingManager = new THREE.LoadingManager();
    this.setAudio();
  }

  setAudio() {
    this.loader = new THREE.AudioLoader(this.loadingManager);
    this.listener = new THREE.AudioListener();
    this.camera.instance.add(this.listener);

    for (const source of sources) {
      this.loader.load(source.path, (file) => {
        this.sourceLoaded(source, file);
      });
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }

  mute() {
    this.gulp.setVolume(0);
    this.bite.setVolume(0);
    this.over.setVolume(0);
  }

  soundOn() {
    this.gulp.setVolume(1);
    this.bite.setVolume(1);
    this.over.setVolume(1);
  }
}

const sources = [
  {
    name: "gameover",
    path: "./sound/gameOver.wav",
  },
  {
    name: "bite",
    path: "./sound/appleBite.wav",
  },
  {
    name: "gulp",
    path: "/sound/gulp.mp3",
  },
];
