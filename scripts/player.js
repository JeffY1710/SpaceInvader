// 17 longueurs lignes
// 15 hauteur colonnes

let gameCase = document.querySelectorAll('#grille div')

let playerPos = 246
let playerCase = gameCase[playerPos]
playerCase.classList.add('tireur');

const verifKill = () => {
    return (document.querySelector('#grille div.alien.laser'))
}
//Player shoot

const setLaserCase = function (pos) {

    let laserCase = gameCase[pos];
    const previousCase = gameCase[pos + 17]
    if (previousCase || pos < 0) {
        previousCase.classList.remove('laser');
    }
    if (pos < 0) {
        previousCase.classList.remove('laser');
    } else {
        laserCase.classList.add('laser');
    }


    console.log(pos);
}

const shootMoving = function () {
    let laserPosMoving = playerPos - 17
    setLaserCase(laserPosMoving)

    const shoot = setInterval(() => {
        if (laserPosMoving < 0) {
            clearInterval(shoot)
        } else {
            laserPosMoving -= 17;
            setLaserCase(laserPosMoving)
        }
        if (verifKill()) {
            const caseKill = verifKill();
            console.log(caseKill);
            clearInterval(shoot)
            caseKill.classList.remove('alien', 'laser')
            /*caseKill.classList.add('explosion');*/
            gameCase = document.querySelectorAll('#grille div');
            caseKill.dataset.todelete = Array.prototype.indexOf.call(gameCase, caseKill)
            /*setTimeout(() => {
                caseKill.classList.remove('explosion')
            }, 500);*/
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

window.addEventListener("keyup", (event) => {
    console.log(event);
    if (event.code == 'Space') {
        shootMoving();

    }

    if (event.code == 'ArrowRight') {
        if (!(playerCase.getAttribute('data') == 'right')) {
            playerPos++;
            removePlayerShip();
            setPlayerShip(playerPos)
        }

    }

    if (event.code == 'ArrowLeft') {
        if (!(playerCase.getAttribute('data') == 'left')) {
            playerPos--;
            removePlayerShip();
            setPlayerShip(playerPos)
            console.log(playerPos);
        }
    }

    if (event.code == 'ArrowUp' && (playerPos - 17 > 204)) {
        playerPos -= 17;
        removePlayerShip();
        setPlayerShip(playerPos)

    }


    if (event.code == 'ArrowDown' && (playerPos + 17 < 254)) {
        playerPos += 17;
        removePlayerShip();
        setPlayerShip(playerPos)
    }
    console.log(playerPos);
})

