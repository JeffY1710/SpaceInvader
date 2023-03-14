const gameGrid = document.querySelector('#grille');


export function generateGrid (){
    for (let index = 0; index < 255; index++) {
       const gameCase = document.createElement('div');
       gameGrid.appendChild(gameCase);
    }
}


export function addBorder (divs){
    let i = 0;
    let indexLeft = 0;
    let indexRight = 16;

    divs.forEach(e => {
        if(divs[i] == divs[indexLeft]){
            e.setAttribute('data','left');
            indexLeft += 17;
        }
        if(divs[i] == divs[indexRight]){
            e.setAttribute('data','right');
            indexRight += 17;
        }
        if ( i > 237 ) {
            e.setAttribute('data-line','alienvictory')
        }
        i++;
    });
}