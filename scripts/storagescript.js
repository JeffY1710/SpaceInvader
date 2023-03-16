let scoreStorage = []
let scoreInput = {
    name: getCurrentPseudo(),
    score: 1000
}

export function setCurrentPseudo(pseudo) {
    localStorage.setItem('pseudo', pseudo)
}

function getCurrentPseudo(){
    return localStorage.getItem('pseudo')
}
export function setLocalStorageScore(userScore) {
    const currentScores = localStorage.getItem('score') || '[]'
    const convertedCurrentScores = JSON.parse(currentScores)
    let score = {
        pseudo: getCurrentPseudo(),
        score: userScore,
    }
    convertedCurrentScores.push(score);
    localStorage.setItem('score', JSON.stringify(convertedCurrentScores));
}

