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

const backMenu = document.querySelector('#backMenu');
const directRestart = document.querySelector('#directRestart');

let wave = document.querySelector('#wave');
let score = document.querySelector('#score');

const pop = document.querySelector('#pop-up');
const restart = document.createElement("button");
const soundgameover = document.createElement("audio");
const soundgame = document.querySelector("#mainGameSound");
const src = document.createElement("source")

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

const killAllLaser = function (){
    document.querySelectorAll('#grille div.laser').forEach(lasers =>{
        lasers.classList.remove('laser')
    })
}


const coreGameFunction = function () {

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
                let deathplayer=document.querySelector('#grille div.alien.tireur')
                if(deathplayer){
                    deathplayer.classList.remove('alien');
                    deathplayer.classList.remove('tireur');
                    deathplayer.classList.add('explosion');
                }
                else{
                    deathplayer =  document.querySelector('#grille div.tireur')
                    deathplayer.classList.remove('tireur');
                    deathplayer.classList.add('explosion');
                }
                let deathplayerSound = new Audio("assets/sounds/exploalien.wav");
                deathplayerSound.play();
                
                setTimeout ( () => {
                    img.src = "../assets/looser.gif";
                    src.src = "../assets/sounds/game-over.mp3";
                    src.type = "audio/mp3";
                    soundgameover.append(src);
                    soundgameover.type = "audio/mp3";
                    msg.innerText = "GAME OVER \n YOUR SCORE : " + document.querySelector("#score").innerHTML;
                    restart.innerText = "RESTART"
                    pop.style.display = "block";
                    pop.appendChild(img);
                    pop.append(msg); 
                    pop.append(restart);
                    pop.append(soundgameover);
                    soundgame.pause();
                    soundgame.currentTime = 0;
                    soundgameover.play();

                },500)


            } else {
                pop.style.display = "none";

            }
        }
        if (enemies.verifPlayerVictory()) {
            clearInterval(mainGame);
            wave.innerText++;
            player.shootingSpeed+=50;
            restartGame();
        }

        enemies.enemiesMain();
        if (enemies.canScore) {
            score.innerText++;
        }
        enemies.canScore = false;
    }, 500);
    
    directRestart.addEventListener('click',()=>{
        // playerLose = null;
        // clearInterval(mainGame);
        // restartGame();
        // resetAll();
        // soundgame.play();
    })
    
    backMenu.addEventListener('click',()=>{
        // clearInterval(mainGame);
        // playerSelectSection.style.visibility = 'collapse'
        // menuSection.style.display = 'flex'
        // homeSection.style.display = 'block'
        // gameSection.style.display = 'none';
    })
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
    killAllLaser();
    player.removePlayerShip()
    player.setPlayerPos(246);
    coreGameFunction();
}


restart.addEventListener("click", function () {
    playerLose = null;
    pop.style.display = 'none';
    restartGame();
    resetAll();
    soundgame.play();
})

startButton.addEventListener("click", () => {

    homeSection.style.display = 'none'
    gameSection.style.display = 'flex';
    gameSection.style.gap = '50px';
    

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



