export class Enemies{
    constructor(grid,aliens){
        this.grid = grid;
        this.aliens = aliens;
        this.direction = 1;
        this.canScore = false;
        this.speed = 1000;
    }

    setSpeed(speed){
        this.speed = speed;
    }

    printAliens(){
        this.aliens.forEach(e => {
            this.grid[e].classList.add('alien');
        });
    }
    
     
    deleteAliens(){
        this.aliens.forEach(e => {
            this.grid[e].classList.remove('alien');
        });
    }

    verifyRight(){
        let dataRight = document.querySelectorAll("div[data='right']");  
        dataRight.forEach(e => {
            if(e.classList.contains('alien')){
                this.deleteAliens();
                this.move(17);
                this.direction = -1;
            }
        });
        this.printAliens();
    }

    verifyLeft(){  
        let dataLeft = document.querySelectorAll("div[data='left']");
        dataLeft.forEach(e => {
            if(e.classList.contains('alien')){
                this.deleteAliens();
                this.move(17);
                this.direction = 1;
            }
        });
       this.printAliens();
    }

    move(direction){
        let index = 0;
            this.aliens.forEach(e => {
                this.aliens[index] += direction;
                index++;
            });
    }


    confirmKill() {
        const casesToKill = document.querySelectorAll("div[data-todelete]");
        casesToKill.forEach( (cases) => {
            this.aliens = this.aliens.filter( id => id != cases.dataset.todelete)
            cases.removeAttribute('data-todelete');
            cases.classList.remove('alien', 'explosion', 'laser')
            this.canScore = true;
        })
    }

    verifPlayerDefeat() {
        const playerAlien = document.querySelectorAll('div.alien.tireur');
        const playerMeteorite = document.querySelectorAll('div.meteorite.tireur');
        const alienVictoryLine = document.querySelectorAll("div[data-line='alienvictory'].alien")
        if(playerAlien.length > 0 || alienVictoryLine.length > 0 || playerMeteorite.length > 0){
            return true;
        };
    }
    
    verifPlayerVictory() {
        const playerVictory = document.querySelectorAll('div.alien');
        if(!(playerVictory.length > 0)){
            return true;
        };
    }

    enemiesMain(){
        this.confirmKill();
        this.deleteAliens();
        this.move(this.direction);
        this.printAliens();
        setTimeout(() => {
            this.verifyRight();
            this.verifyLeft();
        }, this.speed);
    }
}