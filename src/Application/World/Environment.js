import * as THREE from 'three'
import Application from '../Application'

export default class Environment {
    constructor() {
        this.application = new Application()
        this.scene = this.application.scene
        this.resources = this.application.resources

        this.setLight()
        this.setEnvironmentMap()
        this.setSkybox()
    }

    setLight() {
        this.light = new THREE.DirectionalLight(0xffffff)
        this.light.castShadow = true
        this.light.shadow.intensity = 0
        this.light.shadow.camera.bottom = -10
        this.light.shadow.camera.top = 20
        this.light.shadow.camera.left = -10
        this.light.shadow.camera.right = 10
        this.light.shadow.camera.near = 10
        this.light.shadow.camera.far = 50
        this.light.position.set(6, 10, 6)

        this.scene.add(this.light)
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture2
        this.environmentMap.texture.mapping = THREE.EquirectangularReflectionMapping
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
    }

    setSkybox() {
        this.scene.background = this.environmentMap.texture
    }
}