//let perdu = player;

const playerpos = document.querySelector('#grille div.tireur.alien');

export const verifloose = function() {
    var pop = document.querySelector('#pop-up');
    var img = document.createElement('img');
    if (playerpos) {
        pop.appendChild(img);
        pop.style.display = "block";
        


    } else {
        perdutest.style.display = "none";
    }

}