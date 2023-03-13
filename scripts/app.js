const gameGrid = document.querySelector('#grille');

const generateGrid = function (){
    for (let index = 0; index < 255; index++) {
        
       const gameCase = document.createElement('div');
       gameGrid.appendChild(gameCase);
        
    }
}

generateGrid();