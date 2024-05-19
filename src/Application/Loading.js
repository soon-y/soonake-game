import * as THREE from 'three'
import Application from "./Application"

export default class Loading {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    }

    setMaterial() {
        this.material = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 }
            },
            vertexShader: `
                void main(){
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main(){
                    gl_FragColor = vec4(0.636, 0.726, 0.495, uAlpha);
                }
            `
        })
    }

    setMesh() {
        this.overlay = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.overlay)
        this.overlay.visible = false
    }
}