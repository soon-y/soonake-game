import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { gsap } from "gsap";
import Loading from "../Loading";
import EventEmitter from "./EventEmitter";

const loadingBar = document.querySelector(".loading-bar");
const snake = document.querySelector(".loading-snake");
const btn = document.querySelectorAll(".btn");
const loadingPage = document.querySelector(".loading-page");

export default class Resources extends EventEmitter {
  constructor(sources) {
    super();

    //Options
    this.sources = sources;

    //Setup
    this.loading = new Loading();
    this.loadingManager = new THREE.LoadingManager(
      //Loaded
      () => {
        window.setTimeout(() => {
          gsap.to(this.loading.material.uniforms.uAlpha, {
            duration: 3,
            value: 0,
          });
          loadingBar.classList.add("ended");
          loadingBar.style.transform = `translate(100%, -50%)`;
          snake.classList.add("ended");
          snake.style.transform = `translate(100%, -50%)`;
        }, 1000);

        window.setTimeout(() => {
          for (let i = 0; i < btn.length; i++) {
            btn[i].style.display = "inline-block";
            btn[i].style.opacity = "1";
            btn[i].style.transitionDuration = "2s";
          }
        }, 2000);

        window.setTimeout(() => {
          loadingPage.style.display = "none";
          for (let i = 0; i < btn.length; i++) {
            btn[i].style.display = "inline-block";
            btn[i].style.opacity = "1";
            btn[i].style.transitionDuration = "0s";
          }
        }, 5000);
      },

      //progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        loadingBar.style.display = "block";
        this.loading.overlay.visible = true;
        const progress = 100 - (itemsLoaded / itemsTotal) * 100;
        loadingBar.style.transform = `translate(${progress}%, -50%)`;
      }
    );

    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoaders();
    this.startLoading();
  }

  setLoaders() {
    this.loaders = {};
    this.loaders.ttfLoader = new TTFLoader(this.loadingManager);
    this.loaders.objLoader = new OBJLoader(this.loadingManager);
    this.loaders.gltfLoader = new GLTFLoader(this.loadingManager);
    this.loaders.textureLoader = new THREE.TextureLoader(this.loadingManager);
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader(
      this.loadingManager
    );
    this.dracoLoader = new DRACOLoader(this.loadingManager);
    this.dracoLoader.setDecoderPath("/draco/");
    this.loaders.gltfLoader.setDRACOLoader(this.dracoLoader);
  }

  startLoading() {
    for (const source of this.sources) {
      if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "ttf") {
        this.loaders.ttfLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      } else if (source.type === "objModel") {
        this.loaders.objLoader.load(source.path, (file) => {
          this.sourceLoaded(source, file);
        });
      }
    }
  }

  sourceLoaded(source, file) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
