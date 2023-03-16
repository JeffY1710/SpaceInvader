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


let wave = document.querySelector('#wave');
let score = document.querySelector('#score');
let defeatSound = new Audio("assets/sounds/game-over.mp3");
let explotireur = new Audio("assets/sounds/explotireur.wav");
let shootsound = new Audio("assets/sounds/laser.wav");
let gameSoundeffect = new Audio("assets/sounds/gamesound.mp3");


const pop = document.querySelector('#pop-up');
const restart = document.createElement("button");
const img = document.createElement('img');
const msg = document.createElement("p");

generateGrid();
let cases = document.querySelectorAll('#grille div');
addBorder(cases);
let playerLose = null;
const player = new Player(cases, 246);


let canShoot = true;

const killAllAlien = function () {
    document.querySelectorAll('#grille div.alien').forEach(cases => {
        cases.classList.remove("alien")
    })
}


const coreGameFunction = function () {
    // gameSoundeffect.play();    
    let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    player.setPlayerShip(246);
    const enemies = new Enemies(cases, aliens)
    enemies.printAliens();
        
    
    const mainGame = setInterval(() => {
        gameSoundeffect.play();
        restart.setAttribute('id', 'restart');
        if (enemies.verifPlayerDefeat()) {
            playerLose = true
            clearInterval(mainGame);
            if (playerLose) {
                explotireur.play();
                   
                setTimeout ( () => {
                    img.src = "../assets/looser.gif";
                    msg.innerText = "GAME OVER \n YOUR SCORE : " + document.querySelector("#score").innerHTML;
                    restart.innerText = "RESTART"
                    pop.style.display = "block";
                    pop.appendChild(img);
                    pop.append(msg); 
                    pop.append(restart);
                    gameSoundeffect.pause();
                    gameSoundeffect.currentTime = 0;
                    defeatSound.play();
                    

                },500)


            } else {
                pop.style.display = "none";

            }
        }
        if (enemies.verifPlayerVictory()) {
            clearInterval(mainGame);
            wave.innerText++;
            restartGame();
        }

        enemies.enemiesMain();
        if (enemies.canScore) {
            score.innerText++;
        }
        enemies.canScore = false;
    }, 500);
}



selectPlayerBtn.addEventListener("click", () => {
    playerSelectSection.style.visibility = 'visible'
    menuSection.style.display = 'none'
})

function resetAll() {
    score.innerText = 0;
    wave.innerText = 1;
}

function restartGame() {
    killAllAlien();
    player.removePlayerShip()
    player.setPlayerPos(246);
    coreGameFunction();
}


restart.addEventListener("click", function () {
    playerLose = null;
    pop.style.display = 'none';
    killAllAlien();
    restartGame();
    resetAll();
})


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
                    shootsound.play()
                    shootsound.pause
                    shootsound.currentTime=0;
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



