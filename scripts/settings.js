import { gameSoundeffect, defeatSound, shootsound,explotireur } from "./app.js"

const generalSound = document.querySelector('#general-game-sound')
const gameMusic = document.querySelector('#game-music-sound')
const generalEffect = document.querySelector('#general-effect-sound')

const testEffectBtn = document.querySelector('#effects')


export let generalSoundVolume = generalSound.value /10
export let gameMusicVolume = gameMusic.value /10
export let generalEffectVolume = generalEffect.value /10

generalSound.addEventListener("change", ()=>{

    //set sound

    generalEffect.value = generalSound.value
    gameMusic.value = generalSound.value

    //general
    generalSoundVolume = generalSound.value /10

    //musique
    gameSoundeffect.volume = gameMusic.value /10

    //effets
    defeatSound.volume = generalEffect.value /10
    shootsound.volume = generalEffect.value /10
    explotireur.volume = generalEffect.value /10

})

gameMusic.addEventListener("input", ()=>{
    gameSoundeffect.volume =  gameMusic.value /10
})

generalEffect.addEventListener("input", ()=>{
    defeatSound.volume = generalEffect.value /10
    shootsound.volume = generalEffect.value /10
    explotireur.volume = generalEffect.value /10
})

testEffectBtn.addEventListener("click", ()=>{
    defeatSound.play()
})
