const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
// Para evitar tener que recargar el juego cada vez que la pantalla cambie de tamaño, agregago un eventListener para que se haga el cálculo automático del tamaño de la pantalla y de esta manera sea más responsive.
window.addEventListener('resize', setCanvasSize);

let canvasSize;
let elementsSize;


function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)
    
    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = "end";

    for (let i = 1; i <= 10; i++) {
        for (let z = 1; z <= 10; z++) {
            game. fillText(emojis['X'], elementsSize * i, elementsSize * z);
        }
    }
}