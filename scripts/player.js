const gameGrid = document.querySelector('#grille');

const generateGrid = function () {
    for (let index = 0; index < 255; index++) {
        const gameCase = document.createElement('div');
        gameGrid.appendChild(gameCase);

    }
}

generateGrid();

const gameCase = document.querySelectorAll('#grille div')

let playerPos = 246
let playerCase = gameCase[playerPos]
playerCase.classList.add('tireur');


const setPlayerShip = function (pos) {
    playerCase = gameCase[pos]
    playerCase.classList.add('tireur');
}

const removePlayerShip = function () {
    playerCase.classList.remove('tireur')
}


// 17 longueurs lignes
// 15 hauteur colonnes

window.addEventListener("keydown", (event) => {
    console.log(event);
    if (event.code == 'Space') {

    }

    if (event.code == 'ArrowRight') {
        if (playerPos + 1 != 255) {
            playerPos++;
            removePlayerShip();
            setPlayerShip(playerPos)
        }

    }

    if (event.code == 'ArrowLeft') {
        if (playerPos - 1 != 237) {
            playerPos--;
            removePlayerShip();
            setPlayerShip(playerPos)
            console.log(playerPos);
        }
    }
})

