import { Player } from "./player.js";
import { Enemies } from "./enemies.js";
import { generateGrid, addBorder } from "./generateGrid.js";

//Create the Grid
generateGrid();
const cases = document.querySelectorAll('#grille div');
addBorder(cases);

let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const player = new Player(cases, 246);

const enemies = new Enemies(cases,aliens)

player.setPlayerShip();
enemies.printAliens();

const mainGame = setInterval(() => {

    if (enemies.verifPlayerDefeat()) {

        clearInterval(mainGame);

        var perdutest = document.querySelector('#pop-up');
        var playerloose = document.querySelector('#grille div.tireur.alien')
        var img = document.createElement('img');
        var msg = document.createElement("p");
        if (playerloose) {
            img.src = "../assets/looser.gif";
            perdutest.style.display = "block";
            perdutest.appendChild(img);
            perdutest.appendChild(msg);


        } else {
            perdutest.style.display = "none";
        }
    }
    if (enemies.verifPlayerVictory()) {
        clearInterval(mainGame);
        console.log('Victory');
    }

    enemies.enemiesMain();
    setTimeout(() => {
        enemies.verifyRight();
    }, 500);

    setTimeout(() => {
        enemies.verifyLeft();
    }, 500);
}, 500)

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

verifloose();



