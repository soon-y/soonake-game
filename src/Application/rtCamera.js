import * as THREE from 'three'
import { param } from './param'

export default class rtCamera
{
    constructor(){
        this.setInstance()
        this.rt = new THREE.WebGLRenderTarget(param.rtWidth, param.rtHeight)
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(
            45,
            param.rtWidth / param.rtHeight,
            0.1,
            5000
        )
    }
}