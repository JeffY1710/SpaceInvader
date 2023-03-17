export class Meteor {
    constructor() {
        this.speed = 500;
        this.pos = null;
        this.cases = document.querySelectorAll('#grille div');
        this.toStop = false;
    }

    spawn() {
        //En bas à gauche 238, 221, 204
        const caseChoice = Math.floor(Math.random() * 3);
        switch (caseChoice) {
            case 0:
                this.pos = 238
                this.cases[this.pos].classList.add("meteorite")
                break;
            case 1:
                this.pos = 221
                this.cases[this.pos].classList.add("meteorite")
                break;
            case 2:
                this.pos = 204
                this.cases[this.pos].classList.add("meteorite")
                break;
            default:
                this.pos = 238
                this.cases[this.pos].classList.add("meteorite")
                break;
        }
    }

    move() {

        if (this.cases[this.pos].getAttribute("data") == 'right') {
            this.toStop = true;
            this.cases[this.pos].classList.remove('meteorite')
        }else{
            this.cases[this.pos].classList.remove('meteorite')
            this.pos++;
            this.cases[this.pos].classList.add("meteorite")
        }
        
    }
}