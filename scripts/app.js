const gameGrid = document.querySelector('#grille');

const generateGrid = function (){
    for (let index = 0; index < 255; index++) {
       const gameCase = document.createElement('div');
       gameGrid.appendChild(gameCase);
    }
}

generateGrid();

const cases = document.querySelectorAll('#grille div');

function addBorder(){
    let i = 0;
    let indexLeft = 0;
    let indexRight = 16;

    cases.forEach(e => {
        if(cases[i] == cases[indexLeft]){
            e.setAttribute('data','left');
            indexLeft += 17;
        }
        if(cases[i] == cases[indexRight]){
            e.setAttribute('data','right');
            indexRight += 17;
        }
        i++;
    });
}

addBorder();
