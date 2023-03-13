const gameGrid = document.querySelector('#grille');

const generateGrid = function (){
    for (let index = 0; index < 255; index++) {
       const gameCase = document.createElement('div');
       gameGrid.appendChild(gameCase);
        
    }
}
generateGrid();

const gamecase = document.querySelectorAll('#grille div');
let player = gamecase[246];
let alien = gamecase[246];
let perdu = player;


player.classList.add('tireur');
alien.classList.add('alien');

const playerpos = document.querySelector('#grille div.tireur.alien');




var perdutest = document.querySelector('h4');
var img = document.createElement('img');
if (playerpos){
    perdutest.style.visibility="visible";
    perdutest.appendChild(img);
    
    
}else{
    perdutest.style.visibility="hidden";
}


