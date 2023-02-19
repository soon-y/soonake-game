import * as THREE from 'three'
import Application from './Application/Application.js'

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', () =>{
    const application = new Application(document.querySelector('canvas.webgl'))
    const audioListener = new THREE.AudioListener();
    const sound = new THREE.Audio( audioListener );
    const loader = new THREE.AudioLoader();
    loader.load('./sound/appleBite.wav', (buffer) => {
            sound.setBuffer( buffer );
            sound.play();
        }
    )
})
