// 17 longueurs lignes
// 15 hauteur colonnes

// Player Controls
import { wave, waveboss } from "./app.js";
export class Player {

    constructor(grid, playerPos) {
        this.grid = grid;
        this.playerPos = playerPos
        this.playerCase = null;
        this.shootingSpeed = 100
        this.volume = 1;
        this.healthBoss = 30;
    }

    setVolume(vol){
        this.volume = vol;
    }

    setPlayerPos(newPos){
        this.playerPos = newPos
    }
    setPlayerShip(pos = this.playerPos) {
        this.playerCase = this.grid[pos]
        this.playerCase.classList.add('tireur');
    }

    removePlayerShip() {
        this.playerCase.classList.remove('tireur')
    }

    verifKill(){
        return (document.querySelector('#grille div.alien.laser'))
    }

    setLaserCase(laserPos) {
        let laserCase = this.grid[laserPos];
        const previousCase = this.grid[laserPos + 17]
        if (previousCase || laserPos < 0) {
            previousCase.classList.remove('laser');
        }
        if (laserPos < 0) {
            previousCase.classList.remove('laser');
        } else {
            laserCase.classList.add('laser');
        }
        setTimeout(() => {
            laserCase.classList.remove('laser');
        }, 1000);
    }

    shootMoving() {
        let laserPosMoving = this.playerPos - 17
        let kilcase = document.querySelectorAll("#grille div.alien")

        this.setLaserCase(laserPosMoving)

        const shoot = setInterval(() => {
            if (laserPosMoving < 0) {
                clearInterval(shoot)
            } else {
                laserPosMoving -= 17;
                this.setLaserCase(laserPosMoving)
            }

            if (this.verifKill()) {
                let caseKill = this.verifKill();
                clearInterval(shoot)
                
                let deathSound = new Audio("assets/sounds/exploalien.wav")
                
                
                if(wave.innerText == waveboss){
                    // caseKill.classList.remove('laser')
                    this.healthBoss--
                    
                    console.log(kilcase);
                    if(this.healthBoss <= 0){
                        kilcase.classList.remove('alien')
                        deathSound.play()
                        kilcase.classList.add('explosion')
                    }
                    console.log(this.healthBoss);
                }if(wave.innerText != waveboss){
                    deathSound.play()
                    caseKill.classList.remove('alien', 'laser')
                    caseKill.classList.add('explosion')
                }
                deathSound.volume = this.volume
                
                let gameCurrentGrid = this.grid;
                caseKill.dataset.todelete = Array.prototype.indexOf.call(gameCurrentGrid, caseKill)
            }

        }, this.shootingSpeed);
        shoot;
    }

    
}
