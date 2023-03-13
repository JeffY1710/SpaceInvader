const gameGrid = document.querySelector('#grille');

const generateGrid = function () {
    for (let index = 0; index < 255; index++) {
        const gameCase = document.createElement('div');
        gameGrid.appendChild(gameCase);

    }
}

generateGrid();

// 17 longueurs lignes
// 15 hauteur colonnes

const gameCase = document.querySelectorAll('#grille div')

let playerPos = 246
let playerCase = gameCase[playerPos]
playerCase.classList.add('tireur');

//Player shoot

const setLaserCase= function (pos) {

    let laserCase = gameCase[pos];
    const previousCase = gameCase[pos +17]
    if (previousCase || pos < 0) {
        previousCase.classList.remove('laser');
    }
    if (pos < 0) {
        previousCase.classList.remove('laser');
    }else{
        laserCase.classList.add('laser');
    }

    
    console.log(pos);
}

const shootMoving = function(){
    let laserPosMoving = playerPos-17
    setLaserCase(laserPosMoving)

    const shoot = setInterval(() => {
        if (laserPosMoving < 0) {
            clearInterval(shoot)
        }else{
            laserPosMoving -= 17;
            setLaserCase(laserPosMoving)
        }
        
    }, 100);

    shoot;
}


//Player deplacements

const setPlayerShip = function (pos) {
    playerCase = gameCase[pos]
    playerCase.classList.add('tireur');
}

const removePlayerShip = function () {
    playerCase.classList.remove('tireur')
}

setPlayerShip(246)


// Player Controls
window.addEventListener("keydown", (event) => {
    if (event.code == 'Space') {
        shootMoving();
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

