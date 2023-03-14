import { Player } from "./player.js";
import { Enemies } from "./enemies.js";
import { generateGrid, addBorder } from "./generateGrid.js";
import { gameSound } from "./soundeffect.js";

const startButton = document.querySelector('#startGame')

generateGrid();
const cases = document.querySelectorAll('#grille div');

var pop = document.querySelector('#pop-up');
addBorder(cases);



let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
    17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

const player = new Player(cases, 246);
var restart = document.createElement("button");
const enemies = new Enemies(cases, aliens)

player.setPlayerShip();
enemies.printAliens();


startButton.addEventListener('click', ()=>{
    const mainGameAudioi = new Audio('/assets/sounds/gamesound.mp3')
    mainGameAudioi.play();
})


const mainGame = setInterval(() => {
    
    var playerloose = document.querySelector('#grille div.tireur.alien')
    var img = document.createElement('img');
    var msg = document.createElement("p");
    restart.setAttribute('id','restart');
    console.log(restart);

    if (enemies.verifPlayerDefeat()) {

        clearInterval(mainGame);
        if (playerloose) {
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
}, 500)

let canShoot = true;
window.addEventListener("keyup", (event) => {
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
})


restart.addEventListener("click", function(){
    pop.style.display= 'none';
     
    
})




