const allCases = document.querySelectorAll('#grille div');
const ArrayCases = Array.from(allCases)

const ligne1 = ArrayCases.slice(0,11);
const ligne2 = ArrayCases.slice(17,28);
const ligne3 = ArrayCases.slice(34,45);

function createAliens(){
    for (let index = 0; index < 12; index++) {
        ligne1[index].classList.add('alien');
        ligne2[index].classList.add('alien');
        ligne3[index].classList.add('alien');   
    }
}

createAliens();




