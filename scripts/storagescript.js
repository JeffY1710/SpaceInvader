export function setCurrentPseudo(pseudo) {
    localStorage.setItem('pseudo', pseudo)
}

export function setCurrentDifficulty(difficulty) {
    localStorage.setItem('difficulty', difficulty)
}

function getCurrentPseudo(){
    return localStorage.getItem('pseudo')
}

function getCurrentDifficulty(){
    return localStorage.getItem('difficulty')
}

export function setLocalStorageScore(userScore) {
    const currentScores = localStorage.getItem('score') || '[]'
    const convertedCurrentScores = JSON.parse(currentScores)
    let score = {
        pseudo: getCurrentPseudo(),
        score: userScore,
        difficulty : localStorage.getItem('difficulty')
    }
    convertedCurrentScores.push(score);
    localStorage.setItem('score', JSON.stringify(convertedCurrentScores));
}


