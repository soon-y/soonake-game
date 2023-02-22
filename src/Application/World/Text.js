import * as THREE from 'three'
import Application from '../Application'
import { param } from '../param'
import { Font } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

let instance = null

export default class Text {
    constructor() {
        //Singleton
        if (instance) {
            return instance
        }
        instance = this

        this.application = new Application()
        this.resources = this.application.resources
        this.resource = this.resources.items.kenpixel
        this.font = new Font(this.resource)
        this.score = new THREE.Group()
        this.msg = new THREE.Group()
    }

    refreshText(num) {
        this.score.remove(this.textMesh);
        this.createText(num);
        this.score.add(this.textMesh)
    }

    getMsg(num){
        this.createText(num)
        this.msg.add(this.textMesh)
        this.msg.rotation.x = -Math.PI / 2
        this.msg.position.z = param.boardSize / 2 + param.size * 2
    }

    createText(num) {
        let textGeo = new TextGeometry(num.toString(), {
            font: this.font,
            size: param.size,
            height: param.size / 40
        });
    
        textGeo.computeBoundingBox();
        textGeo.computeVertexNormals();
    
        const centerOffset = - 0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);
    
        this.textMesh = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial({ color: '#ffffff' }));
        this.textMesh.position.x = centerOffset;
        this.textMesh.rotation.y = Math.PI * 2;
    }
}