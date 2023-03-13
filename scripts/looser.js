//let perdu = player;

const playerpos = document.querySelector('#grille div.tireur.alien');


var perdutest = document.querySelector('h4');
var img = document.createElement('img');
if (playerpos){
    perdutest.style.visibility="visible";
    perdutest.appendChild(img);
    
    
}else{
    perdutest.style.visibility="hidden";
}

