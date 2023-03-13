const allCases = document.querySelectorAll('#grille div');
let aliens = [0,1,2,3,4,5,6,7,8,9,10,11,
                17,18,19,20,21,22,23,24,25,26,27,28,
                34,35,36,37,38,39,40,41,42,43,44,45];
let dataRight = document.querySelectorAll("div[data='right']");
let dataLeft = document.querySelectorAll("div[data='left']");

let direction = 1;

function printAliens(){
    aliens.forEach(e => {
        allCases[e].classList.add('alien');
    });
}

function deleteAliens(){
    aliens.forEach(e => {
        allCases[e].classList.remove('alien');
    });
}

function verifyRight(){  
    dataRight.forEach(e => {
        if(e.classList.contains('alien')){
            deleteAliens();
            move(17);
            direction = -1;
        }
    });
    printAliens();
}

function verifyLeft(){  
    dataLeft.forEach(e => {
        if(e.classList.contains('alien')){
            deleteAliens();
            move(17);
            direction = 1;
        }
    });
    printAliens();
}

function move(direction){
    let index = 0;
        aliens.forEach(e => {
            aliens[index] += direction;
            index++;
        });
}

function verifKilled() {
    const casesToKill = document.querySelectorAll("div[data-todelete]");

    casesToKill.forEach( (cases) => {
        aliens = aliens.filter( id => id != cases.dataset.todelete)
        cases.removeAttribute('data-todelete');
        cases.classList.remove('alien', 'explosion', 'laser')
        console.log(cases.dataset.todelete)
    })
}

function main(){
    verifKilled();
    deleteAliens();
    move(direction);
    printAliens();
    setTimeout(() => {
        verifyRight();
    }, 500);
    setTimeout(() => {
        verifyLeft();
    }, 500);
}

printAliens();
    setInterval(()=>{
    main();
},500)
