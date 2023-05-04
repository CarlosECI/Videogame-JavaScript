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

    // Para renderizar los elementos de nuestros mapas debemos convertirlos en array de arrays para poder seleccionarlos a traves de los metodos de los arrays.
    const map = maps[0];
    // El metodo .trim elimina los espacios que hayan en el inicio y el final de nuestros string. El metodo .split solo funciona para los strings, y separa cada elemento por el argumento que le enviemos.
    const mapRow = map.trim().split('\n');
    const mapCols = mapRow.map(row => row.trim().split(''));

    console.log({ map, mapRow, mapCols })

    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            game. fillText(emojis[mapCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    }
}