import { Player } from "./player.js";
import { Enemies } from "./enemies.js";
import { generateGrid, addBorder } from "./generateGrid.js";
import { gameSound } from "./soundeffect.js";

const startButton = document.querySelector('#startGame')
const selectPlayerBtn = document.querySelector('#selectPlayer')
const playerSelectSection = document.querySelector('#playerSelect')
const homeSection = document.querySelector('#home')
const menuSection = document.querySelector('#menu')
const gameSection = document.querySelector('#game')


const pop = document.querySelector('#pop-up');
const restart = document.createElement("button");

const img = document.createElement('img');
const msg = document.createElement("p");

let canShoot = null;

const killAllAlien = function () {
    document.querySelectorAll('#grille div.alien').forEach(cases => {
        cases.classList.remove("alien")
    })
}


const coreGameFunction = function () {
    canShoot = true;
    let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

    player.setPlayerShip(246);
    const enemies = new Enemies(cases, aliens)
    enemies.printAliens();

    const mainGame = setInterval(() => {
        restart.setAttribute('id', 'restart');

        if (enemies.verifPlayerDefeat()) {
            playerLose = true
            clearInterval(mainGame);
            if (playerLose) {
                img.src = "../assets/looser.gif";
                msg.innerText = "GAME OVER";
                restart.innerText = "RESTART"
                pop.style.display = "block";
                pop.appendChild(img);
                pop.append(msg);
                pop.append(restart)

            } else {
                pop.style.display = "none";

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
    }, 500);
}


restart.addEventListener("click", function () {
    playerLose = null;
    pop.style.display = 'none';
    killAllAlien();
    player.removePlayerShip()
    player.setPlayerPos(246);
    coreGameFunction();
})

selectPlayerBtn.addEventListener("click", () => {
    playerSelectSection.style.visibility = 'visible'
    menuSection.style.display = 'none'
})



generateGrid();
let cases = document.querySelectorAll('#grille div');
addBorder(cases);
let playerLose = null;
const player = new Player(cases, 246);

startButton.addEventListener("click", () => {

    homeSection.style.display = 'none'
    gameSection.style.display = 'block';
    coreGameFunction();

    window.addEventListener("keyup", (event) => {
        if (!playerLose) {
            if (event.code == 'Space' && canShoot) {
                player.shootMoving();
                canShoot = !canShoot;
                setTimeout(() => {
                    canShoot = !canShoot
                }, 250);
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
        }

    })
})



