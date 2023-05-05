const btnUp = document.getElementById('up')
const btnLeft = document.getElementById('left')
const btnRight = document.getElementById('right')
const btnDown = document.getElementById('down')
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');

window.addEventListener('load', setCanvasSize);
// Para evitar tener que recargar el juego cada vez que la pantalla cambie de tamaño, agregago un eventListener para que se haga el cálculo automático del tamaño de la pantalla y de esta manera sea más responsive.
window.addEventListener('resize', setCanvasSize);
window.addEventListener('keydown', moveKeyboard)

btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

function moveUp() {
    console.log('Moverse arriba');
}

function moveLeft() {
    console.log('Moverse a la izquierda');
}

function moveRight() {
    console.log('Moverse a la derecha');
}

function moveDown() {
    console.log('Moverse abajo');
}

function moveKeyboard (event) {
    switch (event.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "ArrowDown":
            moveDown();
            break;
    }
}

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
    // El metodo .trim elimina los espacios que hayan en el inicio y el final de nuestros string. El metodo .split solo funciona para los strings, y nos devuelve un arreglo y separa cada elemento por el argumento que le enviemos.
    const mapRow = map.trim().split('\n');
    const mapCols = mapRow.map(row => row.trim().split(''));

    // Alternativa al ciclo for para una mejor legibilidad
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 7;
            const posY = elementsSize * (rowI + 1) - 7;
            game.fillText(emoji, posX, posY);
        })
    })

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }
}