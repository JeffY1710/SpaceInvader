export class Enemies{
    constructor(grid,aliens){
        this.grid = grid;
        this.aliens = aliens;
        this.direction = 1;
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
        const score = document.querySelector('#score');
    
        casesToKill.forEach( (cases) => {
            this.aliens = this.aliens.filter( id => id != cases.dataset.todelete)
            cases.removeAttribute('data-todelete');
            cases.classList.remove('alien', 'explosion', 'laser')
            score.innerHTML++;
        })
    }

    verifPlayerDefeat() {
        const playerAlien = document.querySelectorAll('div.alien.tireur');
        const alienVictoryLine = document.querySelectorAll("div[data-line='alienvictory'].alien")
        if(playerAlien.length > 0 || alienVictoryLine.length > 0){
            return true;
        };
        console.log(alienVictoryLine);
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
    }
}