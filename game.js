const btnUp = document.getElementById('up')
const btnLeft = document.getElementById('left')
const btnRight = document.getElementById('right')
const btnDown = document.getElementById('down')
const canvas = document.getElementById('game');
const game = canvas.getContext('2d');
const spanLives = document.getElementById('lives');
const spanTime = document.getElementById('time');
const spanRecord = document.getElementById('record');
const divGameFinish = document.querySelector('.game-finish');
const btnPlayAgain = document.getElementById('play-again');

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

const firePosition = {
    x: undefined,
    y: undefined,
}

let bombsPositions = [];

window.addEventListener('load', setCanvasSize);
// Para evitar tener que recargar el juego cada vez que la pantalla cambie de tamaño, agregago un eventListener para que se haga el cálculo automático del tamaño de la pantalla y de esta manera sea más responsive.
window.addEventListener('resize', setCanvasSize);
btnPlayAgain.addEventListener('click', playAgain);

let canvasSize;
let elementsSize;
let nivel = 0;
let lives = 3;

let timeStar;
let timeInterval;
let timePlayer;

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.70;
    } else {
        canvasSize = window.innerHeight * 0.70;
    }
    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10;
    
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = "end";

    // Para renderizar los elementos de nuestros mapas debemos convertirlos en array de arrays para poder seleccionarlos a traves de los metodos de los arrays.
    const map = maps[nivel];
    if (!map) {
        gameWin();
        return;
    }

    if (!timeStar) {
        timeStar = Date.now();
        timeInterval = setInterval(showTime, 10);
    }

    // El metodo .trim elimina los espacios que hayan en el inicio y el final de nuestros string. El metodo .split solo funciona para los strings, y nos devuelve un arreglo y separa cada elemento por el argumento que le enviemos.
    const mapRow = map.trim().split('\n');
    const mapCols = mapRow.map(row => row.trim().split(''));

    showLives()

    if (localStorage.getItem('Record')) {
        spanRecord.innerHTML = '🏁' + localStorage.getItem('Record');
    } else {
        spanRecord.innerHTML = 'Se el primero en marcar un record!! 🏁';
    }

    bombsPositions = [];
    // Alternativa al ciclo for para una mejor legibilidad
    // Para que el jugador no se duplique al moverlo, hacemos un clearRect antes de mover al jugador
    game.clearRect(0, 0, canvasSize, canvasSize);
    mapCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
            const emoji = emojis[col];
            const posX = elementsSize * (colI + 1) + 7;
            const posY = elementsSize * (rowI + 1) - 7;

            if (col == "O") {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({ playerPosition });
                }
            } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if (col == 'X') {
                bombsPositions.push({
                    x: posX,
                    y: posY,
                })
            }
            game.fillText(emoji, posX, posY);
        })
    })

    movePlayer();
    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }
}


function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;
    if (giftCollision) {
        nextLevel();
        console.log('Subiste de nivel');
    }

    const bombCollision = bombsPositions.find(bomb => {
        const bombX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
        const bombY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
        return bombX && bombY;
    })

    if (bombCollision) {
        firePosition.x = Number(playerPosition.x.toFixed(3));
        firePosition.y = Number(playerPosition.y.toFixed(3));
        gameOver();
    }

    game.fillText(emojis["BOMB_COLLISION"], firePosition.x, firePosition.y);
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
    console.log( {playerPosition, firePosition} )
}

function nextLevel() {
    nivel++
    firePosition.x = undefined;
    firePosition.y = undefined;
    startGame()
}

function gameWin() {
    console.log('Terminaste el juego!!');
    clearInterval(timeInterval);
    timePlayer = Date.now() - timeStar;

    if(!localStorage.getItem('Record')) {
        localStorage.setItem('Record', timePlayer);
        spanRecord.innerHTML = '🏁' + localStorage.getItem('Record');        
    } else if (timePlayer < localStorage.getItem('Record')) {
        localStorage.setItem('Record', timePlayer);
        spanRecord.innerHTML = '🏁' + localStorage.getItem('Record');
    }

    divGameFinish.classList.remove('inactive');
}

function gameOver() {
    lives--;

    if (lives == 0) {
        nivel = 0;
        lives = 3;
        timeStar = undefined;
        firePosition.x = undefined;
        firePosition.y = undefined;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame()
    console.log(lives)
    console.log('Perdiste');
}

function showLives() {
    // const heartLives = Array(lives).fill(emojis['HEART']);
    
    // spanLives.innerHTML = '';
    // heartLives.forEach(heart => spanLives.append(heart));

    // Alternativa mas limpia
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
}

function showTime() {
    spanTime.innerHTML = (Date.now() - timeStar) / 1000;
}

function playAgain() {
    nivel = 0;
    lives = 3;
    timeStar = undefined;
    playerPosition.x = undefined;
    playerPosition.y = undefined;

    const isGameFinish = divGameFinish.classList.contains('inactive');
    if (!isGameFinish) {
        divGameFinish.classList.add('inactive');
    }

    startGame()
}


window.addEventListener('keydown', moveKeyboard);

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveUp() {
    console.log('Moverse arriba');
    if (playerPosition.y < elementsSize) {
        console.log("PARA!!");
    } else {
        playerPosition.y -= elementsSize;
        startGame()
    }
}

function moveLeft() {
    console.log('Moverse a la izquierda');
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log("PARA!!")
    } else {
        playerPosition.x -= elementsSize;
        startGame()
    }
}

function moveRight() {
    console.log('Moverse a la derecha');
    if (playerPosition.x > canvasSize) {
        console.log("PARA!!");
    } else {
        playerPosition.x += elementsSize;
        startGame()
    }
}

function moveDown() {
    console.log('Moverse abajo');
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log("PARA!!");
    } else {
        playerPosition.y += elementsSize;
        startGame()
    }
}

function moveKeyboard(event) {
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