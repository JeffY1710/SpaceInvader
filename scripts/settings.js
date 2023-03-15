import { soundgame } from "./app.js"

const generalSound = document.querySelector('#general-game-sound')
const gameMusic = document.querySelector('#game-music-sound')
const generalEffect = document.querySelector('#general-effect-sound')


export let generalSoundVolume = generalSound.value /10
export let gameMusicVolume = gameMusic.value /10
export let generalEffectVolume = generalEffect.value /10

generalSound.addEventListener("change", ()=>{
    gameMusic.value = generalSound.value
    soundgame.volume = gameMusic.value /10


    generalEffect.value = generalSound.value
    generalEffectVolume = generalEffect.value /10

    generalSoundVolume = generalSound.value /10
    
})

gameMusic.addEventListener("input", ()=>{
    soundgame.volume =  gameMusic.value /10
})

generalEffect.addEventListener("input", ()=>{
    //soundgame.volume =  gameMusic.value /10
    generalEffectVolume = generalEffect.value /10
})
