'use strict';

let currentScore = 0
let player1isPlaying = true

document.querySelector("#score--0").textContent = 0
document.querySelector("#score--1").textContent = 0
let dice = document.querySelector(".dice")
dice.classList.add("hidden")

// ROLL DICE
const btnRoll = document.querySelector(".btn--roll")
const btnHold = document.querySelector(".btn--hold")
const btnNewGame = document.querySelector(".btn--new")


const handlePlayer = (player, disablePlayer, activePlayer) => {
    currentScore = 0
    document.querySelector(`#current--${player}`).textContent = 0
    document.querySelector(`.player--${player}`).classList.remove("player--active")
    document.querySelector(`.player--${disablePlayer}`).classList.add("player--active")
    player1isPlaying = activePlayer
}

const handleRollDice = () => {
    dice.classList.remove("hidden")
    let randomDice = Math.trunc(Math.random() * 6 + 1) //low int
    dice.src = `dice-${randomDice}.png`
    currentScore += randomDice

    let player = player1isPlaying ? "0" : "1"
    let disablePlayer = player1isPlaying ? "1" : "0"
    let activePlayer = player1isPlaying ? false : true

    document.querySelector(`#current--${player}`).textContent = currentScore
    if (randomDice == 1) {
        handlePlayer(player, disablePlayer, activePlayer)
    }
}

const disableButton = () => {
    document.querySelector(".btn--roll").style.cursor = "not-allowed"
    document.querySelector(".btn--hold").style.cursor = "not-allowed"
    document.querySelector(".dice").classList.add("hidden")
    btnRoll.disabled = true;
    btnHold.disabled = true;
}

const checkWinner = (player) => {
    if (Number(document.querySelector(`#score--${player}`).textContent) >= 20) {
        document.querySelector(`.player--${player}`).classList.add("player--winner")
        disableButton()
    }
}

const handleHold = () => {
    let player = player1isPlaying ? "0" : "1"
    let disablePlayer = player1isPlaying ? "1" : "0"
    let activePlayer = player1isPlaying ? false : true
    let test1 = Number(document.querySelector(`#score--${player}`).textContent)
    let test2 = Number(document.querySelector(`#current--${player}`).textContent)
    test1 += test2
    document.querySelector(`#score--${player}`).textContent = test1
    handlePlayer(player, disablePlayer, activePlayer)
    checkWinner(player)
}

const handleReset = () => {
    let playerTurn = ["0", "1"]
    for (let i = 0; i < playerTurn.length; i++) {
        document.querySelector(`#score--${String(i)}`).textContent = 0
        document.querySelector(`#current--${String(i)}`).textContent = 0
        document.querySelector(`.player--${String(i)}`).classList.remove("player--active")
        document.querySelector(`.player--${String(i)}`).classList.remove("player--winner")
    }
    document.querySelector(".dice").classList.add("hidden")
    player1isPlaying = true
    currentScore = 0
    document.querySelector(".btn--roll").style.cursor = "pointer"
    document.querySelector(".btn--hold").style.cursor = "pointer"
    btnRoll.disabled = false;
    btnHold.disabled = false;
    document.querySelector(`.player--0`).classList.add("player--active")
}
btnRoll.addEventListener("click", handleRollDice)
btnHold.addEventListener("click", handleHold)
btnNewGame.addEventListener("click", handleReset)






