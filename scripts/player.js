// 17 longueurs lignes
// 15 hauteur colonnes

// Player Controls

export class Player {

    constructor(grid, playerPos) {
        this.grid = grid;
        this.playerPos = playerPos
        this.playerCase = null;
    }

    setPlayerShip() {
        this.playerCase = this.grid[this.playerPos]
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
                console.log(laserPosMoving);
            }

            if (this.verifKill()) {
                const caseKill = this.verifKill();
                clearInterval(shoot)
                caseKill.classList.remove('alien', 'laser')
                caseKill.classList.add('explosion')
                let gameCurrentGrid = this.grid;
                caseKill.dataset.todelete = Array.prototype.indexOf.call(gameCurrentGrid, caseKill)
            }

        }, 100);
        shoot;
    }

    
}
