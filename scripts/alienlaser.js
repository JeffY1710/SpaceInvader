export class AlienLaser{
    constructor(){
        this.cases = document.querySelectorAll('#grille div');
        this.alienCase = null;
    };

    printLaser(){
        this.alienCase = this.cases = document.querySelectorAll('#grille div.alien');
        const randomNb = Math.floor(Math.random() * this.alienCase.length);
        const randomAlien = this.alienCase[randomNb];
        randomAlien.classList.add('alienlaser')
    }


    moveLaser(){
        const alienLaserCase = document.querySelector('div.alienLaser');
        let alienIndex = null;
        this.cases.forEach(((cases, index) =>{
            if (cases === alienLaserCase) {
                alienIndex = index
                console.log(alienIndex);
            }
        }))
    }
}

