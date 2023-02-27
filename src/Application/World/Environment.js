import * as THREE from 'three'
import Application from '../Application'

export default class Environment {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources
        this.debug = this.application.debug

        //Debug
        this.debugFolder1 = this.debug.gui.addFolder('Environment')
        this.debugFolder = this.debug.gui.addFolder('SunLight')
        this.debugFolder1.close()
        this.debugFolder.close()

        this.setLight()
        this.setEnvironmentMap()
        this.setSkybox()
    }

    setLight() {
        this.light = new THREE.DirectionalLight(0xffffff)
        this.light.castShadow = true
        this.light.shadow.intensity = 0
        this.light.shadow.camera.bottom = -40
        this.light.shadow.camera.top = 40
        this.light.shadow.camera.left = -40
        this.light.shadow.camera.right = 40
        this.light.shadow.camera.near = 10
        this.light.shadow.camera.far = 40
        this.light.position.set(-10, 20, -5)
        this.helper = new THREE.CameraHelper(this.light.shadow.camera)
        this.helper.visible = false
        this.scene.add(this.light, this.helper)

        // Debug
        this.debugFolder
            .add(this.light.position, 'x')
            .min(-20).max(20).step(0.001)
            .name('x-position')

            this.debugFolder
            .add(this.light.position, 'y')
            .min(1).max(20).step(0.001)
            .name('y-position')

            this.debugFolder
            .add(this.light.position, 'z')
            .min(-20).max(20).step(0.001)
            .name('z-position')

        this.debugFolder
            .add(this.light, 'intensity')
            .min(0).max(10).step(0.001)

        this.debugFolder
            .addColor(this.light, 'color')

        this.debugFolder
            .add(this.helper, 'visible')
            .name('LightHelper')
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        this.debugFolder1
        .add(this.environmentMap, 'intensity')
        .name('Intensity').min(0).max(4).step(0.001)
        .onChange(this.environmentMap.updateMaterials)
    }

    setSkybox() {
        this.scene.background = this.environmentMap.texture
    }
}