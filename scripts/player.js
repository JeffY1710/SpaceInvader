// 17 longueurs lignes
// 15 hauteur colonnes

// Player Controls

export class Player {

    constructor(grid, playerPos) {
        this.grid = grid;
        this.playerPos = playerPos
        this.playerCase = null;
        this.shootingSpeed = 100
        this.volume = 1;
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
                caseKill.classList.remove('alien', 'laser')
                caseKill.classList.add('explosion')
                let deathSound = new Audio("assets/sounds/exploalien.wav")
                deathSound.volume = this.volume
                deathSound.play()
                let gameCurrentGrid = this.grid;
                caseKill.dataset.todelete = Array.prototype.indexOf.call(gameCurrentGrid, caseKill)
            }

        }, this.shootingSpeed);
        shoot;
    }

    
}
