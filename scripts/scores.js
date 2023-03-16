import { getLocalStorageScore } from "./storagescript.js";

const scoreBoard = document.querySelector('.score__table ul');

let allScore = getLocalStorageScore().sort((a,b) => {
    return b.score - a.score
});

allScore.forEach(score => {
    let element = `<li> <span>${score.score}</span> <span>${score.pseudo}</span> <span>${score.difficulty}</span> </li>`

    scoreBoard.insertAdjacentHTML('beforeend',element)
});
