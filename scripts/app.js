import { Player } from "./player.js";
import { Enemies } from "./enemies.js";
import { generateGrid, addBorder } from "./generateGrid.js";
import { setCurrentDifficulty, setCurrentPseudo, setLocalStorageScore } from "./storagescript.js";
import { generalSoundVolume, gameMusicVolume, generalEffectVolume } from "./settings.js";
import { Meteor } from "./meteorite.js";

if (localStorage.getItem('score') === null) {
    localStorage.setItem('score', "[]")
}

if (localStorage.getItem('pseudo') === null) {
    localStorage.setItem('pseudo', "")
}

if(localStorage.getItem('difficulty') === null){
    localStorage.setItem('difficulty', "")
}



const startButton = document.querySelector('#startGame')
const selectPlayerBtn = document.querySelector('#selectPlayer')
const playerSelectSection = document.querySelector('#playerSelect')
const next = document.querySelector('#next');
const difficulty = document.querySelector('#difficulty')

const selectOptionBtn = document.querySelector('#selectOption')
const optionSelectSection = document.querySelector('#options')

const selectScoreBtn = document.querySelector('#selectScore')
const scoreboardSection = document.querySelector('#scoreboard')

const selectCreditsBtn = document.querySelector('#selectCredits')
const creditsselect = document.querySelector('#credits')
const selectlogo = document.querySelector('.logo')

const homeSection = document.querySelector('#home')
const menuSection = document.querySelector('#menu')
const gameSection = document.querySelector('#game')

const backButton = document.querySelectorAll('.back')
const backMenu = document.querySelector('#backMenu');
const directRestart = document.querySelector('#directRestart');

const easyButton = document.querySelector('#easy')
const mediumButton = document.querySelector('#medium')
const hardButton = document.querySelector('#hard')

let wave = document.querySelector('#wave');
let score = document.querySelector('#score');
export let defeatSound = new Audio("assets/sounds/game-over.mp3");
export let explotireur = new Audio("assets/sounds/explotireur.wav");
export let shootsound = new Audio("assets/sounds/laser.wav");
export let gameSoundeffect = new Audio("assets/sounds/gamesound.mp3");

const pop = document.querySelector('#pop-up');
const img = document.querySelector('#imgfinal');
const msg = document.querySelector('#finalscore');

generateGrid();
let cases = document.querySelectorAll('#grille div');
addBorder(cases);
let playerLose = null;
const player = new Player(cases, 246);


gameSoundeffect.play();
gameSoundeffect.autoplay= false;
gameSoundeffect.loop= true;
let canShoot = true;

let meteorSpawnSpeed = 4000;

const killAllAlien = function () {
    document.querySelectorAll('#grille div.alien').forEach(cases => {
        cases.classList.remove("alien")
    })
}

const killAllMeteorite = function () {
    document.querySelectorAll('#grille div.meteorite').forEach(cases => {
        cases.classList.remove("meteorite")
    })
}

const killAllLaser = function (){
    document.querySelectorAll('#grille div.laser').forEach(lasers =>{
        lasers.classList.remove('laser')
    })
}

const spawnMeteorite = ()=>{
    const meteor = new Meteor();
    meteor.spawn();
    const meteorMoves = setInterval(()=>{
        if (meteor.toStop) {
            clearInterval(meteorMoves)
        }else{
            meteor.move()
        }

        if (playerLose) {
            clearInterval(meteorMoves)
        }
        
    },500)
}


