import { Player } from "./player.js";

const gameGrid = document.querySelector('#grille');
const generateGrid = function (){
    for (let index = 0; index < 255; index++) {
        
       const gameCase = document.createElement('div');
       gameGrid.appendChild(gameCase);
    }
}

generateGrid();

const cases = document.querySelectorAll('#grille div');

function addBorder(){
    let i = 0;
    let indexLeft = 0;
    let indexRight = 16;

    cases.forEach(e => {
        if(cases[i] == cases[indexLeft]){
            e.setAttribute('data','left');
            indexLeft += 17;
        }
        if(cases[i] == cases[indexRight]){
            e.setAttribute('data','right');
            indexRight += 17;
        }
        if ( i > 237 ) {
            e.setAttribute('data-line','alienvictory')
        }
        i++;
    });
}

addBorder();

const player = new Player(cases, 246);

cases[15].classList.add("alien")

player.setPlayerShip();

window.addEventListener("keyup", (event) => {
    if (event.code == 'Space') {
        player.shootMoving();
    }

    if (event.code == 'ArrowRight') {
        if (!(player.playerCase.getAttribute('data') == 'right')) {
            player.playerPos++;
            player.removePlayerShip();
            player.setPlayerShip(player.playerPos)
        }

    }

    if (event.code == 'ArrowLeft') {
        if (!(player.playerCase.getAttribute('data') == 'left')) {
            player.playerPos--;
            player.removePlayerShip();
            player.setPlayerShip(player.playerPos)
        }
    }

    if (event.code == 'ArrowUp' && (player.playerPos - 17 > 204)) {
        player.playerPos -= 17;
        player.removePlayerShip();
        player.setPlayerShip(player.playerPos)

    }


    if (event.code == 'ArrowDown' && (player.playerPos + 17 < 254)) {
        player.playerPos += 17;
        player.removePlayerShip();
        player.setPlayerShip(player.playerPos)
    }
})
