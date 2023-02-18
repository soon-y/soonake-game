import Application from './Application/Application.js'

const startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', () =>{
    const application = new Application(document.querySelector('canvas.webgl'))
} );