const coreGameFunction = function () {
    let defil = document.querySelector('body');
    defil.style.backgroundImage="url('../assets/space-background-2.gif')"
    defil.style.animation= "background-defile 0.25s  linear 0s infinite running";
    
    let aliens = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
        17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
        34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];
    player.setPlayerShip(246);
    player.setVolume(shootsound.volume)
    const enemies = new Enemies(cases, aliens)
    
    enemies.printAliens();

    if(localStorage.getItem('difficulty') == 'medium'){
        enemies.setSpeed(500);
    } else if(localStorage.getItem('difficulty') == 'hard'){
        enemies.setSpeed(250);
    } 
    
    const meteoriteCoreFunction = setInterval(()=>{
        spawnMeteorite()
    },meteorSpawnSpeed)

    
    const mainGame = setInterval(() => {
        restart.setAttribute('id', 'restart');
        if (enemies.verifPlayerDefeat()) {
            playerLose = true
            clearInterval(meteoriteCoreFunction)
            clearInterval(mainGame);
            if (playerLose) {
                explotireur.play();
               
                setTimeout ( () => {
                    img.src = "../assets/looser.gif";
                    msg.innerText = "GAME OVER \n YOUR SCORE : " + document.querySelector("#score").innerText+"\n WAVE : "+ document.querySelector('#wave').innerText;
                    pop.style.display = "block";
                    setLocalStorageScore(score.innerText)
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
            clearInterval(meteoriteCoreFunction)
            clearInterval(mainGame);
            wave.innerText++;
            
            if (meteorSpawnSpeed - 500 > 1000) {
                meteorSpawnSpeed -= 500
            }
            restartGame();
        }

        enemies.enemiesMain();
        if (enemies.canScore) {
            score.innerText++;
        }
        enemies.canScore = false;
    }, enemies.speed);
    
    directRestart.addEventListener('click',()=>{
        document.querySelector('.tireur').classList.add('alien');
    })
    
    backMenu.addEventListener('click',()=>{
        window.location.reload();
    })
}



selectPlayerBtn.addEventListener("click", () => {
    playerSelectSection.style.display = 'flex'
    menuSection.style.display = 'none'
})

next.disabled = true;

document.querySelector("input[name='playerName']").addEventListener('input', (e)=>{
    next.disabled = e.target.value.length < 1
})

next.addEventListener('click',()=>{
    playerSelectSection.style.display = "none";
    difficulty.style.display = "block"
    setCurrentDifficulty('');
})

selectOptionBtn.addEventListener("click", () =>{
    optionSelectSection.style.display ='flex'
    menuSection.style.display = 'none'
})


selectScoreBtn.addEventListener("click", ()=>{
    scoreboardSection.style.display ='flex'
    menuSection.style.display = 'none'
})


selectCreditsBtn.addEventListener("click", ()=>{
    creditsselect.style.display ='block'
    menuSection.style.display = 'none'
    selectlogo.style.display= 'none'
    setTimeout(()=>{
        window.location.reload();
    },30000)
    
})

function deleteTogglebg(){
    const btns = document.querySelectorAll('#difficulty li')
    btns.forEach(e => {
        e.classList.remove('togglebg')
    });
}

easyButton.addEventListener('click',()=>{
    setCurrentDifficulty('easy');
    deleteTogglebg();
    easyButton.classList.add('togglebg');
})

mediumButton.addEventListener('click',()=>{
    setCurrentDifficulty('medium');
    deleteTogglebg();
    mediumButton.classList.add('togglebg')
})

hardButton.addEventListener('click',()=>{
    setCurrentDifficulty('hard');
    deleteTogglebg();
    hardButton.classList.add('togglebg')
})

function resetAll() {
    score.innerText = 0;
    wave.innerText = 1;
}

function restartGame() {
    killAllAlien();
    killAllLaser();
    killAllMeteorite();
    player.removePlayerShip()
    player.setPlayerPos(246);
    coreGameFunction();
}


restart.addEventListener("click", function () {
    gameSoundeffect.pause();
    gameSoundeffect.currentTime=0;
    gameSoundeffect.play();
    playerLose = null;
    pop.style.display = 'none';
    restartGame();
    resetAll();
})

backButton.forEach( (button) => {
    button.addEventListener("click", () => {
        menuSection.style.display = 'none'
        playerSelectSection.style.display = 'none'
        optionSelectSection.style.display = 'none'
        scoreboardSection.style.display ='none'
        menuSection.style.display = 'flex'
        })
})

startButton.addEventListener("click", () => {

    if(localStorage.getItem('difficulty') == ''){
    } else{
        gameSoundeffect.pause();
        gameSoundeffect.currentTime=0;
        gameSoundeffect.play();
        homeSection.style.display = 'none'
        gameSection.style.display = 'flex';
        gameSection.style.gap = '50px';
        
        setCurrentPseudo(document.querySelector("input[name='playerName']").value)

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

                if (event.code == 'ArrowUp' && (player.playerPos - 17 > 203)) {
                    player.playerPos -= 17;
                    player.removePlayerShip();
                    player.setPlayerShip(player.playerPos)

                }


                if (event.code == 'ArrowDown' && (player.playerPos + 17 < 255)) {
                    player.playerPos += 17;

                    player.removePlayerShip();
                    player.setPlayerShip(player.playerPos)
                }
            }

        })
    }
})



